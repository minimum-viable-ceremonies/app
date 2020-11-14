import React, { useState, useContext } from "react"
import { useTranslation } from "react-i18next"

import "../styles/ceremony.scss"
import Context from "../contexts/room"

const Ceremony = ({ id, entering, entered }) => {
  const { t } = useTranslation()
  const { ready, setEditingCeremonyId, ceremonies } = useContext(Context)
  const [entered, setEntered] = useState(ready)
  useEffect(() => {
    if (!ready || entered) { return }

    setTimeout(() => setEntered(true), 50 * index)
  }, [ready, entered, index])

  return (
    <div className={`ceremony ${entering ? 'entering' : ''} ${entered ? 'entered' : ''}`} onClick={() => setEditingCeremonyId(id)}>
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
