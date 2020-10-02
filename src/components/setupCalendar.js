import React, { useState, useContext } from "react"
import { useTranslation } from "react-i18next"
import moment from "moment"

import RoomContext from "../contexts/room"
import Context from "../contexts/modal"

import Icon from "./icon"

const SetupCalendar = () => {
  const { uuid, calendar } = useContext(RoomContext)
  const { currentStep, model, setModel, nextStepOnEnter } = useContext(Context)
  const { t } = useTranslation()

  return (
    <div className="setup-calendar flex-grow">
      <div className="setup-calendar-slides setup-slides" style={{marginLeft: `-${100 * currentStep.index}%`}}>
        <div className={`setup-calendar-slide ${currentStep.index === 0 ? 'active' : ''} setup-slide`}>
          <div className="setup-panel">
            <div className="setup-subpanel">
              <h3 className="mvc-subtitle">{t("calendar.name")}</h3>
              <input
                className="mvc-inline-edit bg-transparent border-none w-full text-gray-700 placeholder-gray-600 focus:placeholder-gray-500 font-bold text-2xl leading-tight focus:outline-none"
                name="name"
                placeholder={t("calendar.namePlaceholder")}
                value={model.name}
                onChange={({ target: { value } }) => setModel(current => ({ ...current, name: value }))}
              />
              <h3 className="mvc-subtitle">{t("calendar.timezone")}</h3>
              <input
                className="mvc-inline-edit bg-transparent border-none w-full text-gray-700 placeholder-gray-600 focus:placeholder-gray-500 font-bold text-2xl leading-tight focus:outline-none"
                name="timezone"
                placeholder={t("calendar.timezonePlaceholder")}
                value={model.timezone}
                onChange={({ target: { value } }) => setModel(current => ({ ...current, timezone: value }))}
                onKeyPress={currentStep.index === 0 ? nextStepOnEnter : null}
              />
            </div>
          </div>
        </div>
        <div className={`setup-calendar-slide ${currentStep.index === 1 ? 'active' : ''} setup-slide`}>
          <div className="setup-panel text-center mx-auto flex flex-center">
            <div className="setup-subpanel">
              <button className="flex flex-col flex-center items-center mx-auto">
                <Icon icon="file/file" size={36} />
                <label>{calendar.filename}</label>
              </button>
              <div className="mvc-note">{t(`calendar.lastExported`, { lastExported: moment(calendar.exportedAt).fromNow() })}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SetupCalendar
