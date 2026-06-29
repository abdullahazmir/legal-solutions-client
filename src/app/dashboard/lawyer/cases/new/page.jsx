import LawyerProfileForm from "./LawyerProfileForm";
import { auth } from "@/lib/auth";        // ← missing
import { headers } from "next/headers";   // ← missing

const getLoggedInLawyerFirm = async (lawyerId, token) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/lawfirms?lawyerId=${lawyerId}`;

        const res = await fetch(url, {
            cache: "no-store",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const contentType = res.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
            console.error("Server did not return JSON. Status:", res.status);
            return null;
        }

        if (!res.ok) {
            console.error("Lawfirm fetch failed with status:", res.status);
            return null;
        }

        const firms = await res.json();
        return firms?.[0] || null;
    } catch (err) {
        console.error("getLoggedInLawyerFirm error:", err.message);
        return null;
    }
};

const PostCasePage = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    const user    = session?.user;
    const token   = session?.session?.token; // ← get token from session

    const lawFirm = await getLoggedInLawyerFirm(user?.id, token);

    return (
        <div>
            <LawyerProfileForm lawFirm={lawFirm} session={session} />
        </div>
    );
};
export default PostCasePage; 