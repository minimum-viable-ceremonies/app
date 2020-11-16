import React, { useEffect } from "react"
import phrase from "random-words"
import { useMatomo } from "@datapunt/matomo-tracker-react"

import Loading from "./loading"
import SEO from "./seo"
import Board from "./board"
import Modal from "./modal"
import SetupUser from "./setupUser"
import EditUser from "./editUser"
import SetupRoom from "./setupRoom"
import SetupCeremony from "./setupCeremony"
import EditCeremony from "./editCeremony"
import ShareRoom from "./shareRoom"
import ShareEmail from "./shareEmail"
import ShareSlack from "./shareSlack"
import Context from "../contexts/room"
import useRoomContext from "../hooks/useRoomContext"
import { createRoom } from "../operations/room"
import { share } from "../operations/share"

const Room = ({ uuid }) => {
  const context = useRoomContext(uuid)
  const draft = useRoomContext(phrase({exactly: 3, join: '-'}), true)

  const { trackPageView } = useMatomo()

  useEffect(() => { trackPageView() }, [trackPageView])
  useEffect(() => { context.setup(uuid) }, [uuid])

  return (
    <Context.Provider value={context}>
      <SEO page="room" params={{room: context.name}} />
      <Board />
      <Modal
        Content={Loading}
        open={context.loading}
        steps={[]}
        styles={{background: 'transparent', border: 0, boxShadow: 0}}
      />
      <Modal
        Content={SetupUser}
        open={!context.loading && !Object.keys(context.participants).includes(context.currentUser.uid)}
        initialModel={{
          providers: context.features.providers,
          provider: context.currentUser.provider || context.features.providers[0] || 'anonymous',
          uid: context.currentUser.uid,
          displayName: '',
          roles: []
        }}
        initialStep={context.features.providers.length > 0 ? 0 : 1}
        submit={model =>
          context.signIn(model.provider).then(({ user }) =>
            context.modifyParticipant(user.uid, { ...model, uid: user.uid }).then(() =>
              context.setup(context.uuid)))}
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
        }]}
      />
      <Modal
        Content={SetupRoom}
        open={context.editingRoom}
        initialModel={draft}
        close={context.setEditingRoomId}
        submit={room => createRoom(room).then(() => context.setup(room.uuid))}
        steps={[{
          next: "setup.controls.okGotIt",
        }, {
          next: "setup.controls.next",
          back: "setup.controls.back",
          canProceed: ({ name = "" }) => name.length > 3,
        }, {
          next: "setup.controls.createRoom",
          back: "setup.controls.back",
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
        submit={ceremony =>
          context.modifyCeremony(ceremony.id, ceremony).then(() =>
            context.setEditingCeremonyId(ceremony.id))
        }
        singleControl={true}
        steps={[{
          next: "common.save",
          canProceed: model => (
            model.title && model.emoji && model.theme
          )
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
        Content={ShareRoom}
        open={context.share === 'room'}
        close={context.setShare}
      />
      <Modal
        Content={ShareEmail}
        open={context.share === 'email'}
        close={context.setShare}
        styles={{
          top: "auto",
          left: "auto",
          right: "auto",
          bottom: "auto",
          width: "auto",
          height: "auto"
        }}
        initialModel={{ uuid: context.uuid, method: 'email', recipients: [] }}
        steps={[{
          next: "common.share",
          canProceed: model => model.recipients.length > 0
        }]}
        singleControl={true}
        submit={model => share(model).then(context.setShare)}
      />
      <Modal
        Content={ShareSlack}
        open={context.share === 'slack'}
        close={context.setShare}
        styles={{
          top: "auto",
          left: "auto",
          right: "auto",
          bottom: "auto",
          width: "auto",
          height: "auto"
        }}
        steps={[{
          next: "common.share",
          canProceed: model => model.channel
        }]}
        initialModel={{ uuid: context.uuid, method: 'slack' }}
        singleControl={true}
        submit={model => share(model).then(context.setShare)}
      />
    </Context.Provider>
  )
}

export default Room
