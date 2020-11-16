import React, { useContext } from "react"
import { useTranslation } from "react-i18next"

import Context from "../contexts/modal"

const ShareSlack = () => {
  const { currentStep, nextStep, setModel } = useContext(Context)
  const { t } = useTranslation()

  return (
    <div className="setup-room setup">
      <div className="setup-slides" style={{marginLeft: `-${100 * currentStep.index}%`}}>
        <div className={`${currentStep.index === 0 ? 'active' : ''} setup-slide`}>
          <div className="setup-panel text-center mx-auto">
            <div className="setup-subpanel">
              <button onClick={() => nextStep()}>WARK</button>
            </div>
          </div>
        </div>
        <div className={`${currentStep.index === 1 ? 'active' : ''} setup-slide`}>
          <div className="setup-panel text-center mx-auto">
            <div className="setup-subpanel">
              WARK!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShareSlack
