import React, { useContext, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { Draggable, Droppable } from "react-beautiful-dnd"

import Ceremony from "./ceremony"
import Context from "../contexts/room"
import Dropdown from "./dropdown"
import "../styles/cadence.scss"
import Void from "../images/void.svg"

const Cadence = ({ id, index, basis, klass, animate }) => {
  const { ready, placedOn, setCreatingCeremonyId, activeCadence, setActiveCadenceId } = useContext(Context)
  const { t } = useTranslation()
  const entering = useMemo(() => ready && (activeCadence === id), [ready, activeCadence, id])
  const [enterCount, setEnterCount] = useState(0)

  useEffect(() => {
    if (!entering) { return }

    const counter = setInterval(() => setEnterCount(c => c+1), 50)
    if (enterCount >= placedOn(id).length) {
      clearInterval(counter)
      setActiveCadenceId(null)
    }
  }, [entering])

  return (
    <Droppable droppableId={id}>
      {({ innerRef, droppableProps, placeholder}, { isDraggingOver }) => (
        <div
          ref={innerRef}
          style={{flexBasis: `${100 / basis}%`}}
          className={`cadence flex flex-col flex-grow ${id} ${isDraggingOver ? 'highlight' : ''}`}
          {...droppableProps}
        >
          {!['undecided'].includes(id) &&
            <div className="leading-tight">
              {t(`cadences.${id}.name`)}
            </div>
          }
          {ready && placedOn(id).sort((a,b) => a.index > b.index ? 1 : -1).map(({ id, index }) => (
            <Draggable draggableId={id} index={index} key={id}>
              {({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => (
                <div
                  className="ceremony-draggable"
                  ref={innerRef}
                  {...draggableProps}
                  {...dragHandleProps}
                  style={{
                    ...draggableProps.style,
                    width: isDragging ? '150px' : 'auto'
                  }}
                >
                  <Ceremony id={id} entering={entering} entered={index < enterCount} />
                </div>
              )}
            </Draggable>
          ))}
          {placeholder}
          {['void'].includes(id) && (
            <div className="void-content mb-4 flex flex-col flex-grow justify-center">
              <div className='void-placeholder'>
                {t(`board.voidPlaceholder`)}
              </div>
              <Void className='void-svg'/>
            </div>
          )}
          {['undecided'].includes(id) && (
            <Dropdown
              klass="mt-1 cadence-add"
              size={14}
              position="right"
              text={t("setup.ceremony.create")}
              tooltip={t("setup.ceremony.createHelptext")}
              onClick={() => setCreatingCeremonyId(true)}
            />
          )}
        </div>
      )}
    </Droppable>
  )
}

export default Cadence
