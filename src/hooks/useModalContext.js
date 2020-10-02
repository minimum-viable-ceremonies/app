import { useState, useMemo } from "react"

export default (initialModel, initialStep = 0, steps = [], close) => {
  const [model, setModel] = useState(initialModel)
  const [index, setIndex] = useState(initialStep)
  const [submitting, setSubmitting] = useState(false)
  const currentStep = useMemo(() => ({
    canProceed: () => true,
    perform: () => Promise.resolve(true),
    index,
    ...steps[index]
  }), [steps, index])


  const prevStep = () => setIndex(i => i - 1)
  const nextStep = () => {
    setSubmitting(true)
    currentStep.perform(model).then(() => (
      index < steps.length - 1
        ? setIndex(i => i + 1)
        : close(null) || setModel(initialModel)
    )).finally(() => setSubmitting(false))
  }

  return {
    model, setModel,
    submitting,
    currentStep,
    close,
    prevStep, nextStep,
    nextStepOnEnter: ({ which }) => (
      which === 13 &&
      currentStep.canProceed(model) &&
      nextStep()
    )
  }
}
