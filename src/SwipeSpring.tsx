import React  from "react"
// @ts-ignore - no signatures for this module
import useInterval from 'react-useinterval'


type SwipeSpringProps = Readonly<{
  position: number,
  onPositionChange: (position: number) => void,

  dragging: boolean,
  onDraggingChange: (dragging: boolean) => void,

  maxPosition: number,

  children: JSX.Element[] | JSX.Element
}>


export default function SwipeSpring(props: SwipeSpringProps) {

  // how many pixels the spring will bounce back every tick
  const SPRING_STRENGTH = 1

  // how long each tick waits in milliseconds
  const TICK_TIMEOUT = 10


  const startDragging = () => {
    if (props.dragging) {
      return
    }
    props.onDraggingChange(true)
  }

  const stopDragging = () => {
    if (!props.dragging) {
      return
    }
    props.onDraggingChange(false)
  }

  const onMouseMove = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!props.dragging) {
      return
    }

    const newPositionIgnoringMax = props.position + e.movementX
    const direction = newPositionIgnoringMax / Math.abs(newPositionIgnoringMax)
    const newPosition = Math.abs(newPositionIgnoringMax) <= props.maxPosition ? newPositionIgnoringMax : props.maxPosition * direction

    props.onPositionChange(newPosition)
  }

  const onTick =() => {
    if (props.dragging) {
      return
    }

    if (props.position === 0) {
      return
    }

    if (Math.abs(props.position) <= SPRING_STRENGTH) {
      props.onPositionChange(0)
      return
    }

    const direction = props.position / Math.abs(props.position)
    const newPosition = props.position - direction * SPRING_STRENGTH

    props.onPositionChange(newPosition)
  }
  useInterval(onTick, TICK_TIMEOUT)

  return <div onMouseDown={startDragging}
              onMouseLeave={stopDragging}
              onMouseUp={stopDragging}
              onMouseMove={onMouseMove}>
    {props.children}
  </div>

}

