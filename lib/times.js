

export function millisToMinutesAndSeconds(millis){
    const seconds = ~~(millis / 1000)
    const second = (seconds % 60).toFixed(0)
    const minute = ~~(seconds / 60).toFixed(0)
    
    return `${minute.toString().padStart(2,0)}:${second.toString().padStart(2,0)}`
}