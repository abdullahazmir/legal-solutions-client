import { protectedFetch, serverFetch } from "../core/server";
import { getUserSession } from "../core/session";



export const getLawFirms= async()=>{
    return protectedFetch('/api/lawfirms')

    // return serverFetch('/api/lawfirms')


}
export const getLawyerLawFirms = async (lawyerId) => {
    return serverFetch(`/api/my/lawfirms?lawyerId=${lawyerId}`);

}

export const getLoggedInLawyerLawFirms = async () => {
    const user = await getUserSession();
    return getLawyerLawFirms(user?.id);
}
