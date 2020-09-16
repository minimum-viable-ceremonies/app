import React, { useState } from "react"
import Select from "react-select"
import { useTranslation } from "react-i18next"
import data from "emoji-mart/data/apple.json";
import Picker from 'emoji-mart/dist-es/components/picker/nimble-picker'

import ThemeOption from "./themeOption"
import "../styles/customCard.scss"
import "emoji-mart/css/emoji-mart.css"
import themeData from "../data/themes"

const CustomCard = ({ model, setModel }) => {
  const { t } = useTranslation()
  const [picker, setPicker] = useState(false)

  const themes = themeData.map(theme => ({
    value: theme,
    label: t(`themes.${theme}.name`)
  }))

  return (
    <div className="card custom-card flex-grow flex justify-center">
      <div className="card-content">
        <div className="flex flex-row justify-between items-start">
          <div className="card-icon">
            <button
              className="mvc-inline-edit"
              style={{height: "48px"}}
              onClick={() => setPicker(current => !current)}
              onKeyPress={({ key }) => key === 'enter' && setPicker(current => !current)}
            >{model.emoji}</button>
            {picker && <Picker
              set="apple"
              data={data}
              onSelect={({ native }) => {
                setModel({ emoji: native })
                setPicker(false)
              }} />}
          </div>
          <div className="card-theme">
            <Select
              components={{
                SingleValue: ThemeOption,
                Option: ThemeOption,
                IndicatorsContainer: () => null,
              }}
              className="custom-card-select mvc-inline-edit"
              classNamePrefix="custom-card-select"
              isSearchable={false}
              options={themes}
              value={themes.find(({ value }) => value === model.theme)}
              defaultValue={themes[0]}
              onChange={({ value }) => setModel({ theme: value })}
              styles={{ container: existing => ({
                ...existing,
                width: "100%",
                margin: "8px 0"
              }) }}
            />
          </div>
        </div>
        <div className="card-title">
          <input
            autoComplete="off"
            className="mvc-inline-edit appearance-none bg-transparent border-none w-full text-gray-700 placeholder-gray-600 focus:placeholder-gray-500 font-bold text-2xl mr-3 py-2 leading-tight focus:outline-none"
            name="title"
            placeholder={t("setup.ceremony.titlePlaceholder")}
            value={model.title}
            onChange={({ target: { value } }) => setModel({ title: value })}
          />
        </div>
        <div className="card-subheading">
          <input
            autoComplete="off"
            className="mvc-inline-edit appearance-none bg-transparent border-none w-full text-gray-700 placeholder-gray-600 focus:placeholder-gray-500 font-bold text-l mr-3 py-2 leading-tight focus:outline-none"
            name="subheading"
            placeholder={t("setup.ceremony.subheadingPlaceholder")}
            value={model.subheading}
            onChange={({ target: { value } }) => setModel({ subheading: value })}
          />
        </div>
        <div className="card-description">
          <textarea
            autoComplete="off"
            className="mvc-inline-edit appearance-none bg-transparent border-none w-full text-gray-700 placeholder-gray-600 focus:placeholder-gray-500 text-m mr-3 py-2 leading-tight focus:outline-none"
            name="description"
            placeholder={t("setup.ceremony.descriptionPlaceholder")}
            value={model.description}
            onChange={({ target: { value } }) => setModel({ description: value })}
          />
        </div>
      </div>
    </div>
  )
}

export default CustomCard
