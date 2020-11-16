import React, { useContext, useEffect, useState } from "react"
import Select from "react-select"
import { useTranslation } from "react-i18next"

import Context from "../contexts/modal"

const ShareSlack = () => {
  const { currentStep, nextStep, setModel } = useContext(Context)
  const { t } = useTranslation()
  const [channels, setChannels] = useState([])

  useEffect(() => {
    fetch(`${process.env.FUNCTIONS_HOST}/slack-list`)
      .then(response => response.json())
      .then(({ channels }) => setChannels(channels.map(({ id, name }) => ({
        label: `#${name}`,
        value: id
      }))))
  }, [])

  return (
    <div className="flex-grow">
      <h1 className="mb-4">{t("shareCard.slack.title")}</h1>
      <p className="mb-8">{t("shareCard.slack.helptext")}</p>
      <Select
        options={channels}
        defaultValue={channels[0]}
        onChange={({ value }) => setModel(model => ({ ...model, channel: value }))}
      />
    </div>
  )
}

export default ShareSlack
