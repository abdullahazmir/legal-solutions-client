// src/app/dashboard/user/comments/CommentsContainer.jsx
"use client";

import { useState } from "react";
import { Form, TextField, Label, TextArea, FieldError, Button, toast, Toaster, ToastProvider } from "@heroui/react";
import { Star } from "@gravity-ui/icons";

function StarRating({ rating, setRating }) {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-xl transition-colors ${star <= rating ? "text-yellow-400" : "text-zinc-600 hover:text-zinc-400"
                }`}
                >
                    ★
                </button>
            ))}
        </div>
    );
}

function CommentCard({ c }) {
    // // Add this state at the top of the component
    // const [formKey, setFormKey] = useState();
    
    // // Replace e.target.reset() with:
    // setFormKey((k) => k + 1);
    return (
        <div className="bg-[#1a1a1c] border border-zinc-800 rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between">
                <p className="text-zinc-200 font-medium text-sm">{c.clientName}</p>
                <span className="text-xs text-zinc-600">
                    {new Date(c.createdAt).toLocaleDateString("en-US", {
                        year: "numeric", month: "short", day: "numeric"
                    })}
                </span>
            </div>
            <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={star <= c.rating ? "text-yellow-400" : "text-zinc-700"}>★</span>
                ))}
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">{c.comment}</p>
        </div>
    );
}


export default function CommentsContainer({
    session,
    applicationId,
    caseId,
    caseName,
    lawyerName,
    initialComments,
}) {
    const [comments, setComments] = useState(initialComments);
    const [rating, setRating] = useState(5);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const token = session?.session?.token;

    const textAreaClass = "w-full text-white bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] focus:border-zinc-600 rounded-lg p-3 text-sm placeholder:text-zinc-600 outline-none transition-all";

const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data     = Object.fromEntries(formData.entries());

    const newErrors = {};
    if (!data.comment) newErrors.comment = "Comment is required";
    if (rating === 0)  newErrors.rating  = "Please select a rating";

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }
    setErrors({});
    setIsLoading(true);

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    caseId,
                    caseName:   decodeURIComponent(caseName || ""),
                    lawyerName: decodeURIComponent(lawyerName || ""),
                    applicationId,
                    comment: data.comment,
                    rating,
                }),
            }
        );

        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.message || "Failed to post comment");
        }

        // ✅ HeroUI toast correct usage
        toast("Comment posted successfully!", { color: "success" });

        e.target.reset();
        setRating(5);

        const newComment = {
            _id: Date.now(),
            clientName: session?.user?.name,
            comment: data.comment,
            rating,
            createdAt: new Date().toISOString(),
        };
        setComments((prev) => [newComment, ...prev]);

    } catch (error) {              // ← renamed to error, not err
        console.error("Comment post error:", error);
        toast(error.message || "Failed to post comment", { color: "danger" });
    } finally {
        setIsLoading(false);
    }
};

    return (
        <>
            <ToastProvider />

            {/* Comment Form */}
            <div className="bg-[#121214] border border-zinc-900 rounded-xl p-6 mb-8">
                <h2 className="text-base font-semibold text-zinc-200 mb-4">Leave a Comment</h2>

                <Form onSubmit={handleSubmit} className="space-y-4" validationErrors={errors} validationBehavior="aria">

                    {/* Rating */}
                    <div className="space-y-1">
                        <Label className="text-zinc-400 font-medium text-sm">Rating</Label>
                        <StarRating rating={rating} setRating={setRating} />
                        {errors.rating && <p className="text-xs text-danger">{errors.rating}</p>}
                    </div>

                    {/* Comment */}
                    <TextField name="comment" isInvalid={!!errors.comment} className="flex flex-col gap-1 w-full">
                        <Label className="text-zinc-400 font-medium text-sm">Your Comment</Label>
                        <TextArea
                            placeholder="Share your experience with this lawyer..."
                            rows={4}
                            className={textAreaClass}
                        />
                        {errors.comment && (
                            <FieldError className="text-xs text-danger mt-1">{errors.comment}</FieldError>
                        )}
                    </TextField>

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            isLoading={isLoading}
                            className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 h-10 text-sm transition-colors"
                        >
                            Post Comment
                        </Button>
                    </div>
                </Form>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
                <h2 className="text-base font-semibold text-zinc-300">
                    {comments.length} Comment{comments.length !== 1 && "s"}
                </h2>

                {comments.length === 0 ? (
                    <div className="text-center py-16 border border-dashed border-zinc-800 rounded-xl">
                        <p className="text-zinc-600 text-sm">No comments yet. Be the first to comment.</p>
                    </div>
                ) : (
                    comments.map((c) => (
                        <CommentCard key={c._id?.$oid || c._id} c={c} />
                    ))
                )}
            </div>
        </>
    );
}