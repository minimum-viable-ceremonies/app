import React from "react"
import Modal from "react-modal"
import phrase from "random-words"

import SetupRoom from "./setupRoom"
import Board from "./board"
import useRoomContext from "../hooks/useRoomContext"
import Context from "../contexts/room"

const Intro = () => {
  Modal.setAppElement("#___gatsby")
  const draft = useRoomContext(phrase({exactly: 3, join: '-'}), true)

  return (
    <Context.Provider value={draft}>
      <Modal
        isOpen={true}
        style={{
          content: {
            width: "80vw",
            bottom: "auto",
            margin: "auto",
            boxShadow: "0px 15px 35px rgba(0, 0, 0, 0.2), 0px 3px 11px rgba(0, 0, 0, 0.15)",
            overflow: "visible",
          }
        }}
      >
        <SetupRoom uuid={draft.uuid} />
      </Modal>
      <Board />
    </Context.Provider>
  )
}

export default Intro
