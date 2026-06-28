// components/CaseCard.jsx
import { Card } from "@heroui/react";
import Link from "next/link";
import {
    LocationArrow,
    Briefcase,
    CircleDollar,
    Clock,
    Star,
    LocationArrowFill,
} from "@gravity-ui/icons";

const getAvailabilityStyle = (availability) => {
    switch (availability?.toLowerCase()) {
        case "available": return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
        case "busy":      return "bg-red-500/15 text-red-400 border-red-500/30";
        default:          return "bg-zinc-500/15 text-zinc-400 border-zinc-500/30";
    }
};

export default function CaseCard({ c }) {
    const caseId = c._id?.$oid || c._id;
    // console.log(caseId)

    return (
        <Card className="bg-[#161618] border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-all duration-200 hover:-translate-y-0.5 flex flex-col h-full">
            <Card.Header className="p-5 pb-0 flex flex-row items-start justify-between gap-3">
                {/* Photo */}
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700 shrink-0">
                    <img
                        src={c.photoUrl}
                        alt={c.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Availability badge */}
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getAvailabilityStyle(c.availability)}`}>
                    {c.availability === "Available" ? "✦ Available" : "● Busy"}
                </span>
            </Card.Header>

            <Card.Content className="p-5 flex flex-col gap-3 flex-1">
                {/* Name + specialization */}
                <div>
                    <h3 className="text-white font-bold text-lg leading-tight">{c.name}</h3>
                    <p className="text-zinc-400 text-sm mt-0.5">{c.specialization}</p>
                </div>

                {/* Bio */}
                <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2">{c.bio}</p>

                {/* Tags row */}
                <div className="flex flex-wrap gap-2">
                    <span className="flex items-center gap-1 text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-full">
                        <Briefcase size={11} /> {c.specialization}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-full">
                        <LocationArrow size={11} /> {c.location}
                    </span>
                    {c.languages && (
                        <span className="flex items-center gap-1 text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-full">
                            🌐 {c.languages.split(",")[0].trim()}
                        </span>
                    )}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 pt-1">
                    <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                        <Star size={11} className="text-zinc-600" />
                        {c.experience} yrs exp.
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                        <Clock size={11} className="text-zinc-600" />
                        {c.consultationHours}h / session
                    </span>
                </div>
            </Card.Content>

            {/* Divider + Footer */}
            <div className="border-t border-zinc-800 mx-5" />
            <Card.Footer className="p-5 flex items-center justify-between">
                <span className="flex items-center gap-1 text-white font-bold text-base">
                    <CircleDollar size={15} className="text-zinc-400" />
                    {c.currency} {c.consultationFee}
                    <span className="text-zinc-500 font-normal text-xs ml-0.5">/ consult</span>
                </span>

                <Link
                    href={`/cases/${caseId}`}
                    className="flex items-center gap-1.5 text-sm font-semibold text-white hover:text-zinc-300 transition-colors"
                >
                    Details →
                </Link>
            </Card.Footer>
        </Card>
    );
}