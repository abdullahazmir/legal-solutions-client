
import { serverFetch } from "../core/server"

export const getApplicationsByClient = async (clientId)=>{
    
    return serverFetch(`/api/applications?clientId=${clientId}`)
}