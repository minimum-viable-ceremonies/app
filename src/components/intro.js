import React, { useState } from "react"
import Modal from "react-modal"
import { useTranslation } from "react-i18next"
import SetupRoom from "../components/setupRoom"

import "../styles/intro.scss"
import BoardSvg from "../images/board.svg"

const Intro = () => {
  const { t } = useTranslation()
  const [creatingRoom, setupRoom] = useState()

  Modal.setAppElement("#___gatsby")

  return (
    <>
      <div className="intro flex flex-row justify-center align-center">
        <div className="intro-left flex flex-col justify-center text-center align-center">
          <h1>{t("intro.welcome")}</h1>
          <div className="intro-new">
            <button className="btn btn-blue" onClick={() => setupRoom(true)}>
              {t("intro.setupRoom")}
            </button>
          </div>
        </div>
        <div className="intro-right">
          <BoardSvg />
        </div>
      </div>
      <Modal
        isOpen={creatingRoom}
        onRequestClose={() => setupRoom(false)}
        style={{
          content: {
            height: "auto",
            top: "auto",
            right: "20%",
            left: "20%",
            bottom: "auto",
          },
          overlay: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }
        }}
      >
        <SetupRoom />
      </Modal>
    </>
  )
}

export default Intro
