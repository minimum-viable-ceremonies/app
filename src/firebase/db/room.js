import { navigate } from "gatsby"
import { set, sync, unsync, load, debouncedWrite } from "./common"

export default {
  create: ({ uuid, name, weekCount, ceremonies, participants }) => (
    fetch(`${process.env.FUNCTIONS_HOST}/mvc-create`, {
      method: 'POST',
      body: JSON.stringify({ uuid, name, template: 'default' }),
    }, {
      headers: { 'Content-Type': 'application/json' }
    }).then(({ ok }) => ok && navigate(`room/${uuid}`))
  ),

  setup: ({ uuid, modifyRoom, modifyFeature, modifyParticipant, modifyCeremony }) => {
    sync(`rooms/${uuid}/name`,         snapshot => modifyRoom({ name: snapshot.toJSON() }, false))
    sync(`rooms/${uuid}/weekCount`,    snapshot => modifyRoom({ weekCount: snapshot.toJSON() }, false))
    sync(`rooms/${uuid}/features`,     snapshot => modifyFeature(snapshot.toJSON()))
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
    unsync(`rooms/${uuid}/participants`)
    unsync(`rooms/${uuid}/ceremonies`)
  },

  write: debouncedWrite('rooms')
}
