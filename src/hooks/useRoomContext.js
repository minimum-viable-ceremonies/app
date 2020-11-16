import { useState, useMemo, useEffect } from "react"

import useAuth from "./useAuth"
import useTransition from "./useTransition"
import useRoomModifiers from "./useRoomModifiers"
import useRoomRefs from "./useRoomRefs"

import { document } from "browser-monads"

const useRoomContext = (id, draft) => {
  const [uuid, setUuid] = useState(id)
  const [name, setName] = useState("")
  const [organization, setOrganization] = useState({})
  const [ready, setReady] = useState(false)
  const [celebrating, setCelebrating] = useState(false)
  const [toast, setToast] = useState({ visible: false, message: '' })
  const [weekCount, setWeekCount] = useState(1)
  const [participants, setParticipants] = useState({})
  const [features, setFeatures] = useState({ providers: [] })
  const [ceremonies, setCeremonies] = useState({})

  const { loading, transition } = useTransition(true)
  const refs = useRoomRefs()
  const auth = useAuth(transition)
  const modifiers = useRoomModifiers(transition, {
    uuid,
    celebrating, setCelebrating,
    ceremonies, setCeremonies,
    participants, setParticipants,
    setName, setWeekCount, setFeatures
  })

  const setup = transition(uuid => (
    setUuid(uuid) || modifiers.setupRoom().then(roomState => (
      modifiers.setupOrganization(roomState.organizationUuid).then(orgState => {
        setFeatures(current => ({ ...current, ...orgState.features, ...roomState.features }))
        modifiers.setActiveCadenceId('undecided')

        if (roomState.requiresLogin) { return Promise.resolve(true) }

        setUuid(roomState.uuid)
        setName(roomState.name)
        setWeekCount(roomState.weekCount)
        setCeremonies(roomState.ceremonies || {})
        setParticipants(roomState.participants || {})
        setOrganization({ uuid: orgState.uuid, name: orgState.name, image: orgState.image })
        setReady(true)
      })
    ))
  ))

  useEffect(() => {
    if (weekCount !== 1) { return }

    [
      'monday-2',
      'tuesday-2',
      'wednesday-2',
      'thursday-2',
      'friday-2'
    ].filter(cadence => modifiers.placedOn(cadence).length > 0)
     .forEach(cadence => modifiers.bulkPlace(cadence, 'undecided', 0))
  }, [weekCount])

  useEffect(() => () => modifiers.teardownRoom, [modifiers.teardownRoom])
  useEffect(() => () => modifiers.teardownOrganization, [modifiers.teardownOrganization])

  const shareableLink = useMemo(() => `${document.location.origin}/room/${uuid}`, [uuid])

  return {
    ...auth,
    ...modifiers,
    ...refs,
    setup,
    celebrating, setCelebrating,
    uuid, draft, ready, loading,
    organization, name, weekCount, ceremonies, participants,
    shareableLink,
    features,
    toast, showToast: (message, length = 2500) => {
      clearTimeout(toast.timeout)
      setToast({ message, visible: true, timeout: (
        setTimeout(() => setToast(toast => ({ ...toast, visible: false })), length)
      ) })
    }
  }
}

export default useRoomContext
