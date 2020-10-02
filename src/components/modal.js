import React from "react"
import ReactModal from "react-modal"
import { useTranslation } from "react-i18next"
import useModalContext from "../hooks/useModalContext"

import Controls from "./controls"
import Context from "../contexts/modal"

const Modal = ({
  Content,
  open = false,
  styles = {},
  initialModel = {},
  initialStep = 0,
  steps,
  close = () => {},
  singleControl,
}) => {
  const { t } = useTranslation()
  const context = useModalContext(initialModel, initialStep, steps, close)
  ReactModal.setAppElement("#___gatsby")

  return (
    <Context.Provider value={context}>
      <ReactModal isOpen={!!open} onRequestClose={close ? () => close(null) : undefined} style={{
        content: {
          width: "80vw",
          bottom: "auto",
          margin: "auto",
          boxShadow: "0px 15px 35px rgba(0, 0, 0, 0.2), 0px 3px 11px rgba(0, 0, 0, 0.15)",
          overflow: "visible",
          ...styles
        }
      }}>
        <div className="flex flex-col h-full justify-center">
          {!steps && <div className="flex items-start">
            <button className="close-modal" onClick={close}>{t("setup.controls.back")}</button>
          </div>}
          <Content />
          {steps && <Controls single={singleControl} />}
        </div>
      </ReactModal>
    </Context.Provider>
  )
}

export default Modal
