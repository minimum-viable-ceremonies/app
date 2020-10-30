import React, { useState, useRef } from "react"
import { document } from "browser-monads"
import { useTranslation } from "react-i18next"

import Dropdown from "./dropdown"
import "../styles/shareableLink.scss"

const ShareableLink = ({ text, value, position, hideInput, size = 16 }) => {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)
  const linkRef = useRef()

  return (
    <div className="shareable-link">
      <input
        className={`copy-link ${hideInput ? "offscreen" : ""}`}
        readOnly={true}
        ref={linkRef}
        value={value}
      />
      <Dropdown
        position={position}
        klass="light"
        text={text}
        size={size}
        tooltip={t(`shareableLink.${copied ? 'copied' : 'copy'}`)}
        onClick={() => {
          setCopied(true)
          linkRef.current.select()
          document.execCommand("copy")
          setTimeout(() => setCopied(false), 1000)
        }}
      />
    </div>
  )
}

export default ShareableLink
