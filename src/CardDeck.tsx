import React from 'react'

import * as models from './model'
import {EmptyCard, StaticCard, SwipeableCard} from './Card'


type CardDeckProps = Readonly<{
  stuntmanDeck: ReadonlyArray<models.StuntmanModel>,
  onLike: (stuntman: models.StuntmanModel, position: number) => void,
  onDislike: (stuntman: models.StuntmanModel, position: number) => void
}>

export default function CardDeck(props: CardDeckProps) {
  const frontStuntman: models.StuntmanModel | undefined = props.stuntmanDeck[0]
  const backgroundStuntman: models.StuntmanModel | undefined = props.stuntmanDeck[1]

  if (frontStuntman === undefined) {
    return <EmptyCard/>
  }

  const backgroundCard = backgroundStuntman === undefined ? <EmptyCard/> : (
      <StaticCard name={backgroundStuntman.name} profile={backgroundStuntman.profile}/>
  )

  return <div>
    <div style={{position: 'absolute'}}>
      {backgroundCard}
    </div>
    <SwipeableCard stuntman={frontStuntman} onLike={props.onLike} onDislike={props.onDislike}/>
  </div>
}
