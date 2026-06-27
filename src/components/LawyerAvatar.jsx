// src/app/dashboard/lawyer/cases/components/LawyerAvatar.jsx
"use client";

export default function LawyerAvatar({ src, alt }) {
    return (
        <img
            src={src}
            alt={alt}
            className="w-9 h-9 rounded-full object-cover border border-zinc-700 shrink-0 bg-zinc-800"
            onError={(e) => {
                e.target.style.display = "none";
            }}
        />
    );
}