"use client";

import React, { useState } from "react";
import {
    Form,
    Fieldset,
    TextField,
    Label,
    Input,
    TextArea,
    FieldError,
    Select,
    ListBox,
    Button,
    toast
} from "@heroui/react";
import { Person, Camera } from "@gravity-ui/icons";
import { createCase } from "@/lib/actions/cases";
import { useRouter } from "next/navigation";

export default function LawyerProfileForm({ session, lawFirm }) {
    console.log("Received session in LawyerProfileForm:", lawFirm);
    const [errors, setErrors] = useState({});
    const router = useRouter();
    

    // ── Style variables live here, OUTSIDE handleSubmit ──
    const textInputClass = "w-full text-white bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] focus:border-zinc-600 rounded-lg h-12 px-3 text-sm placeholder:text-zinc-600 outline-none transition-all";
    const textAreaClass = "w-full text-white bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] focus:border-zinc-600 rounded-lg p-3 text-sm placeholder:text-zinc-600 outline-none transition-all";
    const selectBoxClass = "w-full";
    const triggerClasses = "w-full flex items-center justify-between bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] h-12 rounded-lg px-3 text-white transition-all text-sm outline-none data-[focused=true]:border-zinc-600 data-[invalid=true]:border-danger";
    const popoverClasses = "bg-[#1c1c1e] border border-zinc-800 text-white rounded-lg shadow-xl p-1";
    const listItemClasses = "flex items-center justify-between p-2 rounded-md hover:bg-zinc-800 cursor-pointer text-sm text-zinc-200 outline-none data-[focused=true]:bg-zinc-800";

    // ── handleSubmit is its own function, closed with } before return ──
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Validation
        const newErrors = {};
        if (!data.name) newErrors.name = "Full name is required";
        if (!data.specialization) newErrors.specialization = "Specialization is required";
        if (!data.experience) newErrors.experience = "Years of experience is required";
        if (!data.location) newErrors.location = "Location is required";
        if (!data.photoUrl) newErrors.photoUrl = "Photo URL is required";
        if (!data.bio) newErrors.bio = "Professional summary is required";
        if (!data.education) newErrors.education = "Education is required";
        if (!data.consultationFee) newErrors.consultationFee = "Consultation fee is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        const payload = {
            ...data,
            lawyerId: session?.user?.id,
            lawyerName: session?.user?.name,
            lawyerEmail: session?.user?.email,
            status: "Active",
            dateJoined: new Date().toISOString(),
            isPubliclyVisible: true,
        };

        console.log("Payload being sent:", payload); // ← verify lawyerId here

        const res = await createCase(payload);

        if (res?.insertedId) {
            toast.success("Case created successfully!");
            e.target.reset();
            router.push("/dashboard/lawyer/cases");
        }
    }; // ← handleSubmit closes here

    // ── return is at the component level ──
    return (
        <div className="min-h-screen bg-[#0d0d0e] text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-[#121214] border border-zinc-900 rounded-xl p-8 shadow-2xl">

                {/* Form Header */}
                <div className="border-b border-zinc-800 pb-6 mb-8">
                    <h1 className="text-2xl font-semibold tracking-tight">Create New Case</h1>
                    <p className="text-zinc-400 text-sm mt-1">
                        Fill out the details below to publish your profile to clients.
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-400">
                        <Person size={14} className="text-zinc-500" />
                        Publishing as: <span className="font-semibold text-zinc-300">{session?.user?.name}</span>
                        <span className="text-emerald-500 font-medium bg-emerald-950/30 px-1.5 py-0.5 rounded border border-emerald-900/50">
                            Verified
                        </span>
                    </div>
                </div>

                <Form onSubmit={handleSubmit} className="space-y-8" validationErrors={errors} validationBehavior="aria">

                    {/* SECTION 1: Personal Information */}
                    <Fieldset className="space-y-6 w-full">
                        <legend className="text-lg font-medium text-zinc-300 border-b border-zinc-900 w-full pb-2 mb-2">
                            Personal Information
                        </legend>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TextField name="name" isInvalid={!!errors.name} className="flex flex-col gap-1 w-full">
                                <Label className="text-zinc-400 font-medium text-sm">Full Name</Label>
                                <Input placeholder="e.g. Sarah J. Mitchell" className={textInputClass} />
                                {errors.name && <FieldError className="text-xs text-danger mt-1">{errors.name}</FieldError>}
                            </TextField>

                            <Select className={selectBoxClass} name="specialization" isInvalid={!!errors.specialization}>
                                <Label className="text-zinc-400 font-medium text-sm mb-1 block">Specialization</Label>
                                <Select.Trigger className={triggerClasses}>
                                    <Select.Value className="text-white placeholder:text-zinc-600" />
                                    <Select.Indicator />
                                </Select.Trigger>
                                {errors.specialization && <span className="text-xs text-danger mt-1">{errors.specialization}</span>}
                                <Select.Popover className={popoverClasses}>
                                    <ListBox className="outline-none">
                                        <ListBox.Item id="Corporate Law" className={listItemClasses} textValue="Corporate Law">Corporate Law</ListBox.Item>
                                        <ListBox.Item id="Criminal Defense" className={listItemClasses} textValue="Criminal Defense">Criminal Defense</ListBox.Item>
                                        <ListBox.Item id="Family Law" className={listItemClasses} textValue="Family Law">Family Law</ListBox.Item>
                                        <ListBox.Item id="Immigration Law" className={listItemClasses} textValue="Immigration Law">Immigration Law</ListBox.Item>
                                        <ListBox.Item id="Intellectual Property" className={listItemClasses} textValue="Intellectual Property">Intellectual Property</ListBox.Item>
                                        <ListBox.Item id="Real Estate Law" className={listItemClasses} textValue="Real Estate Law">Real Estate Law</ListBox.Item>
                                        <ListBox.Item id="Tax Law" className={listItemClasses} textValue="Tax Law">Tax Law</ListBox.Item>
                                        <ListBox.Item id="Employment Law" className={listItemClasses} textValue="Employment Law">Employment Law</ListBox.Item>
                                        <ListBox.Item id="Civil Litigation" className={listItemClasses} textValue="Civil Litigation">Civil Litigation</ListBox.Item>
                                        <ListBox.Item id="Constitutional Law" className={listItemClasses} textValue="Constitutional Law">Constitutional Law</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TextField name="experience" isInvalid={!!errors.experience} className="flex flex-col gap-1 w-full">
                                <Label className="text-zinc-400 font-medium text-sm">Years of Experience</Label>
                                <Input type="number" placeholder="e.g. 8" className={textInputClass} />
                                {errors.experience && <FieldError className="text-xs text-danger mt-1">{errors.experience}</FieldError>}
                            </TextField>

                            <TextField name="location" isInvalid={!!errors.location} className="flex flex-col gap-1 w-full">
                                <Label className="text-zinc-400 font-medium text-sm">Location</Label>
                                <Input placeholder="e.g. Dhaka, Bangladesh" className={textInputClass} />
                                {errors.location && <FieldError className="text-xs text-danger mt-1">{errors.location}</FieldError>}
                            </TextField>
                        </div>

                        <TextField name="photoUrl" isInvalid={!!errors.photoUrl} className="flex flex-col gap-1 w-full">
                            <Label className="text-zinc-400 font-medium text-sm flex items-center gap-1.5">
                                <Camera size={13} /> Professional Photo URL (imgBB)
                            </Label>
                            <Input placeholder="https://i.ibb.co/your-image.jpg" className={textInputClass} />
                            {errors.photoUrl && <FieldError className="text-xs text-danger mt-1">{errors.photoUrl}</FieldError>}
                        </TextField>
                    </Fieldset>

                    {/* SECTION 2: Professional Details */}
                    <Fieldset className="space-y-6 w-full">
                        <legend className="text-lg font-medium text-zinc-300 border-b border-zinc-900 w-full pb-2 mb-2">
                            Professional Details
                        </legend>

                        <TextField name="bio" isInvalid={!!errors.bio} className="flex flex-col gap-1 w-full">
                            <Label className="text-zinc-400 font-medium text-sm">Professional Summary / Bio</Label>
                            <TextArea placeholder="Describe your expertise, approach, and what clients can expect..." rows={4} className={textAreaClass} />
                            {errors.bio && <FieldError className="text-xs text-danger mt-1">{errors.bio}</FieldError>}
                        </TextField>

                        <TextField name="education" isInvalid={!!errors.education} className="flex flex-col gap-1 w-full">
                            <Label className="text-zinc-400 font-medium text-sm">Education</Label>
                            <TextArea placeholder="e.g. LL.B, University of Dhaka (2015) — LL.M, Harvard Law (2017)" rows={3} className={textAreaClass} />
                            {errors.education && <FieldError className="text-xs text-danger mt-1">{errors.education}</FieldError>}
                        </TextField>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TextField name="barLicense" className="flex flex-col gap-1 w-full">
                                <Label className="text-zinc-400 font-medium text-sm">Bar License <span className="text-zinc-600">(Optional)</span></Label>
                                <Input placeholder="e.g. BD-BAR-2017-00421" className={textInputClass} />
                            </TextField>

                            <TextField name="languages" className="flex flex-col gap-1 w-full">
                                <Label className="text-zinc-400 font-medium text-sm">Languages Spoken <span className="text-zinc-600">(Optional)</span></Label>
                                <Input placeholder="e.g. English, Bengali" className={textInputClass} />
                            </TextField>
                        </div>
                    </Fieldset>

                    {/* SECTION 3: Availability & Fees */}
                    <Fieldset className="space-y-6 w-full">
                        <legend className="text-lg font-medium text-zinc-300 border-b border-zinc-900 w-full pb-2 mb-2">
                            Availability & Fees
                        </legend>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="grid grid-cols-3 gap-2">
                                <div className="col-span-2 space-y-1">
                                    <span className="text-zinc-400 font-medium text-sm block">Consultation Fee</span>
                                    <TextField name="consultationFee" isInvalid={!!errors.consultationFee} className="w-full">
                                        <Input type="number" placeholder="e.g. 1500" className={textInputClass} />
                                        {errors.consultationFee && <FieldError className="text-xs text-danger mt-1">{errors.consultationFee}</FieldError>}
                                    </TextField>
                                </div>
                                <Select className="w-full mt-6" name="currency" defaultSelectedKeys={["BDT"]}>
                                    <Select.Trigger className={triggerClasses}>
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover className={popoverClasses}>
                                        <ListBox className="outline-none">
                                            <ListBox.Item id="BDT" className={listItemClasses} textValue="BDT">BDT (৳)</ListBox.Item>
                                            <ListBox.Item id="USD" className={listItemClasses} textValue="USD">USD ($)</ListBox.Item>
                                            <ListBox.Item id="EUR" className={listItemClasses} textValue="EUR">EUR (€)</ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>

                            <Select className={selectBoxClass} name="availability" defaultSelectedKeys={["Available"]}>
                                <Label className="text-zinc-400 font-medium text-sm mb-1 block">Availability Status</Label>
                                <Select.Trigger className={triggerClasses}>
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover className={popoverClasses}>
                                    <ListBox className="outline-none">
                                        <ListBox.Item id="Available" className={listItemClasses} textValue="Available">🟢 Available</ListBox.Item>
                                        <ListBox.Item id="Busy" className={listItemClasses} textValue="Busy">🔴 Busy</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        <TextField name="consultationHours" className="flex flex-col gap-1 w-full">
                            <Label className="text-zinc-400 font-medium text-sm">Consultation Hours <span className="text-zinc-600">(Optional)</span></Label>
                            <Input placeholder="e.g. Mon–Fri, 10am–6pm" className={textInputClass} />
                        </TextField>
                    </Fieldset>

                    {/* Form Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800 w-full">
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
                            className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 transition-colors h-11"
                        >
                            Publish Profile
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}