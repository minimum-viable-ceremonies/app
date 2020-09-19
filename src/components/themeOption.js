import React from "react"
import ThemeBadge from "./themeBadge"

export default ({ data, innerRef, innerProps }) => {
  return (
    <div ref={innerRef} {...innerProps}>
      <ThemeBadge theme={data.value} />
    </div>
  )
}
