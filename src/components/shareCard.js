import React, { useContext } from "react"
import { useTranslation } from "react-i18next"
import "../styles/shareCard.scss"
import providers from "../data/providers"

import Context from "../contexts/room"

const ShareCard = ({ method }) => {
  const { t } = useTranslation()
  const { setShare } = useContext(Context)
  const Logo = providers[method].logo

  return (
    <div style={{flexBasis: "50%"}} className="share-card text-left">
      <div className="flex flex-row">
        {Logo ? (
          <div className="share-card-logo"><Logo /></div>
        ) : (
          <div className="share-card-emoji">{t(`shareCard.${method}.icon`)}</div>
        )}
        <div>
          <h4 className="mb-2">{t(`shareCard.${method}.title`)}</h4>
          <p className="mb-4">{t(`shareCard.${method}.description`)}</p>
          <button onClick={() => setShare(method)} className="mvc-btn btn-primary btn-arrow share-card-submit">{t(`shareCard.${method}.submit`)} </button>
        </div>
      </div>
    </div>
  )
}

export default ShareCard
