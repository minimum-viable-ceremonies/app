import React, { useState, useContext } from "react"
import Context from "../contexts/room"
import Dropdown from "../components/basic/dropdown"
import ShareableLink from "../components/shareableLink"
import Participant from "../components/participant"
import ParticipantIcon from "../components/participantIcon"

import "../styles/sidebar.scss"

const Sidebar = () => {
  const { uuid, name, participants } = useContext(Context)
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(true)

  return expanded ? (
    <div className="sidebar expanded">
      <div className="sidebar-header">
        <div className="sidebar-title">{name}</div>
        <Dropdown
          klass="sidebar-collapse"
          icon="arrows/chevrons-left"
          tooltip="Collapse the sidebar"
          onClick={() => setExpanded(false)}
        />
      </div>
      <div className="sidebar-actions">
        <h3 className="sidebar-subtitle">Shareable link</h3>
        <ShareableLink text={uuid} />
      </div>
      <div className="sidebar-participants">
        <h3 className="sidebar-subtitle">Team and roles</h3>
        {Object.values(participants).map(({ id, username, role }) => (
          <div className="hover-state light">
            <Participant key={id} username={username} role={role} />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="sidebar collapsed">
      <div className="sidebar-collapsed-item hover-state">
        <Dropdown
          className="sidebar-expand"
          icon="arrows/chevrons-right"
          tooltip="Expand the sidebar"
          onClick={() => setExpanded(true)}
        />
      </div>
      <div className="sidebar-collapsed-item hover-state">
        <ShareableLink />
      </div>
      {Object.values(participants).map(({ id, username, role }) => (
        <div className="sidebar-collapsed-item hover-state">
          <Dropdown
            klass="sidebar-collapsed-participant"
            text={<ParticipantIcon key={id} username={username} role={role} />}
            tooltip={`${username}: ${role}`}
          />
        </div>
      ))}
    </div>
  )
}

export default Sidebar