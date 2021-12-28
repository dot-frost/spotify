import { atom } from "recoil";

export const currentTrackIdState = atom({
    key: "currentTrackId",
    default: null
})

export const isPlayingState = atom({
    key: "isPlaying",
    default: false
})