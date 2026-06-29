// src/app/dashboard/user/update-profile/page.jsx
import UpdateProfileForm from "./UpdateProfileForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const UpdateProfilePage = async () => {
    const session = await auth.api.getSession({ headers: await headers() });

    return (
        <div>
            <UpdateProfileForm session={session} />
        </div>
    );
};

export default UpdateProfilePage;