import React from "react"

import "../styles/participant.scss"

const ParticipantIcon = ({ photoURL, displayName, roles }) => (
  <div className="participant-icon" title={`${displayName} (${roles.join(', ')})`}>
    {photoURL ? (
      <img src={photoURL} alt={`${displayName} (${roles.join(', ')})`} />
    ) : (
      <span>{displayName[0]}</span>
    )}
  </div>
)

export default ParticipantIcon
