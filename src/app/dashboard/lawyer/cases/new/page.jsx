// src/app/dashboard/lawyer/cases/new/page.jsx
import LawyerProfileForm from "./LawyerProfileForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const getLoggedInLawyerFirm = async (lawyerId) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/lawfirms?lawyerId=${lawyerId}`;
        console.log("Fetching lawfirm from:", url); // ← check terminal for exact URL

        const res = await fetch(url, { cache: "no-store" });

        // Guard: server returned HTML (404/500 error page) instead of JSON
        const contentType = res.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
            console.error("Server did not return JSON. Status:", res.status, "URL:", url);
            return null;
        }

        if (!res.ok) {
            console.error("Lawfirm fetch failed with status:", res.status);
            return null;
        }

        const firms = await res.json();
        return firms?.[0] || null; // return first firm for this lawyer
    } catch (err) {
        console.error("getLoggedInLawyerFirm error:", err.message);
        return null;
    }
};

const PostCasePage = async () => {
    const session  = await auth.api.getSession({ headers: await headers() });
    const user     = session?.user;
    const lawFirm  = await getLoggedInLawyerFirm(user?.id);

    return (
        <div>
            <LawyerProfileForm lawFirm={lawFirm} session={session} />
        </div>
    );
};

export default PostCasePage;
