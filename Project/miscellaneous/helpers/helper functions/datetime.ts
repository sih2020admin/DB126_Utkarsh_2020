export function formatDate(date:string){
    let temp = new Date(date)
    return `${temp.getDate()}/${temp.getMonth() + 1}/${temp.getFullYear()}`
}

export function formatTime(time:string){
    let temp = new Date(time)
    return `${temp.getHours()}:${temp.getMinutes()}:${temp.getSeconds()}`
}

