import { Suspense } from "react";
import SignupForm from "./SignupForm";

export default function SignupPage() {
    return (
        <Suspense fallback={
            <div
                className="min-h-screen flex items-center justify-center"
                style={{ background: "linear-gradient(160deg, #0f0f10 0%, #111113 60%, #13110f 100%)" }}
            >
                <p style={{ color: "#71717a", fontSize: 13 }}>Loading...</p>
            </div>
        }>
            <SignupForm />
        </Suspense>
    );
}