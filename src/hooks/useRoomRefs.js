import { useRef } from "react"

const useRoomRefs = () => {
  const boardRef = useRef()

  return { boardRef }
}

export default useRoomRefs
