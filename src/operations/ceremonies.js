const sort   = (a,b) => b.index < a.index ? 1 : -1
const reduce = (result, ceremony) => ({ ...result, [ceremony.id]: ceremony })
const map    = (ceremony, index) => ({ ...ceremony, index })

export const rearrange = (ceremonies, id, index) =>
  Object.values(ceremonies)
    .filter(c => c.placement === ceremonies[id].placement && c.id !== id)
    .concat({ ...ceremonies[id], index: index + (index > ceremonies[id].index ? 0.5 : -0.5) })
    .sort(sort)
    .map(map)
    .reduce(reduce, {})

export const transfer = (ceremonies, id, destination, index) =>
  [
    ...Object.values(ceremonies)
             .filter(c => c.placement === destination)
             .concat({ ...ceremonies[id], index, placement: destination })
             .sort(sort)
             .map(map),
    ...Object.values(ceremonies)
             .filter(c => c.placement === ceremonies[id].placement && c.id !== id)
             .sort(sort)
             .map(map)
  ].reduce(reduce, {})

export const bulkTransfer = (ceremonies, source, destination, index = 1000) =>
  [
    ...Object.values(ceremonies)
             .filter(c => c.placement === source)
             .map(c => ({ ...c, index, placement: destination })),
    ...Object.values(ceremonies)
             .filter(c => c.placement === destination)
  ].sort(sort).map(map).reduce(reduce, {})
