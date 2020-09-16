import React, { useContext } from "react"
import Context from "../contexts/room"

import ParticipantIcon from "./participantIcon"

export default ({ data, innerProps, innerRef }) => {
  const { participants } = useContext(Context)
  const { uid, image, displayName, roles } = participants[data.value]

  return (
    <div ref={innerRef} {...innerProps}>
      <div className="flex items-center">
        <ParticipantIcon {...participants[data.value]} />
        <div className="participant-name">{displayName}</div>
      </div>
    </div>
  )
}
