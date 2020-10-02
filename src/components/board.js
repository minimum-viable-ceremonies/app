import React, { useContext } from "react"
import { useTranslation } from 'react-i18next'
import { DragDropContext } from "react-beautiful-dnd"
import Confetti from "react-dom-confetti"

import Cadence from "./cadence"
import Dropdown from "./dropdown"
import Sidebar from "./sidebar"
import Toast from "./toast"
import Context from "../contexts/room"
import confettiData from "../data/confetti"
import "../styles/board.scss"

const Board = () => {
  const { t } = useTranslation()
  const { complete, boardRef, draft, place, weekCount, modifyRoom } = useContext(Context)

  return (
    <div className={`board flex flex-row ${draft ? "draft" : ""}`}>
      <Sidebar />
      <div style={{position: "absolute", left: "50%", top: "25%"}}>
        <Confetti active={complete} config={confettiData} />
      </div>
      <Toast />
      <DragDropContext onDragEnd={place}>
        <div ref={boardRef} className="flex flex-col board-content">
          <div className="board-title">
            <h1>{t("board.title")}</h1>
            <p>{t("board.subtitle")}</p>
          </div>
          <div className="flex flex-row justify-around">
            <div style={{flexBasis: "20%"}} className="flex flex-col">
              <div className="mvc-subtitle">{t("board.ceremonies")}</div>
              <Cadence className="flex-grow" id="undecided" />
            </div>
            <div style={{flexBasis: "80%"}} className="flex flex-col">
              <div className="flex flex-row">
                <div style={{flexBasis: "60%"}} className="flex flex-col">
                  <div className="mvc-subtitle">{t("board.cadences")}</div>
                  <div className="flex flex-col flex-grow">
                    <div className="flex flex-row" style={{flexBasis: "50%"}}>
                      <Cadence basis={3} id="daily" />
                      <Cadence basis={3} id="weekly" />
                      <Cadence basis={3} id="monthly" />
                    </div>
                    <div className="flex flex-row" style={{flexBasis: "50%"}}>
                      <Cadence basis={3} id="quarterly" />
                      <Cadence basis={3} id="halfyearly" />
                      <Cadence basis={3} id="yearly" />
                    </div>
                  </div>
                </div>
                <div style={{flexBasis: "40%"}} className="flex flex-col">
                  <div className="mvc-subtitle">{t("board.void")}</div>
                  <Cadence id="void" void={true} />
                </div>
              </div>
              <div className="flex flex-col">
                {[...Array(parseInt(weekCount))].map((_, index) => <div key={index}>
                  <div className="mvc-subtitle">{t("board.sprint", { index: index+1 })}</div>
                  <div className="flex flex-row justify-around">
                    <Cadence basis={5} id={`monday-${index+1}`} />
                    <Cadence basis={5} id={`tuesday-${index+1}`} />
                    <Cadence basis={5} id={`wednesday-${index+1}`} />
                    <Cadence basis={5} id={`thursday-${index+1}`} />
                    <Cadence basis={5} id={`friday-${index+1}`} />
                  </div>
                </div>)}
                <div>
                  <Dropdown
                    klass="ml-1 mt-2 board-add-sprint"
                    icon={`basic/${weekCount === 1 ? 'plus': 'trash'}`}
                    size={14}
                    position="bottom"
                    text={t(`board.${weekCount === 1 ? 'addSprint' : 'removeSprint'}`)}
                    tooltip={t(`board.${weekCount === 1 ? 'addSprint' : 'removeSprint'}Helptext`)}
                    onClick={() => (
                      modifyRoom({ weekCount: weekCount + (weekCount === 1 ? 1 : -1) })
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DragDropContext>
    </div>
  )
}

export default Board
