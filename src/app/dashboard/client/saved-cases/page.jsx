// app/dashboard/client/saved-cases/page.jsx
import { getSavedCases } from "@/lib/api/savecases";
import Link from "next/link";

export default async function SavedCasesPage() {
  const savedCases = await getSavedCases();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-white mb-6">Saved Cases</h1>

      {savedCases.length === 0 ? (
        <p className="text-zinc-500">You haven't saved any lawyers yet.</p>
      ) : (
        <table className="w-full text-sm text-zinc-300">
          <thead>
            <tr className="text-zinc-500 border-b border-zinc-800 text-left">
              <th className="pb-3 pr-4">Lawyer</th>
              <th className="pb-3 pr-4">Specialization</th>
              <th className="pb-3 pr-4">Location</th>
              <th className="pb-3 pr-4">Fee</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3">Details</th>
            </tr>
          </thead>
          <tbody>
            {savedCases.map((s) => (
              <tr key={s._id} className="border-b border-zinc-800/50 hover:bg-zinc-900/40 transition">
                <td className="py-3 pr-4 flex items-center gap-3">
                  <img src={s.photoUrl} className="w-8 h-8 rounded-xl object-cover" />
                  {s.name}
                </td>
                <td className="py-3 pr-4">{s.specialization}</td>
                <td className="py-3 pr-4">{s.location}</td>
                <td className="py-3 pr-4">{s.currency} {s.consultationFee}</td>
                <td className="py-3 pr-4">{s.availability}</td>
                <td className="py-3">
                  <Link
                    href={`/cases/${s.caseId}`}
                    className="text-xs text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-lg hover:bg-emerald-500/10 transition"
                  >
                    View Details →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}