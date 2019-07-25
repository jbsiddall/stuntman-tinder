import React, {useState} from 'react'
import 'primeicons/primeicons.css'

import Controls from './Controls'
import CardDeck from './CardDeck'
import * as models from './model'
import OffscreenCardAnimation from "./OffscreenCardAnimation";
import {CenterContents, ColumnLayout} from "./commonlayout";


type AnimationState = Readonly<{
  stuntman: models.StuntmanModel,
  direction: number,
  initialPosition: number
}>

export default function App() {
  const [model, setModel] = useState(models.createInitialModel())

  const [animation, setAnimation] = useState<AnimationState | undefined>(undefined)

  const onLike = (stuntman: models.StuntmanModel, position: number) => {
    if (animation !== undefined) {
      // stops user from liking another stuntman whilst previous animation still running
      return
    }
    setModel(models.likeStuntman(model, stuntman))
    setAnimation({stuntman: stuntman, direction: 1, initialPosition: position})
  }

  const onDislike = (stuntman: models.StuntmanModel, position: number) => {
    if (animation !== undefined) {
      // stops user from liking another stuntman whilst previous animation still running
      return
    }
    setModel(models.dislikeStuntman(model, stuntman))
    setAnimation({stuntman: stuntman, direction: -1, initialPosition: position})
  }

  const controls = (model.unseenStuntmen[0] === undefined) ? null : (
      <Controls stuntman={model.unseenStuntmen[0]} onLike={onLike} onDislike={onDislike}/>
  )

  return (
    <CenterContents>
      <ColumnLayout className="app">
        <CardDeck stuntmanDeck={model.unseenStuntmen}
                  onLike={onLike}
                  onDislike={onDislike}
        />
        {animation !== undefined && (
            <OffscreenCardAnimation stuntman={animation.stuntman}
                                    direction={animation.direction}
                                    initialPosition={animation.initialPosition}
                                    onAnimationFinish={() => setAnimation(undefined)}/>
        )}
        {controls}
      </ColumnLayout>
    </CenterContents>
  )
}
