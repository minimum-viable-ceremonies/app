import React, { useContext } from "react"
import { useTranslation } from "react-i18next"

import Context from "../contexts/modal"

const ShareEmail = () => {
  const { currentStep } = useContext(Context)
  const { t } = useTranslation()

  return (
    <div className="flex-grow flex items-center justify-center">
      <div>WARK</div>
    </div>
  )
}

export default ShareEmail
