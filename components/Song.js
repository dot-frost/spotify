import { useRecoilState } from "recoil"
import { millisToMinutesAndSeconds } from "../lib/times"
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import { useEffect } from "react";
import useSpotify from '../hooks/useSpotify';

function Song({ track, order }) {
    const spotifyApi = useSpotify()
    const [currentTrackId , setCurrentTrackId ] = useRecoilState(currentTrackIdState)
    const [isPlaying , setIsPlaying] = useRecoilState(isPlayingState)

    const playSong = ()=>{
        setCurrentTrackId(track.track.id)        
        setIsPlaying(true)
        spotifyApi.play({
            uris: [track.track.uri]
        }).catch(error => console.error(error.body.error.message))
    }

    
    return (
        <div className="grid grid-cols-2 px-5 py-4 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-900"
        onClick={playSong}
        >
            <div className="flex items-center space-x-4" key={track.id}>
                <p>{order}</p>
                <img
                    className="w-10 h-10"
                    src={track.track.album.images.find(i => i.height === 64).url} />

                <div>
                    <p className="text-white truncate w-36 lg:w-64">
                        {track.track.name}
                    </p>
                    <p className="w-40">
                        {track.track.artists[0].name}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between ml-auto md:ml-0">
                <p className="hidden w-40 md:inline">
                    {track.track.album.name}
                </p>
                <p>
                    {millisToMinutesAndSeconds(track.track?.duration_ms)}
                </p>
            </div>
        </div>
    )
}

export default Song
