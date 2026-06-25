import { Suspense } from "react";
import SigninForm from "./SigninForm";

export default function SigninPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    }>
      <SigninForm />
    </Suspense>
  );
}