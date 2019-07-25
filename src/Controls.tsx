import React from 'react'
import styled from 'styled-components'
import * as models from './model'

import {LIKE_GREEN, DISLIKE_RED} from "./commonlayout";

type ControlsProps = Readonly<{
  stuntman: models.StuntmanModel,
  onLike: (stuntman: models.StuntmanModel, position: number) => void,
  onDislike: (stuntman: models.StuntmanModel, position: number) => void
}>

export default function Controls(props: ControlsProps) {
  return <ControlStyle className="controls">
    <ControlButton color={DISLIKE_RED} onClick={() => props.onDislike(props.stuntman, 0)} icon="pi-times" />
    <ControlButton color={LIKE_GREEN} onClick={() => props.onLike(props.stuntman, 0)} icon="pi-check" />
  </ControlStyle>
}

const ControlStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 10px;
`

const ControlButtonStyle = styled.div`
  color: ${(props: {color: string}) => props.color};
  font-size: 2em;
  border-radius: 50%;
  text-align: sub;
  border-style: solid;
  border-size: 1px;
  border-color: ${(props: {color: string}) => props.color};
`

function ControlButton(props: {color: string, icon: string, onClick: () => void}) {
  return <ControlButtonStyle color={props.color} onClick={props.onClick}>
    <i className={`pi ${props.icon}`} />
  </ControlButtonStyle>
}
