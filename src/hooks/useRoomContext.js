import { useState, useMemo, useEffect } from "react"

import useFirebaseAuth from "./useFirebaseAuth"
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

  const auth = useFirebaseAuth({ setReady })
  const refs = useRoomRefs()
  const modifiers = useRoomModifiers({
    uuid,
    ceremonies, setCeremonies,
    participants, setParticipants,
    setName, setWeekCount, setFeatures
  })

  const setup = uuid => {
    setReady(false)
    setUuid(uuid)

    modifiers.setupRoom().then(state => {
      setFeatures(current => ({ ...current, ...state.features }))

      if (state.requiresLogin) {
        setReady(true)
        return
      }

      setUuid(state.uuid)
      setName(state.name)
      setWeekCount(state.weekCount)
      setCeremonies(state.ceremonies || {})
      setParticipants(state.participants || {})

      modifiers.setupOrganization(state.organizationUuid).then(state => {
        const { uuid, name, image } = state
        setOrganization({ uuid, name, image })
        setFeatures(current => ({ ...current, ...state.features }))
        setReady(true)
      })
    })
  }

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
    uuid, draft, complete, ready,
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
