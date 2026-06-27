"use client";
import { Button } from "@heroui/react";
import { useState } from "react";

// ✅ NO imports from server.js or session.js

export default function SaveCaseButton({ caseData, session }) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!session) return window.location.href = "/auth/signin";

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/savecases`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.session.token}` // 👈 token from session prop
        },
        body: JSON.stringify({
          caseId:          caseData._id,
          name:            caseData.name,
          specialization:  caseData.specialization,
          location:        caseData.location,
          consultationFee: caseData.consultationFee,
          currency:        caseData.currency,
          photoUrl:        caseData.photoUrl,
          availability:    caseData.availability,
        }),
      });

      const data = await res.json();
      if (data.error === "Already saved") {
        alert("You have already saved this lawyer.");
      } else {
        setSaved(true);
      }
    } catch (err) {
      alert("Failed to save. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSave}
      disabled={loading || saved}
      className="btn btn-success w-full text-zinc-200 text-center text-xs font-semibold px-3 py-2 rounded-xl border"
    >
      {saved ? "✦ Saved!" : loading ? "Saving..." : "✦ Save Case"}
    </Button>
  );
}