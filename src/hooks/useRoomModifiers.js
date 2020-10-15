import { useState, useMemo } from "react"

import roomTable from "../firebase/db/room"
import organizationTable from "../firebase/db/organization"
import { rearrange, transfer, bulkTransfer } from "../operations/ceremonies"

const useRoomModifiers = (transition, {
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

  const [activeCadenceId, setActiveCadenceId] = useState()
  const activeCadence = activeCadenceId

  const modifyRoom = (attrs, syncDb = true) => {
    attrs.name && setName(attrs.name)
    attrs.weekCount && setWeekCount(attrs.weekCount)

    if (syncDb) {
      attrs.name && roomTable.write(uuid, 'name', attrs.name)
      attrs.weekCount && roomTable.write(uuid, 'weekCount', attrs.weekCount)
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

    const updated = source.droppableId === destination.droppableId
      ? rearrange(ceremonies, draggableId, destination.index)
      : transfer(ceremonies, draggableId, destination.droppableId, destination.index)

    roomTable.write(uuid, 'ceremonies', { ...ceremonies, ...updated })
    setCeremonies(current => ({ ...current, ...updated }))
  }

  const finish = () => {
    setActiveCadenceId('void')
    const updated = bulkTransfer(ceremonies, 'undecided', 'void')

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
    activeCadence, setActiveCadenceId,
    modifyFeature,
    setupRoom, teardownRoom,
    setupOrganization, teardownOrganization,
    place, placedOn, finish
  }
}

export default useRoomModifiers
