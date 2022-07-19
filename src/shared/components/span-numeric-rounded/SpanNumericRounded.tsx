import React from "react";

interface Props {
  value: number;
  styles?: string;
  startAdornment?: string
}

const SpanNumbericRounded = ({value, styles, startAdornment}: Props) => {

  const round2Decimals = (input) => {
    return Math.round(input * 100) / 100
  }

  return (
    <span className={styles}>{ startAdornment ? startAdornment : ''} {round2Decimals(value)}</span>
  )
}

export default SpanNumbericRounded;