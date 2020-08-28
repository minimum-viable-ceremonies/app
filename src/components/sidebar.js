import React, { useState, useContext } from "react"
import { useTranslation } from "react-i18next"

import Dropdown from "./dropdown"
import ShareableLink from "./shareableLink"
import Participant from "./participant"
import ParticipantIcon from "./participantIcon"
import Context from "../contexts/room"
import "../styles/sidebar.scss"

const Sidebar = () => {
  const { shareableLink, name, organization, participants, setEditingRoomId } = useContext(Context)
  const [expanded, setExpanded] = useState(true)
  const { t } = useTranslation()

  return expanded ? (
    <div className="sidebar expanded">
      <div className="sidebar-header mvc-hover-state">
        <div className="sidebar-title">
          {organization.name && <div>{organization.name}</div>}
          <div>{name}</div>
        </div>
        <Dropdown
          klass="sidebar-collapse dark"
          icon="arrows/chevrons-left"
          tooltip={t("sidebar.collapse")}
          onClick={() => setExpanded(false)}
        />
      </div>
      <div className="sidebar-actions">
        <h3 className="mvc-subtitle">{t("sidebar.shareableLink")}</h3>
        <div className="sidebar-option mvc-hover-state">
          <ShareableLink hideInput={true} text={t(`shareableLink.share`)} value={shareableLink} position="right" />
        </div>
      </div>
      <div className="sidebar-participants">
        <h3 className="mvc-subtitle">{t("sidebar.teamsAndRoles")}</h3>
        {Object.values(participants).map(({ id, image, username, roles }, index) => (
          <div key={username} className="mvc-hover-state">
            <Participant id={id} image={image} username={username} roles={roles} />
          </div>
        ))}
      </div>
      <div className="sidebar-option mvc-hover-state">
        <Dropdown
          klass="light"
          icon="basic/plus"
          size={16}
          text={t("sidebar.setupRoom")}
          tooltip={t("sidebar.setupRoomTooltip")}
          onClick={() => setEditingRoomId(true)}
        />
      </div>
    </div>
  ) : (
    <div className="sidebar collapsed">
      <div className="sidebar-collapsed-item mvc-hover-state">
        <Dropdown
          className="sidebar-expand"
          icon="arrows/chevrons-right"
          tooltip={t("sidebar.expand")}
          onClick={() => setExpanded(true)}
        />
      </div>
      <div className="sidebar-collapsed-item mvc-hover-state">
        <ShareableLink hideInput={true} value={shareableLink} direction="right" />
      </div>
      <div className="sidebar-collapsed-participants">
        {Object.values(participants).map(({ id, image, username, roles }) => (
          <div key={id} className="sidebar-collapsed-item mvc-hover-state">
            <Dropdown
              klass="sidebar-collapsed-participant"
              text={<ParticipantIcon key={id} image={image} id={id} username={username} roles={roles} />}
              tooltip={`${username}: ${roles.join(', ')}`}
            />
          </div>
        ))}
      </div>
      <div className="sidebar-collapsed-item mvc-hover-state">
        <div className="sidebar-collapsed-setup-room">
          <Dropdown
            icon="basic/plus"
            size={16}
            tooltip={t("sidebar.setupRoomTooltip")}
            onClick={() => setEditingRoomId(true)}
          />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
