
import { protectedFetch, serverFetch } from "../core/server"

export const getApplicationsByClient = async (clientId)=>{
    
    return protectedFetch(`/api/applications?clientId=${clientId}`)
}