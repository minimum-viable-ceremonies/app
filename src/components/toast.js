import React, { useContext } from "react"
import { useTranslation } from "react-i18next"

import Context from "../contexts/room"

import "../styles/toast.scss"

const Toast = ({ theme }) => {
  const { t } = useTranslation()
  const { toast: { visible, message, options } } = useContext(Context)

  return (
    <label className={`toast ${visible ? 'visible' : ''}`}>
      {t(`toast.${message}`, options)}
    </label>
  )
}

export default Toast
