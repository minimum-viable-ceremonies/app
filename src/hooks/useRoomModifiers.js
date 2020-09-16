import { useState } from "react"

import roomTable from "../firebase/db/room"
import organizationTable from "../firebase/db/organization"

const useRoomModifiers = ({
  uuid,
  ceremonies, setCeremonies,
  participants, setParticipants,
  setName, setWeekCount, setFeatures
}) => {
  const [orgUuid, setOrgUuid] = useState()

  const [editingRoomId, setEditingRoomId] = useState()
  const editingRoom = editingRoomId

  const [creatingCeremonyId, setCreatingCeremonyId] = useState()
  const creatingCeremony = creatingCeremonyId

  const [editingUserId, setEditingUserId] = useState()
  const editingUser = participants[editingUserId]

  const [editingCeremonyId, setEditingCeremonyId] = useState()
  const editingCeremony = ceremonies[editingCeremonyId]

  const modifyRoom = (attrs, syncDb = true) => {
    setName(attrs.name)
    setWeekCount(attrs.weekCount)

    if (syncDb) {
      roomTable.write(uuid, 'name', attrs.name)
      roomTable.write(uuid, 'weekCount', attrs.weekCount)
    }
  }

  const modifyParticipant = (id, attrs, syncDb = true) => {
    const roles = Object.values(attrs.roles || (participants[id] || {}).roles || [])
    const updated = { ...participants[id], ...attrs, roles }
    setParticipants(current => ({ ...current, [id]: updated }))
    return syncDb && roomTable.write(uuid, `participants/${id}`, updated)
  }

  const modifyCeremony = (id, attrs, syncDb = true) => {
    const people = Object.values(attrs.people || (ceremonies[id] || {}).people || [])
    const updated = { ...ceremonies[id], ...attrs, people }
    setCeremonies(current => ({ ...current, [id]: updated }))
    return syncDb && roomTable.write(uuid, `ceremonies/${updated.id}`, updated)
  }

  const modifyFeature = (key, value) => {
    const updated = { [key]: value }
    setFeatures(current => ({ ...current, updated }))
  }

  const placedOn = cadence => Object.values(ceremonies).filter(c => c.placement === cadence)
  const place = ({ draggableId, source, destination }) => {
    if (
      !destination ||
      (source.droppableId === destination.droppableId && source.index === destination.index)
    ) { return }

    const filter = ceremony => ceremony.id !== draggableId
    const sort   = (a,b) => b.index < a.index ? 1 : -1
    const reduce = (result, ceremony) => ({ ...result, [ceremony.id]: ceremony })
    const map    = (ceremony, index) => ({ ...ceremony, index })

    const updated = source.droppableId === destination.droppableId
      ? placedOn(source.droppableId)
          .filter(filter)
          .concat({ ...ceremonies[draggableId], index: destination.index + (destination.index > source.index ? 0.5 : -0.5) })
          .sort(sort)
          .map(map)
          .reduce(reduce, {})
      : [
        ...placedOn(source.droppableId)
          .filter(filter)
          .sort(sort)
          .map(map),
        ...placedOn(destination.droppableId)
          .concat({ ...ceremonies[draggableId], placement: destination.droppableId, index: destination.index })
          .sort(sort)
          .map(map),
      ].reduce(reduce, {})

    roomTable.write(uuid, 'ceremonies', { ...ceremonies, ...updated })
    setCeremonies(current => ({ ...current, ...updated }))
  }

  const setupRoom = () =>
    roomTable.setup({ uuid, modifyRoom, modifyFeature, modifyParticipant, modifyCeremony })

  const setupOrganization = orgUuid =>
    setOrgUuid(orgUuid) || organizationTable.setup({ uuid: orgUuid, modifyFeature })

  const teardownRoom = () =>
    roomTable.teardown(uuid)

  const teardownOrganization = () =>
    organizationTable.teardown(orgUuid)

  return {
    editingRoom, setEditingRoomId, modifyRoom,
    editingUser, setEditingUserId, modifyParticipant,
    editingCeremony, setEditingCeremonyId, modifyCeremony,
    creatingCeremony, setCreatingCeremonyId,
    modifyFeature,
    setupRoom, teardownRoom,
    setupOrganization, teardownOrganization,
    place, placedOn
  }
}

export default useRoomModifiers
