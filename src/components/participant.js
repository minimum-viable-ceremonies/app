import React from "react"
import Dropdown from "../components/basic/dropdown"

import "../styles/participant.scss"

const Participant = ({ id, name, role }) => (
  <div className="participant">
    <div className="participant-content">
      <div className="participant-icon">{name[0]}</div>
      <div className="participant-name">{name}</div>
      <div className="participant-actions">
        <Dropdown icon="basic/more-horizontal" size={16} tooltip="Edit profile" />
      </div>
    </div>
    <div className="participant-roles">
      <div className="participant-role hover-state">{role}</div>
    </div>
  </div>
)

export default Participant
