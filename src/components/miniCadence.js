import React, { useContext } from "react"
import { useTranslation } from "react-i18next"
import { Draggable, Droppable } from "react-beautiful-dnd"

import Dropdown from "./dropdown"
import Context from "../contexts/room"
import "../styles/miniCadence.scss"
import Void from "../images/void.svg"

const MiniCadence = ({ id, basis, klass }) => {
  const { place, editingCeremony } = useContext(Context)
  const { t } = useTranslation()

  return (
    <Dropdown
      styles={{flexBasis: `${100 / basis}%`}}
      position="bottom"
      klass={`mini-cadence flex flex-grow ${id} ${editingCeremony.placement === id ? 'selected' : ''}`}
      text={t(`cadences.${id}.miniName`)}
      tooltip={t(`cadences.${id}.description`)}
      onClick={() => place(editingCeremony.id, id)}
    />
  )
}

export default MiniCadence