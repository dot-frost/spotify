
import useSpotify from './useSpotify';
import { useRecoilState } from 'recoil';
import { currentTrackIdState } from '../atoms/songAtom';
import { useEffect, useState } from 'react';
function useSongInfo() {
    const spotifyApi = useSpotify()
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [songInfo, setSongInfo] = useState(null)

    useEffect(() => {
        if (currentTrackId && spotifyApi.getAccessToken()) {
            const fetchSongInfo = async () => {
                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${currentTrackId}`,
                    {
                        headers: {
                            Authorization: 'Bearer ' + spotifyApi.getAccessToken(),
                        }
                    }).then(res => res.json())
                setSongInfo(trackInfo)
            }
            fetchSongInfo();
        }

    }, [currentTrackId, spotifyApi])

    return songInfo
}

export default useSongInfo
