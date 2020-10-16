import React, { useContext } from "react"
import { useTranslation } from "react-i18next"

import Context from "../contexts/room"

const ShareRoom = () => {
  const {} = useContext(Context)
  const { t } = useTranslation()

  return (
    <div className="share-board flex-grow">
      <h1>{t(`share.title`)}</h1>
    </div>
  )
}

export default ShareRoom
