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
  const [complete, setComplete] = useState(false)
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
    if (
      !complete &&
      ceremonies.length > 0 &&
      Object.values(ceremonies).filter(c => c.placement === 'undecided').length === 0
    ) { modifiers.finish() }
  }, [ceremonies, complete])

  useEffect(() => {
    if (weekCount !== 1) { return }

    Object.values(ceremonies).filter(({ placement }) => (
      ['monday-2', 'tuesday-2', 'wednesday-2', 'thursday-2', 'friday-2'].includes(placement)
    )).map(({ id, placement, index }) => (
      modifiers.place({
        draggableId: id,
        source: { droppableId: placement, index },
        destination: { droppableId: 'undecided', index: -0.5 }
      })
    ))
  }, [weekCount, ceremonies, modifiers])

  useEffect(() => () => modifiers.teardownRoom, [modifiers.teardownRoom])
  useEffect(() => () => modifiers.teardownOrganization, [modifiers.teardownOrganization])

  const shareableLink = useMemo(() => `${document.location.origin}/room/${uuid}`, [uuid])

  return {
    ...auth,
    ...modifiers,
    ...refs,
    setup,
    uuid, draft, complete, ready, loading,
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
