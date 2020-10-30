import React, { useContext } from "react"
import { useTranslation } from "react-i18next"

import Card from "./card"
import Dropdown from "./dropdown"
import Context from "../contexts/room"
import ParticipantIcon from "./participantIcon"
import "../styles/participant.scss"

const Participant = participant => {
  const { t } = useTranslation()
  const { uid, displayName, roles } = participant
  const { currentUser, setEditingUserId } = useContext(Context)

  return (
    <div className="participant">
      <div className="participant-content">
        <ParticipantIcon {...participant} />
        <div className="participant-name">{displayName}</div>
        <div className="participant-actions">
          {currentUser.uid === uid && <Dropdown
            klass="dark"
            theme="dark"
            text="•••"
            icon="basic/more-horizontal"
            size={24}
            tooltip={t("participant.edit")}
            onClick={() => setEditingUserId(uid)}
          />}
        </div>
      </div>
      <div className="participant-roles">
        {Object.values(roles || ['participant']).map(role => (
          <Dropdown
            key={role}
            klass="dark"
            theme="light"
            delay={750}
            position="right-start"
            width={300}
            text={[t(`roles.${role}.icon`), t(`roles.${role}.name`)].join(' ')}
            tooltip={<Card namespace="roles" id={role} />}
          />
        ))}
      </div>
    </div>
  )
}

export default Participant
