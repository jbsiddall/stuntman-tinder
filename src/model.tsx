import ArnoldSwarznigelProfile from './resources/ArnoldSwarznigel.png'
import TomCrustProfile from './resources/TomCrust.png'
import NicholasCagedProfile from './resources/NicholasCaged.png'


export type StuntmanModel = Readonly<{
  id: number,
  name: string,
  profile: string
}>

export type Model = Readonly<{
  unseenStuntmen: ReadonlyArray<StuntmanModel>,
  likedStuntmen: ReadonlyArray<StuntmanModel>,
  dislikedStuntmen: ReadonlyArray<StuntmanModel>,
}>

export function createInitialModel(): Model {
  return {
    unseenStuntmen: [
      {id: 0, name: "Tom Crust", profile: TomCrustProfile},
      {id: 1, name: "Nicholas Caged", profile: NicholasCagedProfile},
      {id: 2, name: "Arnold Swarznigel", profile: ArnoldSwarznigelProfile}
    ],
    likedStuntmen: [],
    dislikedStuntmen: []
  }
}

export function dislikeStuntman(model: Model, stuntman: StuntmanModel): Model {
  const frontStuntman = model.unseenStuntmen[0]

  if (frontStuntman === undefined) {
    return model
  }

  if (frontStuntman.id !== stuntman.id) {
    return model
  }

  return {...model,
    unseenStuntmen: model.unseenStuntmen.slice(1),
    dislikedStuntmen: [frontStuntman].concat(model.dislikedStuntmen)
  }
}

export function likeStuntman(model: Model, stuntman: StuntmanModel): Model {
  const frontStuntman = model.unseenStuntmen[0]

  if (frontStuntman === undefined) {
    return model
  }

  if (frontStuntman.id !== stuntman.id) {
    return model
  }

  return {...model,
    unseenStuntmen: model.unseenStuntmen.slice(1),
    likedStuntmen: [frontStuntman].concat(model.likedStuntmen)
  }
}
