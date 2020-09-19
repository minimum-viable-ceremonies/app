import React, { useState, useEffect, useContext } from "react"
import { useTranslation } from "react-i18next"

import "../styles/ceremony.scss"
import Context from "../contexts/room"

const Ceremony = ({ id, index }) => {
  const { t } = useTranslation()
  const { entering, setEditingCeremonyId, ceremonies } = useContext(Context)
  const [entered, setEntered] = useState(entering)
  useEffect(() => {
    if (!entering || ceremonies[id].placement !== 'undecided') { return }

    setTimeout(() => setEntered(false), 500 + (50 * index))
  }, [entering])

  return (
    <div className={`ceremony mvc-entrance ${entered ? 'entered' : ''}`} onClick={() => setEditingCeremonyId(id)}>
      <div className="ceremony-content flex items-center">
        <div className='icon mr-2'>
          {ceremonies[id].emoji || t(`ceremonies.${id}.icon`)}
        </div>
        <div className='title leading-snug'>
          {ceremonies[id].title || t(`ceremonies.${id}.name`)}
        </div>
      </div>
    </div>
  )
}

export default Ceremony
