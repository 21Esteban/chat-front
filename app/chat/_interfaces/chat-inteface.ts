export interface User {
    id:number,
    name:string,
    chats:Chat[]
}

export interface Chat {
    id:number
    name:string,
    lastMessage:string
    users:User[]
}