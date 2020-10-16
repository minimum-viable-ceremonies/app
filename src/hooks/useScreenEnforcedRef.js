import { useRef, useEffect } from "react"

const useScreenEnforcedRef = parent => {
  const ref = useRef()

  const handleResize = () => {
    if (!ref.current || !parent.current) { return }

    const { top, height } = ref.current.getBoundingClientRect()
    const topDiff = (top + height - parent.current.scrollHeight)
    if (topDiff > -10) {
      const matrix = getComputedStyle(ref.current).transform.match(/matrix\((.*)\)/)[1].split(',')
      matrix[5] = parseInt(matrix[5]) - topDiff - 25
      ref.current.style.transform = `matrix(${matrix.join(',')})`
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return ref
}

export default useScreenEnforcedRef
