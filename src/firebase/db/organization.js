import { navigate } from "gatsby"
import { set, sync, unsync, load, debouncedWrite } from "./common"

export default {
  create: ({ uuid, name, image }) => (
    set(`organizations/${uuid}`, { uuid, name, image }).then(() => (
      navigate(`organizations/${uuid}`)
    ))
  ),

  setup: ({ uuid, modifyFeature }) => {
    if (!uuid) { return Promise.resolve({}) }

    sync(`organizations/${uuid}/features`, snapshot => (
      Object.entries(snapshot.toJSON() || {}).map(([key, value]) => (
        modifyFeature(key, value)
      ))
    ))

    return load(`organizations/${uuid}`)
  },

  teardown: uuid => {
    unsync(`organizations/${uuid}/name`)
    unsync(`organizations/${uuid}/logo`)
    unsync(`organizations/${uuid}/features`)
  },

  write: debouncedWrite('organizations')
}
