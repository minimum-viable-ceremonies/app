import React, { useContext } from "react"
import { useTranslation } from "react-i18next"

import Context from "../contexts/room"

const ShareRoom = () => {
  const {} = useContext(Context)
  const { t } = useTranslation()

  return (
    <div className="share-room flex-grow flex flex-col items-center justify-center">
      <h1 className="mb-12">{t(`shareRoom.title`)}</h1>
      <div style={{fontSize: "90px"}} className="share-room-emoji">🥳</div>
    </div>
  )
}

export default ShareRoom
