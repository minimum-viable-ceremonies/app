import React, { useState, useContext, useMemo } from "react"
import { useTranslation } from "react-i18next"

import Dropdown from "./dropdown"
import Context from "../contexts/room"

const Export = ({ collapsed }) => {

  const { t } = useTranslation()
  const {} = useContext(Context)

  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)

  const tooltip = useMemo(() => (
    ready
      ? 'exportFinished'
      : (loading ? 'exportProcessing' : 'exportHelptext')
  ), [loading, ready])

  return (
    <Dropdown
      klass="light"
      icon="time/calendar"
      size={16}
      text={collapsed ? '' : t("sidebar.export")}
      tooltip={t(`sidebar.${tooltip}`)}
      loading={loading}
      onClick={() => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          setReady(true)
        }, 2000)
        setTimeout(() => {
          setLoading(false)
          setReady(false)
        }, 4000)
      }}
    />
  )
}

export default Export
