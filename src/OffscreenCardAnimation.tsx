import React, {useState} from 'react'
// @ts-ignore - no signatures for this module
import useInterval from 'react-useinterval'

import * as models from './model'
import {StaticCard} from "./Card";


const MAX_POSITION = 180
const SPEED = 15
const TICK_DELAY = 20 // millis

type Props = Readonly<{
  stuntman: models.StuntmanModel,
  direction: number, // either -1 for left or 1 for right.
  initialPosition: number,
  onAnimationFinish: () => void
}>

export default function OffscreenCardAnimation(props: Props) {

  const [position, setPosition] = useState<number>(props.initialPosition)

  useInterval(
      () => !isAnimationFinished(position) && setPosition(calculateNewPosition(position, props.direction)),
      isAnimationFinished(position) ? undefined : TICK_DELAY
  )

  if (isAnimationFinished(position)) {
    props.onAnimationFinish()
  }

  const opacity = 1 - Math.min(1, Math.abs(position) / MAX_POSITION)

  return <div style={{position: 'absolute', opacity: opacity}}>
    <StaticCard name={props.stuntman.name} profile={props.stuntman.profile} position={position}/>
  </div>
}

function isAnimationFinished(position: number) {
  return Math.abs(position) >= MAX_POSITION
}

function calculateNewPosition(position: number, direction: number) {
  const newPosition = position + direction * SPEED
  if (Math.abs(newPosition) > MAX_POSITION) {
    return MAX_POSITION * direction
  }
  return newPosition
}