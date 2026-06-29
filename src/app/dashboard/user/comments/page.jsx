// src/app/dashboard/user/comments/page.jsx
import CommentsContainer from "./CommentsContainer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const getComments = async (caseId) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments?caseId=${caseId}`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("getComments error:", err);
    return [];
  }
};

export default async function CommentsPage({ searchParams }) {
  const params          = await searchParams;
  const { applicationId, caseId, caseName, lawyerName } = params;

  const session  = await auth.api.getSession({ headers: await headers() });
  const comments = await getComments(caseId);

  return (
    <main className="min-h-screen bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">Comments</h1>
          <p className="text-zinc-400 text-sm mt-2">
            Case: <span className="text-zinc-200 font-medium">{decodeURIComponent(caseName || "")}</span>
            {" · "}Lawyer: <span className="text-zinc-200 font-medium">{decodeURIComponent(lawyerName || "")}</span>
          </p>
        </div>

        <CommentsContainer
          session={session}
          applicationId={applicationId}
          caseId={caseId}
          caseName={caseName}
          lawyerName={lawyerName}
          initialComments={comments}
        />

      </div>
    </main>
  );
}