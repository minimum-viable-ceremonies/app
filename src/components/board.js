import React, { useContext, useState, useEffect } from "react"
import { useTranslation } from 'react-i18next'
import { DragDropContext } from "react-beautiful-dnd"
import Confetti from "react-dom-confetti"

import Cadence from "./cadence"
import Dropdown from "./dropdown"
import Sidebar from "./sidebar"
import Toast from "./toast"
import Context from "../contexts/room"
import { successData, failureData } from "../data/confetti"
import "../styles/board.scss"

const Board = () => {
  const { t } = useTranslation()
  const { complete, share, finish, boardRef, draft, place, weekCount, modifyRoom } = useContext(Context)
  const [explosions, setExplosions] = useState(0)
  const [shareable, setShareable] = useState(complete)

  useEffect(() => {
    if (!complete) { return }

    [100, 600, 1500, 5000].forEach(delay => setTimeout(() => setExplosions(c => c+1), delay))
    setTimeout(() => setShareable(true), 3000)
  }, [complete])

  return (
    <div className={`board flex flex-row ${draft ? "draft" : ""}`}>
      <Sidebar />
      <div className="board-confetti">
        <div style={{position: "absolute", left: "50%", top: "25%"}}>
          <Confetti active={explosions > 0} config={successData} />
        </div>
        <div style={{position: "absolute", left: "25%", top: "75%"}}>
          <Confetti active={explosions > 1} config={successData} />
        </div>
        <div style={{position: "absolute", left: "40%", top: "30%"}}>
          <Confetti active={explosions > 2} config={successData} />
        </div>
        <div style={{position: "absolute", left: "80%", top: "30%"}}>
          <Confetti active={explosions > 3} config={failureData} />
        </div>
      </div>
      <Toast />
      <DragDropContext onDragEnd={place}>
        <div ref={boardRef} className="flex flex-col board-content">
          <div className="board-title flex justify-between">
            <div>
              <h1>{t("board.title")}</h1>
              <p>{t("board.subtitle")}</p>
            </div>
            <div>
              <Dropdown
                klass="mvc-btn btn-secondary whitespace-no-wrap"
                size={14}
                position="left"
                disabled={!shareable && explosions > 0}
                onClick={shareable ? share : finish}
                text={t(`board.${shareable ? 'share' : 'finished'}`)}
                tooltip={t(`board.${shareable ? 'share' : 'finished'}Helptext`)}
              />
            </div>
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
