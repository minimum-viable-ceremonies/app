import React, { useState, useContext } from "react"
import { useTranslation } from "react-i18next"

import Dropdown from "./dropdown"
import Context from "../contexts/room"

const Export = ({ collapsed }) => {
  const { t } = useTranslation()
  const { setEditingCalendarId } = useContext(Context)

  const [ready, setReady] = useState(false)

  return (
    <Dropdown
      klass="light"
      icon="time/calendar"
      size={16}
      text={collapsed ? '' : t("sidebar.export")}
      tooltip={t("sidebar.exportHelptext")}
      onClick={() => setEditingCalendarId(true)}
    />
  )
}

export default Export
