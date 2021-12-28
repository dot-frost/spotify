import Song from './Song';

function Songs({ tracks }) {
    return (
        <div className="flex flex-col px-8 space-y-1 text-white pb-28">
            {tracks?.map(function (track, order) {
                return <Song track={track} order={order+1} key={track.track.id}/>
            })}
        </div>
    )
}

export default Songs
