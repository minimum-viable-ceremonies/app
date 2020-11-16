import React from "react"
import { useTranslation } from "react-i18next"

import ShareCard from "./shareCard"

const ShareRoom = () => {
  const { t } = useTranslation()

  return (
    <div className="flex-grow">
      <div className="text-center mt-8 mr-24 ml-24 share-room">
        <h2 className="mb-4">{t(`shareRoom.title`)}</h2>
        <p className="mb-12">{t(`shareRoom.description`)}</p>
        <div className="flex flex-row">
          <ShareCard method="email" />
          <ShareCard method="slack" />
        </div>
      </div>
    </div>
  )
}

export default ShareRoom
