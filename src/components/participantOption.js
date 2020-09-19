import React, { useContext } from "react"
import Context from "../contexts/room"

import ParticipantIcon from "./participantIcon"

export default ({ data, innerProps, innerRef }) => {
  const { participants } = useContext(Context)

  return (
    <div ref={innerRef} {...innerProps}>
      <div className="flex items-center">
        <ParticipantIcon {...participants[data.value]} />
        <div className="participant-name">{participants[data.value].displayName}</div>
      </div>
    </div>
  )
}
