import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";


export const getLawyerLawFirms = async (lawyerId) => {
    return serverFetch(`/api/my/lawfirms?lawyerId=${lawyerId}`);

}

export const getLoggedInLawyerLawFirms = async () => {
    const user = getUserSession();
    return getLawyerLawFirms(user?.id);
}
