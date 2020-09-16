import React, { useMemo, useContext } from "react"
import Select from "react-select"
import { useTranslation } from "react-i18next"
import Check from "../images/check-mark.svg"

import Card from "./card"
import CustomCard from "./customCard"
import Icon from "./icon"
import ParticipantOption from "./participantOption"
import Context from "../contexts/room"
import "../styles/setup.scss"
import cadenceData from "../data/cadences"
import hourData from "../data/hours"

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
  const { weekCount, editingCeremony, participants, modifyCeremony } = useContext(Context)
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
  const peopleOptions = useMemo(() => (
    Object.values(participants).map(participant => ({
      value: participant.uid,
      label: participant.displayName,
    }))
  ), [participants])

  return (
    <div className="setup-ceremony max-h-full flex-grow">
      <div className="setup-panel split">
        <div>
          {editingCeremony && editingCeremony.custom ? (
            <CustomCard model={editingCeremony} setModel={attrs => (
              modifyCeremony(editingCeremony.id, attrs)
            )} />
          ) : (
            <Card id={id} namespace="ceremonies" theme={true} />
          )}
        </div>
        <div className="overflow-auto pr-4">
          <div className="mvc-input mvc-input__async">
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
          <div className="mvc-input mvc-input__cadence">
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
          <div className="mvc-input mvc-input__people">
            <div className="mvc-label flex flex-row items-center">
              <Icon icon="basic/user" className="mr-2" size={14} />
              <span>{t("setup.ceremony.participants")}</span>
            </div>
            <div className="ml-5 flex flex-row items-center">
              <Select
                components={{
                  MultiValueLabel: ParticipantOption,
                  Option: ParticipantOption,
                  IndicatorsContainer: () => null,
                }}
                classNamePrefix="mvc-multi-select"
                options={peopleOptions}
                isMulti={true}
                value={(editingCeremony || {}).people}
                onChange={people => modifyCeremony(id, { people: people || [] })}
                styles={{ container: existing => ({
                  ...existing,
                  width: "100%",
                  margin: "8px 0"
                }) }}
              />
            </div>
          </div>
          {!async && withOption(placement, 'withTime') && <div className="mvc-input mvc-input__time">
            <div className="mvc-label flex flex-row items-center">
              <Icon icon="time/time" className="mr-2" size={14} />
              <span>{t("setup.ceremony.time")}</span>
            </div>
            <div className="flex flex-row items-center ml-5">
              <div className="mvc-input__start-time">
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
              </div>
              <div className="mvc-note" style={{margin: "0 12px"}}>{t("common.to")}</div>
              <div className="mvc-input__end-time">
                <Select
                  isDisabled={!(startTime >= 0)}
                  options={endTimes}
                  value={startTimes.find(({ value }) => value === endTime)}
                  onChange={({ value }) => modifyCeremony(id, { endTime: value })}
                  styles={{ container: existing => ({
                    ...existing, minWidth: "150px", margin: "8px 0"
                  }) }}
                />
              </div>
              <div className="ml-2 mvc-note">
                {(startTime >= 0 && endTime >= 0) ? t(`hours.diff-${endTime - startTime}`) : '-'}
              </div>
            </div>
          </div>}
          <div className="mvc-input mvc-input__notes">
            <div className="mvc-label flex flex-row items-center">
              <Icon icon="basic/text-align-left" className="mr-2" size={14} />
              <span>{t(`setup.ceremony.${async ? 'asyncNotes' : 'syncNotes'}`)}</span>
            </div>
            <div className="ml-5">
              <textarea
                className="mvc-textarea w-full"
                name="notes"
                placeholder={t(`setup.ceremony.${async ? 'asyncNotesPlaceholder' : 'syncNotesPlaceholder'}`)}
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
