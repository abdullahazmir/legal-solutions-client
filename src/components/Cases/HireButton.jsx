"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { ArrowUpRight } from "@gravity-ui/icons";

export default function HireButton({ caseId, isAvailable, session }) {
    <h1>apply to book</h1>
    const pathname = usePathname();
    const router   = useRouter();

    const handleClick = () => {
        if (!session) {
            // Not logged in — go to signin with current page as redirect
            router.push(`/auth/signin?redirect=/cases/${caseId}/apply`);
            return;
        }
        // Logged in — go directly to apply page
        router.push(`/cases/${caseId}/apply`);
    };

    return (
        <Button
            onPress={handleClick}
            isDisabled={!isAvailable}
            className={`w-full font-semibold py-6 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 ${
                isAvailable
                    ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                    : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
            }`}
            endContent={isAvailable ? <ArrowUpRight className="w-4 h-4" /> : null}
        >
            {!session
                ? "Sign in to Request"
                : isAvailable
                    ? "Request Consultation"
                    : "Currently Unavailable"}
        </Button>
    );
}