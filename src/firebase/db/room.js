import { navigate } from "gatsby"
import { set, sync, unsync, load, debouncedWrite } from "./common"

export default {
  create: ({ uuid, name, weekCount, ceremonies, participants }) => (
    set(`rooms/${uuid}`, { uuid, name, weekCount, ceremonies, participants }).then(() => (
      navigate(`room/${uuid}`)
    ))
  ),

  setup: ({ uuid, modifyRoom, modifyFeature, modifyParticipant, modifyCeremony, modifyCalendar }) => {
    sync(`rooms/${uuid}/name`,         snapshot => modifyRoom({ name: snapshot.toJSON() }, false))
    sync(`rooms/${uuid}/weekCount`,    snapshot => modifyRoom({ weekCount: snapshot.toJSON() }, false))
    sync(`rooms/${uuid}/features`,     snapshot => modifyFeature(snapshot.toJSON(), false))
    sync(`rooms/${uuid}/calendar`,     snapshot => modifyCalendar(snapshot.toJSON(), false))
    sync(`rooms/${uuid}/participants`, snapshot => (
      Object.values(snapshot.toJSON() || []).map(participant => (
        modifyParticipant(participant.uid, participant, false)
      ))
    ))
    sync(`rooms/${uuid}/ceremonies`,   snapshot => (
      Object.values(snapshot.toJSON()).map(ceremony => (
        modifyCeremony(ceremony.id, ceremony, false)
      ))
    ))

    return load(`rooms/${uuid}`).catch(error =>
      load(`rooms/${uuid}/features/providers`).then(({ uuid, ...providers }) => ({
        error,
        requiresLogin: true,
        features: { providers: Object.values(providers) }
      })))
  },

  teardown: uuid => {
    unsync(`rooms/${uuid}/name`)
    unsync(`rooms/${uuid}/weekCount`)
    unsync(`rooms/${uuid}/features`)
    unsync(`rooms/${uuid}/calendar`)
    unsync(`rooms/${uuid}/participants`)
    unsync(`rooms/${uuid}/ceremonies`)
  },

  write: debouncedWrite('rooms')
}
