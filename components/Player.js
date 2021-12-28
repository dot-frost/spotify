import { useSession } from "next-auth/react"
import useSpotify from "../hooks/useSpotify"
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { useCallback, useEffect, useState } from "react";
import useSongInfo from '../hooks/useSongInfo';

import { FastForwardIcon, PauseIcon, PlayIcon, ReplyIcon, RewindIcon, SwitchHorizontalIcon, VolumeOffIcon, VolumeUpIcon } from "@heroicons/react/solid";
import { debounce } from "lodash";

function Player() {
    const spotifyApi = useSpotify()

    const { data: session, status } = useSession()
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const [volume, setVolume] = useState(50)

    const songInfo = useSongInfo()

    const fetchCurrentSong = () => {
        if (!songInfo || true) {
            spotifyApi.getMyCurrentPlayingTrack().then(data => {
                console.log('Now Playing : ', data)
                setCurrentTrackId(data.body?.item?.id)

                spotifyApi.getMyCurrentPlaybackState().then(data => {
                    console.log(data)
                    setIsPlaying(data.body?.is_playing)
                })
            })
        }
    }

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrentSong();
            setVolume(50)
        }
    }, [currentTrackId, spotifyApi, session])
    
    const handelPlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then(data => {
            if (data.body.is_playing) {
                spotifyApi.pause()
                setIsPlaying(false)
            } else {
                spotifyApi.play()
                setIsPlaying(true)
            }
        })
    }


    useEffect(() => {
        debounceAdjustVolume(volume)
    }, [volume, spotifyApi, session])


    const debounceAdjustVolume = useCallback(
        debounce((volume)=>{
            spotifyApi.setVolume(volume).catch(e => console.error(e))
        }, 500)
        ,[
            
        ])

    return (
        <div className="grid h-24 grid-cols-3 px-2 text-xs text-white bg-gradient-to-b from-black to-gray-900 md:text-base md:px-8">
            {/* Left */}
            <div className="flex items-center space-x-4">
                <img className="hidden w-10 h-10 md:inline-flex" src={songInfo?.album.images?.[0].url} alt="" />
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0].name}</p>
                </div>
            </div>
            {/* Center */}
            <div className="flex items-center justify-evenly">
                <SwitchHorizontalIcon className="button" />
                <RewindIcon className="button" />
                {
                    isPlaying ?
                        (<PauseIcon onClick={handelPlayPause} className="button" />)
                        :
                        (<PlayIcon onClick={handelPlayPause} className="button" />)
                }
                <FastForwardIcon className="button" />
                <ReplyIcon className="button" />
            </div>
            {/* Right */}
            <div className="flex items-center justify-end pr-5 space-x-3 md:space-x-4">
                <VolumeOffIcon className="button"
                onClick={()=> setVolume(0)}
                />
                <input type="range" value={volume} min={0} max={100}
                    onChange={e => setVolume(Number(e.target.value))} />
                <VolumeUpIcon className="button" 
                onClick={()=> setVolume(100)}
                />
            </div>
        </div>
    )
}

export default Player
