import { useState } from 'react'

export default initial => {
  const [loading, setLoading] = useState(initial)
  const transition = fn => args =>
    setLoading(true) || fn(args).finally(() => setLoading(false))

  return { transition, loading }
}
