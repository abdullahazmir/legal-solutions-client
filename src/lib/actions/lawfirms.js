'use server'

import { serverMutation } from "../core/server";

export const createLawFirm = async (newLawFirmData) => {
    return serverMutation('/api/lawfirms', newLawFirmData );
}




// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const createCompany = async (newCompanyData) => {
//     const res = await fetch(`${baseUrl}/api/companies`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newCompanyData),
//     });

//     return res.json();
// }