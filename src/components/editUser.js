import React, { useState, useContext, useMemo } from "react"
import { useTranslation } from "react-i18next"

import Card from "./card"
import RoleBadge from "./roleBadge"
import Context from "../contexts/room"
import "../styles/editUser.scss"
import roleData from "../data/roles"

const EditUser = ({ onSubmit }) => {
  const { editingUser, modifyParticipant } = useContext(Context)
  const { t } = useTranslation()
  const [currentRole, setCurrentRole] = useState()

  const roles = useMemo(() => (
    editingUser && Object.values(editingUser.roles || [])
  ), [editingUser])

  if (!editingUser) { return null }

  return (
    <div className="edit-user flex flex-col">
      <div className="setup-panel split">
        <div>
          <Card namespace="roles" id={currentRole || roles[0]} />
        </div>
        <div>
          <h3 className="mvc-subtitle">{t("participant.name")}</h3>
          <input
            className="mvc-inline-edit edit-user-field bg-transparent border-none w-full text-gray-700 placeholder-gray-600 focus:placeholder-gray-500 font-bold text-2xl leading-tight focus:outline-none"
            name="displayName"
            placeholder={t("setup.user.displayNamePlaceholder")}
            value={editingUser.displayName}
            onChange={({ target: { value } }) => modifyParticipant(editingUser.uid, { displayName: value })}
          />
          <h3 className="mvc-subtitle">{t("participant.roles")}</h3>
          <div className="justify-start mvc-radio-options edit-user-field">
            {roleData.map(role => (
              <RoleBadge
                key={role}
                role={role}
                checked={roles.includes(role)}
                onHover={setCurrentRole}
                onClick={(role, checked) => modifyParticipant(editingUser.uid, {
                  roles: checked ? roles.concat(role) : roles.filter(r => r !== role)
                })}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditUser
