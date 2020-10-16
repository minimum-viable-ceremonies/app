import React, { useContext, useState, useRef } from "react"

import Context from "../contexts/room"
import useScreenEnforcedRef from "../hooks/useScreenEnforcedRef"
import "../styles/dropdown.scss"

const Dropdown = ({
  klass,
  position = 'right',
  theme = 'dark',
  styles = {},
  delay = 0,
  icon,
  size,
  text,
  width,
  tooltip,
  dropdown,
  onClick
}) => {
  const { boardRef } = useContext(Context)
  const opening = useRef(false)
  const [open, setOpen] = useState(false)
  const tooltipRef = useScreenEnforcedRef(boardRef)

  return (
    <div style={styles} className={`dropdown ${klass} ${open ? 'open' : 'closed'} mvc-hover-state`}>
      <div
        className="dropdown-button"
        onClick={onClick}
        onMouseEnter={() => {
          delay > 0 ? (
            opening.current = true &&
            setTimeout(() => opening.current ? setOpen(true) : null, delay)
          ) : (
            setOpen(true)
          )
        }}
        onMouseLeave={() => {
          opening.current = false
          setOpen(false)
        }}
      >
        {text && <span>{text}</span>}
      </div>
      {tooltip && <div ref={tooltipRef} style={width ? {width} : {whiteSpace: 'nowrap'}} className={`dropdown-tooltip ${position} ${theme}`}>
        {tooltip}
      </div>}
    </div>
  )
}

export default Dropdown
