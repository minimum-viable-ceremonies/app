import React, { useContext } from "react"
import { useTranslation } from "react-i18next"

import Loading from "./loading"
import Context from "../contexts/modal"
import "../styles/controls.scss"

const Controls = ({ single }) => {
  const { t } = useTranslation()
  const { model, currentStep, nextStep, prevStep, submitting } = useContext(Context)
  const { next, back, canProceed } = currentStep

  return (
    <div className="controls">
      {back && !single && <button onClick={prevStep} className="mvc-btn btn-secondary">{t(back)}</button>}
      {!single && <div className="controls-divider" />}
      {next && <button disabled={!canProceed(model)} className={`mvc-btn btn-primary ${single ? 'flex-grow' : ''}`} onClick={nextStep}>
        {submitting && <Loading size={25} />}
        <span style={{ visibility: submitting ? 'hidden' : 'visible' }}>{t(next)}</span>
      </button>}
    </div>
  )
}

export default Controls
