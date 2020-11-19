import React, { useContext, useState } from "react"
import Select from "react-select"
import { useTranslation } from "react-i18next"

import Context from "../contexts/modal"

const ShareSlack = () => {
  const { currentStep, nextStep, setModel } = useContext(Context)
  const { t } = useTranslation()

  return (
    <div className="flex-grow">
      <h1 className="mb-4">{t("shareCard.sendgrid.title")}</h1>
      <p className="mb-8">{t("shareCard.sendgrid.helptext")}</p>
      <p>(enter recipients here)</p>
    </div>
  )
}

export default ShareSlack
