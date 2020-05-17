import React, { useState, useContext, useRef } from "react"
import Dropdown from "../components/basic/dropdown"
import Context from "../contexts/room"
import { document } from "browser-monads"

import "../styles/shareableLink.scss"

const ShareableLink = ({ text }) => {
  const { shareableLink } = useContext(Context)
  const [copied, setCopied] = useState(false)
  const linkRef = useRef()

  return (
    <div className="shareable-link">
      <Dropdown
        klass="sidebar-shareable-link"
        icon="basic/link"
        text={text}
        size={16}
        tooltip={copied ? "Copied to clipboard!" : "Click to copy shareable link"}
        onClick={() => {
          setCopied(true)
          linkRef.current.select()
          document.execCommand("copy")
          setTimeout(() => setCopied(false), 1000)
        }}
      />
      <textarea ref={linkRef} value={shareableLink} />
    </div>
  )
}

export default ShareableLink