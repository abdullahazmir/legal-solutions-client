import CaseListingContainer from "@/components/Cases/CaseListingContainer";

const getCases = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/lawyers`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
};

export default async function CasesPage() {
  const cases = await getCases();

  return (
    <div className="w-full min-h-screen bg-zinc-950 p-6 md:p-12 text-white">
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Browse Lawyers</h1>
        <p className="text-zinc-400 mt-2">Find the right legal expert for your case.</p>
      </div>
      <CaseListingContainer initialCases={cases || []} />
    </div>
  );
}