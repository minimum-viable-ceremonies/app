import React, { useState, useRef } from "react"
import { navigate } from "gatsby"
import { createRoom } from "../db/firebase"
import { document } from "browser-monads"
import phrase from "random-words"
import useRoomContext from "../hooks/useRoomContext"

import Controls from "./basic/controls"

import "../styles/setup.scss"

const SetupRoom = () => {
  const linkRef = useRef()
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const room = useRoomContext(phrase({ exactly: 3, join: '-' }))
  const steps = [{
    nextText: 'Ok, got it!',
    backText: null,
    canProceed: () => true
  }, {
    nextText: 'Next →',
    backText: '← Back',
    canProceed: () => room.uuidValid
  }, {
    nextText: 'Next →',
    backText: '← Back',
    canProceed: () => room.weekCountValid
  }, {
    nextText: 'Create room',
    backText: '← Back',
    canProceed: () => true,
    submitting
  }]

  return (
    <div className="setup-room setup">
      <div className="setup-room-slides setup-slides" style={{ marginLeft: `-${100 * step}%`}}>
        <div className="setup-room-slide setup-slide setup-room-help">
          <h1>Welcome to Minimum Viable Ceremonies!</h1>
          <p>Here is some help to get you started</p>
        </div>
        <div className="setup-room-slide setup-slide setup-room-name">
          <h1>What would you like to call your room?</h1>
          <input
            className="btn-input"
            name="uuid"
            placeholder="e.g. wealthy-dusty-llama"
            value={room.uuid}
            onChange={({ target: { value } }) => room.setUuid(value)}
          />
        </div>
        <div className="setup-room-slide setup-slide setup-room-week-count">
          <h1>How long are your sprints?</h1>
          {[1,2].map(weekCount => (
            <label key={weekCount}>
              <input
                type="radio"
                name="weekCount"
                value={weekCount}
                onChange={({ target: { value } }) => room.setWeekCount(value)}
              />
              {weekCount} week{weekCount === 1 ? '' : 's'}
            </label>
          ))}
        </div>
        <div className="setup-room-slide setup-slide setup-room-link">
          <h1>Ready to go!</h1>
          <p>Just share the following link with your team to get started</p>
          <input
            ref={linkRef}
            className="btn-input"
            name="link"
            readOnly={true}
            value={`${document.location.origin}/room/${room.uuid}`}
          />
          <button className="btn btn-blue" onClick={() => {
            linkRef.current.select()
            document.execCommand("copy")
          }}>Copy</button>
        </div>
      </div>
      <Controls index={step} max={steps.length-1} step={{
        ...steps[step],
        back: () => setStep(step => step - 1),
        next: step < steps.length -1
          ? () => setStep(step => step + 1)
          : () => {
            setSubmitting(true)
            createRoom(room).then(
              () => navigate(`room`, { state: { uuid: room.uuid } }),
              () => setSubmitting(false)
            )
          }
      }} />
    </div>
  )
}

export default SetupRoom
