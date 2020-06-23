import React, { useMemo, useContext } from "react"
import Select from "react-select"
import { useTranslation } from "react-i18next"
import Check from "../images/check-mark.svg"

import Card from "./card"
import Icon from "./icon"
import Context from "../contexts/room"
import "../styles/setup.scss"

const withOption = (value, option) => {
  switch (option) {
    case 'withTime': return [
      'monday-1', 'tuesday-1', 'wednesday-1', 'thursday-1', 'friday-1',
      'monday-2', 'tuesday-2', 'wednesday-2', 'thursday-2', 'friday-2',
      'daily',
    ].includes(value)
    case 'withOneWeekName': return [
      'monday-1', 'tuesday-1', 'wednesday-1', 'thursday-1', 'friday-1',
    ].includes(value)
    case 'hideOnOneWeek': return [
      'monday-2', 'tuesday-2', 'wednesday-2', 'thursday-2', 'friday-2',
    ].includes(value)
    default: return false
  }
}

const EditCeremony = ({ onSubmit }) => {
  const { t } = useTranslation()
  const { weekCount, editingCeremony, modifyCeremony, cadenceData, hourData } = useContext(Context)
  const { id, placement, async, notes, startTime, endTime } = editingCeremony || {}
  const cadences = useMemo(() => (
    cadenceData
      .filter(value => !(weekCount === 1 && withOption(value, 'hideOnOneWeek')))
      .map(value => ({ value, label: (weekCount === 1 && withOption(value, 'withOneWeekName'))
        ? t(`cadences.${value}.oneWeekMiniName`)
        : t(`cadences.${value}.miniName`)
      })
    )
  ), [cadenceData, t, weekCount])
  const startTimes = useMemo(() => (
    hourData.map(value => ({ value, label: t(`hours.${value}`) }))
  ), [hourData, t])
  const endTimes = useMemo(() => (
    startTimes.filter(({ value }) => value > startTime).slice(0, 8)
  ), [startTimes, startTime])

  return (
    <div className="setup-ceremony max-h-full flex-grow">
      <div className="setup-panel split">
        <div>
          <Card id={id} namespace="ceremonies" theme={true} />
        </div>
        <div className="overflow-auto pr-4">
          <div className="mvc-input">
            <div className="mvc-label flex flex-row items-center">
              <Icon icon="basic/globe" className="mr-2" size={14} />
              <span>{t("setup.ceremony.schedule")}</span>
            </div>
            <div className="ml-5 flex flex-row items-center">
              {[true, false].map(value => (
                <label key={value} className="mvc-radio-option flex content-center">
                  <input
                    type="checkbox"
                    name="async"
                    value={value}
                    checked={value === async}
                    onChange={({ target: { checked, value } }) => modifyCeremony(id, { async: value === 'true' })}
                  />
                  <div className="mvc-radio-option-label">
                    <Check />
                    <span>{t(`setup.ceremony.${value ? 'async' : 'sync'}`)}</span>
                  </div>
                </label>
              ))}
            </div>
            <div className="mvc-note ml-5">{t(`setup.ceremony.${async ? 'async' : 'sync'}Helptext`)}</div>
          </div>
          <div className="mvc-input">
            <div className="mvc-label flex flex-row items-center">
              <Icon icon="time/calendar" className="mr-2" size={14} />
              <span>{t("setup.ceremony.cadence")}</span>
            </div>
            <div className="ml-5 flex flex-row items-center">
              <Select
                options={cadences}
                value={cadences.find(({ value }) => value === placement)}
                defaultValue={cadences[0]}
                onChange={({ value }) => modifyCeremony(id, { placement: value })}
                styles={{ container: existing => ({
                  ...existing,
                  width: "100%",
                  margin: "8px 0"
                }) }}
              />
            </div>
          </div>
          {!async && withOption(placement, 'withTime') && <div className="mvc-input">
            <div className="mvc-label flex flex-row items-center">
              <Icon icon="time/time" className="mr-2" size={14} />
              <span>{t("setup.ceremony.time")}</span>
            </div>
            <div className="flex flex-row items-center ml-5">
              <Select
                options={startTimes}
                value={startTimes.find(({ value }) => value === startTime)}
                onChange={({ value }) => (
                  modifyCeremony(id, {
                    startTime: value,
                    endTime: value + (endTime ? (endTime - startTime) : 60)
                  })
                )}
                styles={{ container: existing => ({
                  ...existing, minWidth: "150px", margin: "8px 0"
                }) }}
              />
              <div className="mvc-note" style={{margin: "0 12px"}}>{t("common.to")}</div>
              <Select
                isDisabled={!(startTime >= 0)}
                options={endTimes}
                value={startTimes.find(({ value }) => value === endTime)}
                onChange={({ value }) => modifyCeremony(id, { endTime: value })}
                styles={{ container: existing => ({
                  ...existing, minWidth: "150px", margin: "8px 0"
                }) }}
              />
              <div className="ml-2 mvc-note">
                {(startTime >= 0 && endTime >= 0) ? t(`hours.diff-${endTime - startTime}`) : '-'}
              </div>
            </div>
          </div>}
          <div className="mvc-input">
            <div className="mvc-label flex flex-row items-center">
              <Icon icon="basic/text-align-left" className="mr-2" size={14} />
              <span>{t(`setup.ceremony.${async ? 'syncNotes' : 'asyncNotes'}`)}</span>
            </div>
            <div className="ml-5">
              <textarea
                className="mvc-textarea w-full"
                name="notes"
                placeholder={t(`setup.ceremony.${async ? 'syncNotesPlaceholder' : 'asyncNotesPlaceholder'}`)}
                value={notes}
                onChange={({ target: { value } }) => modifyCeremony(id, { notes: value })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditCeremony