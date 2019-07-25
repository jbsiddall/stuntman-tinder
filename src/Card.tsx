import React, {useState} from 'react'
import styled from 'styled-components'

import {LIKE_GREEN, DISLIKE_RED, CenterContents, ColumnLayout} from "./commonlayout"
import * as models from './model'
import SwipeSpring from './SwipeSpring'

import EmptyProfile from './resources/EmptyCard.png'


const MAX_POSITION = 40  // maximum angle/position the swipe can take the card
const POSITION_THRESHOLD = 20 // angle/position that triggers the like/dislike if released

type SwipeableCardProps = Readonly<{
  stuntman: models.StuntmanModel,
  onLike: (stuntman: models.StuntmanModel, position: number) => void,
  onDislike: (stuntman: models.StuntmanModel, position: number) => void
}>

export function SwipeableCard(props: SwipeableCardProps) {
  // managed state for current state of swipe for top card
  const [position, setPosition] = useState(0)
  const [dragging, setDragging] = useState(false)

  const onPositionChange = (position: number) => {
    if (!dragging && position > 22) {
      // Very important to keep the ordering of the next lines.
      // if you change them, then a bug emerges that causes one card to be skipped
      // solution: consider a redesign so its less brittle
      setPosition(0)
      props.onLike(props.stuntman, position)
    } else if (!dragging && position < -22) {
      setPosition(0)
      props.onDislike(props.stuntman, position)
    } else {
      setPosition(position)
    }
  }

  return <DumbCardLayout position={position}
                         onPositionChange={onPositionChange}
                         dragging={dragging}
                         onDraggingChange={setDragging}
                         stuntmanName={props.stuntman.name}
                         stuntmanProfile={props.stuntman.profile} />
}

export function EmptyCard() {
  return <StaticCard name="No More Stuntmen" profile={EmptyProfile}/>
}

export function StaticCard(props: {name: string, profile: string, position?: number}) {
  return <DumbCardLayout
      position={props.position !== undefined ? props.position : 0}
      onPositionChange={() => {
      }}
      dragging={false}
      onDraggingChange={() => {
      }}
      stuntmanName={props.name}
      stuntmanProfile={props.profile} />
}

type DumbCardLayoutProps = Readonly<{
  position: number,
  onPositionChange: (position: number) => void,

  dragging: boolean,
  onDraggingChange: (dragging: boolean) => void,

  stuntmanName: string,
  stuntmanProfile: string
}>

export function DumbCardLayout(props: DumbCardLayoutProps) {
  // calculates how visible the LIKE/NOPE messages should be based on swipe position. between 0 and 1.
  const likePercentage = Math.min(1, Math.max(0, props.position) / POSITION_THRESHOLD)
  const dislikePercentage = Math.min(1, Math.min(0, props.position) / -POSITION_THRESHOLD)

  return <div className="carddeck">
    <SwipeSpring position={props.position}
                 onPositionChange={props.onPositionChange}
                 dragging={props.dragging}
                 onDraggingChange={props.onDraggingChange}
                 maxPosition={MAX_POSITION}>
      <RotateChildren angle={props.position}>
        <ColumnLayout>
          <div style={{position: 'absolute', width: '100%', top: '30px'}}>
            <CardMessageContainer>
              <CardMessage color={LIKE_GREEN} opacity={likePercentage} rotation={-20}>LIKE</CardMessage>
              <CardMessage color={DISLIKE_RED} opacity={dislikePercentage} rotation={20}>NOPE</CardMessage>
            </CardMessageContainer>
          </div>
          <StuntmanCardProfile profile={props.stuntmanProfile} />
          <div style={{position: 'absolute', width: '100%', top: '340px'}}>
            <CenterContents>
              <StuntmanCardName>{props.stuntmanName}</StuntmanCardName>
            </CenterContents>
          </div>
        </ColumnLayout>
      </RotateChildren>
    </SwipeSpring>
  </div>
}

export const RotateChildren = styled.div`
  transform: rotate(${(props: {angle: number}) => '' + props.angle + 'deg'});
  transform-origin: bottom center;
`

const CardMessageContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

interface CardMessageProps {color: string, opacity: number, rotation: number}
const CardMessage = styled.div`
  padding: 10px;
  border-style: solid;
  border-width: 3px;
  border-color: ${(props: CardMessageProps) => props.color};
  color: ${(props: CardMessageProps) => props.color};
  opacity: ${(props: CardMessageProps) => props.opacity};
  transform: rotate(${(props: CardMessageProps) => props.rotation}deg) ;
  font-weight: bold;
  font-size: 30px;
`

function StuntmanCardProfile(props: {profile: string}) {
  const disableDragging = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return <div>
    <img style={{borderRadius: '8px', width: '300px', height: '400px'}}
         src={props.profile}
         alt={props.profile}
         onDragStart={disableDragging}/>
  </div>
}

const StuntmanCardName = styled.div`
  text-align: center;
  margin: 10px 0px;
  font-size: 30px;
  font-weight: bold;
  color: white;
  background-color: rgba(0.5, 0.5, 0.5, 0.1);
`

