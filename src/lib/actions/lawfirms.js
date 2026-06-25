'use server'

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const createLawFirm = async (newLawFirmData) => {
    return serverMutation('/api/lawfirms', newLawFirmData );
}

export const updateLawFirm= async(id, data)=>{
  const result= await serverMutation(`/api/lawfirms/${id}`, data, 'PATCH');
  revalidatePath('/dashboard/admin/lawFirms')
  return result
}




