"use client";

import React, { useState } from "react";
import {
    Form,
    TextField,
    Label,
    Input,
    FieldError,
    Button,
    toast,
} from "@heroui/react";
import { Person, Camera } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UpdateProfileForm({ session }) {
    const user = session?.user;
    const token = session?.session?.token;
    const router = useRouter();

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const textInputClass = "w-full text-white bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] focus:border-zinc-600 rounded-lg h-12 px-3 text-sm placeholder:text-zinc-600 outline-none transition-all";

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Validation
        const newErrors = {};
        if (!data.name) newErrors.name = "Name is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
        setIsLoading(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${user?.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name: data.name,
                        photoUrl: data.photoUrl,
                    }),
                }
            );

            if (!res.ok) throw new Error("Failed to update profile");

            toast.success("Profile updated successfully!");
            router.refresh();
        } catch (err) {
            console.error("Profile update error:", err);
            toast.error("Failed to update profile. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0d0d0e] text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto bg-[#121214] border border-zinc-900 rounded-xl p-8 shadow-2xl">

                {/* Header */}
                <div className="border-b border-zinc-800 pb-6 mb-8">
                    <h1 className="text-2xl font-semibold tracking-tight">Update Profile</h1>
                    <p className="text-zinc-400 text-sm mt-1">
                        Update your display name and profile photo.
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-400">
                        <Person size={14} className="text-zinc-500" />
                        Editing: <span className="font-semibold text-zinc-300">{user?.email}</span>
                    </div>
                </div>

                {/* Avatar preview */}
                <div className="flex items-center gap-4 mb-8">
                    {user?.image ? (
                        <img
                            src={user.image}
                            alt={user.name}
                            className="w-16 h-16 rounded-full object-cover border border-zinc-700"
                        />
                    ) : (
                        <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-xl font-bold text-zinc-300">
                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                    )}
                    <div>
                        <p className="text-sm font-medium text-zinc-200">{user?.name}</p>
                        <p className="text-xs text-zinc-500 capitalize">{user?.role || "client"}</p>
                    </div>
                </div>

                <Form onSubmit={handleSubmit} className="space-y-6" validationErrors={errors} validationBehavior="aria">

                    {/* Name */}
                    <TextField name="name" isInvalid={!!errors.name} className="flex flex-col gap-1 w-full">
                          defaultValue={user?.name || ""}
                        <Label className="text-zinc-400 font-medium text-sm flex items-center gap-1.5">
                            <Person size={13} /> Display Name
                        </Label>
                        <Input
                            
                            placeholder="Your full name"
                            className={textInputClass}
                        />
                        {errors.name && (
                            <FieldError className="text-xs text-danger mt-1">{errors.name}</FieldError>
                        )}
                    </TextField>

                    {/* Photo URL */}
                      defaultValue={user?.image || ""} 
                    <TextField name="photoUrl" className="flex flex-col gap-1 w-full">
                        <Label className="text-zinc-400 font-medium text-sm flex items-center gap-1.5">
                            <Camera size={13} /> Photo URL <span className="text-zinc-600">(Optional)</span>
                        </Label>
                        <Input
                            
                            placeholder="https://i.ibb.co/your-image.jpg"
                            className={textInputClass}
                        />
                    </TextField>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                        <Button
                            type="button"
                            variant="bordered"
                            className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 rounded-lg px-6 font-medium h-11"
                            onPress={() => router.back()}
                        >
                            Cancel
                        </Button>
                     
                        <Button
                            type="submit"
                            isLoading={isLoading}
                            className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 transition-colors h-11"
                        >
                            Save Changes
                        </Button>
                    
                    </div>
                </Form>
            </div>
        </div>
    );
}