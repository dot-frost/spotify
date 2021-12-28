import React, { useEffect, useState } from 'react';
import {
    HomeIcon,
    SearchIcon, LibraryIcon, PlusCircleIcon, HeartIcon, RssIcon
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react';
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom'
 
function Sidebar(props) {
    const spotifyApi = useSpotify()
    
    const {data:session, status} = useSession()
    const [ playlists , setPlaylists ] = useState([])
    
    const [ playlistId , setPlaylistId ] = useRecoilState(playlistIdState)
    
    useEffect(()=>{
        if (spotifyApi.getAccessToken()){
            spotifyApi.getUserPlaylists().then((data)=>{
               setPlaylists(data.body.items);
            }) 
        }
    },[session , spotifyApi]) 
    
    return (
        <div className="flex-col hidden h-screen p-5 overflow-y-scroll text-xs text-gray-500 border-r border-gray-900 lg:text-sm scrollbar-hide md:inline-flex sm:max-w-[12rem] lg:max-w-[15rem]">
            <div className="space-y-4">
                <button className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className="w-5 h-5"/>
                    <p>Home</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <SearchIcon className="w-5 h-5"/>
                    <p>Search</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <LibraryIcon className="w-5 h-5"/>
                    <p>Your Library</p>
                </button>
                <hr className="border-t border-gray-900"/>
                <button className="flex items-center space-x-2 hover:text-white">
                    <PlusCircleIcon className="w-5 h-5"/>
                    <p>Create Playlist</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HeartIcon className="w-5 h-5"/>
                    <p>Liked Songs</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <RssIcon className="w-5 h-5"/>
                    <p>Your Episodes</p>
                </button>
                <hr className="border-t border-gray-900"/>
            </div>
            {/* Playlist */}
            <div className="mt-4 space-y-4">
                {playlists.map(playlist=>{
                    return (
                        <p className="cursor-pointer hover:text-white" onClick={()=> setPlaylistId(playlist.id)} key={playlist.id}>
                            {playlist.name}
                        </p>
                    )
                })}
            </div>

        </div>
    );
}

export default Sidebar;