import React, { useEffect } from "react"
import phrase from "random-words"
import { useMatomo } from "@datapunt/matomo-tracker-react"

import Loading from "./loading"
import SEO from "./seo"
import Board from "./board"
import Modal from "./modal"
import SetupUser from "./setupUser"
import EditUser from "./editUser"
import SetupCalendar from "./setupCalendar"
import SetupRoom from "./setupRoom"
import SetupCeremony from "./setupCeremony"
import EditCeremony from "./editCeremony"
import Context from "../contexts/room"
import useRoomContext from "../hooks/useRoomContext"
import roomTable from "../firebase/db/room"

const Room = ({ uuid }) => {
  const context = useRoomContext(uuid)
  const draft = useRoomContext(phrase({exactly: 3, join: '-'}), true)

  const { trackPageView } = useMatomo()

  useEffect(() => { trackPageView() }, [trackPageView])
  useEffect(() => { context.setup(uuid) }, [])

  return (
    <Context.Provider value={context}>
      <SEO page="room" params={{room: context.name}} />
      <Board />
      <Modal
        Content={Loading}
        open={!context.ready}
        steps={[]}
        styles={{
          background: "transparent",
          border: 0,
          boxShadow: 0
        }}
      />
      <Modal
        Content={SetupUser}
        open={context.ready && !Object.keys(context.participants).includes(context.currentUser.uid)}
        initialModel={{
          providers: context.features.providers,
          provider: context.currentUser.provider || context.features.providers[0] || 'anonymous',
          uid: context.currentUser.uid,
          displayName: '',
          roles: []
        }}
        initialStep={context.features.providers.length > 0 ? 0 : 1}
        steps={[{
          // auth provider step
          canProceed: ({ uid }) => !!uid
        }, {
          next: "setup.controls.next",
          canProceed: ({ displayName }) => !!displayName,
        }, {
          next: "setup.controls.next",
          back: "setup.controls.back",
          canProceed: ({ roles = [] }) => !!roles.length
        }, {
          next: "setup.controls.createUser",
          back: "setup.controls.back",
          perform: model =>
            context.signIn(model.provider).then(({ user }) =>
              context.modifyParticipant(user.uid, { ...model, uid: user.uid }).then(() =>
                context.setup(uuid, true)))
        }]}
      />
      <Modal
        Content={SetupRoom}
        open={context.editingRoom}
        initialModel={draft}
        close={context.setEditingRoomId}
        steps={[{
          next: "setup.controls.okGotIt",
        }, {
          next: "setup.controls.next",
          back: "setup.controls.back",
          canProceed: ({ name = "" }) => name.length > 3,
        }, {
          next: "setup.controls.createRoom",
          back: "setup.controls.back",
          perform: room => roomTable.create(room).then(() => context.setup(room.uuid))
        }]}
      />
      <Modal
        Content={SetupCeremony}
        open={context.creatingCeremony}
        initialModel={{
          id: phrase({exactly: 3, join: '-'}),
          theme: "coordination",
          emoji: "🙂",
          title: "",
          subheading: "",
          description: "",
          placement: "undecided",
          async: true,
          custom: true,
        }}
        close={context.setCreatingCeremonyId}
        styles={{
          top: "auto",
          left: "auto",
          right: "auto",
          bottom: "auto",
          width: "auto",
          height: "auto"
        }}
        singleControl={true}
        steps={[{
          next: "common.save",
          canProceed: model => (
            model.title && model.emoji && model.theme
          ),
          perform: ceremony =>
            context.modifyCeremony(ceremony.id, ceremony).then(() =>
              context.setEditingCeremonyId(ceremony.id))
        }]}
      />
      <Modal
        Content={EditCeremony}
        open={context.editingCeremony}
        close={context.setEditingCeremonyId}
      />
      <Modal
        Content={EditUser}
        open={context.editingUser}
        close={context.setEditingUserId}
      />
      <Modal
        Content={SetupCalendar}
        open={context.editingCalendar}
        close={context.setEditingCalendarId}
        initialStep={(context.calendar || {}).ical ? 1 : 0}
        initialModel={context.calendar}
        style={{
          height: "auto",
          width: "auto",
          top: "auto",
          bottom: "auto",
          left: "auto",
          right: "auto"
        }}
        steps={[{
          next: `common.${(context.calendar || {}).ical ? "reexport" : "export"}`,
          perform: model =>
            fetch(`${process.env.FUNCTIONS_HOST}/calendar-upload`, {
              method: 'PUT',
              body: JSON.stringify({ uuid, calendar: model }),
              headers: { 'Content-Type': 'application/json' }
            })
        }, {
          back: "common.reexport",
          next: "common.download",
          perform: model => {
            const blob = new Blob([model.ical], { type : 'text/calendar' })
          	let a = document.createElement('a')
          	a.href = window.URL.createObjectURL(blob)
          	a.download = model.filename
          	return Promise.resolve(a.click())
          }
        }]}
      />
    </Context.Provider>
  )
}

export default Room
