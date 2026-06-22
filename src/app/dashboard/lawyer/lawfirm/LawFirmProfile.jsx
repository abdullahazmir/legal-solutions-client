'use client';

import React, { useState } from 'react';
import {
    Form,
    Fieldset,
    TextField,
    TextArea,
    Label,
    Input,
    FieldError,
    Select,
    ListBox,
    Button,
    toast
} from '@heroui/react';
import { ArrowUpToLine, Globe, Briefcase, ArrowRight, Pencil, ChevronDown, } from '@gravity-ui/icons';
import { createLawFirm } from '@/lib/actions/lawfirms';
import { Globe2, MapPin } from 'lucide-react';

const textInputClass = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition";
const selectBoxClass = "w-full flex flex-col gap-1";
const triggerClasses = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 flex items-center justify-between outline-none data-[hover=true]:border-zinc-700";
const popoverClasses = "bg-zinc-950 border border-zinc-800 rounded-lg p-1 shadow-xl min-w-[200px]";
const listItemClasses = "text-zinc-300 px-3 py-2 rounded-md cursor-pointer hover:bg-zinc-900 hover:text-white outline-none data-[focused=true]:bg-zinc-900";
const textAreaClass = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg p-3 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition resize-none";

export default function LawFirmProfile({ lawyer, lawyerFirm }) {

    const [firm, setFirm]         = useState(lawyerFirm);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors]     = useState({});
    const [logoUrl, setLogoUrl]   = useState('');
    const [isUploading, setIsUploading] = useState(false);

    // imgBB logo upload
    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, logo: "File size exceeds 5MB limit" }));
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (data.success) {
                setLogoUrl(data.data.url);
                setErrors(prev => ({ ...prev, logo: null }));
            } else {
                setErrors(prev => ({ ...prev, logo: "Upload failed. Try again." }));
            }
        } catch {
            setErrors(prev => ({ ...prev, logo: "Network error during logo upload" }));
        } finally {
            setIsUploading(false);
        }
    };

    // Form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const firmName    = formData.get('firmName');
        const websiteUrl  = formData.get('websiteUrl');
        const practiceArea = formData.get('practiceArea');
        const location    = formData.get('location');
        const firmSize    = formData.get('firmSize');
        const description = formData.get('description');

        const newErrors = {};
        if (!firmName)    newErrors.firmName    = "Firm name is required";
        if (!location)    newErrors.location    = "Location is required";
        if (!practiceArea) newErrors.practiceArea = "Practice area is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newFirmData = {
            firmName,
            websiteUrl,
            practiceArea: practiceArea || 'General Practice',
            location,
            firmSize: firmSize || '1-5 lawyers',
            description,
            logo: logoUrl || (firm ? firm.logo : ''),
            status: firm ? firm.status : 'Pending',
            lawyerId:    lawyer?.id,
            lawyerName:  lawyer?.name,
            lawyerEmail: lawyer?.email,
            createdAt: firm?.createdAt || new Date().toISOString(),
        };

        setFirm(newFirmData);

        const payload = await createLawFirm(newFirmData);

        if (payload?.insertedId) {
            toast.success("Law firm registered successfully!");
        }

        setErrors({});
        setIsEditing(false);
    };

    const startRegistration = () => { setLogoUrl(''); setIsEditing(true); };
    const startEditing      = () => { setLogoUrl(firm?.logo || ''); setIsEditing(true); };

    // ── SUB-VIEW 1: No firm yet ──
    if (!firm?._id && !isEditing) {
        return (
            <div className="max-w-2xl mx-auto my-12 bg-zinc-950 border border-zinc-900 rounded-xl p-8 text-center space-y-6">
                <div className="w-16 h-16 bg-zinc-900/50 rounded-full flex items-center justify-center mx-auto border border-zinc-800">
                    <Briefcase size={24} className="text-zinc-500" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-zinc-200">No Law Firm Registered Yet</h2>
                    <p className="text-sm text-zinc-500 max-w-sm mx-auto">
                        Register your law firm to start connecting with clients and managing your legal cases.
                    </p>
                </div>
                <Button
                    onPress={startRegistration}
                    className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 h-11 transition-all"
                >
                    Register Law Firm <ArrowRight size={16} className="ml-1" />
                </Button>
            </div>
        );
    }

    // ── SUB-VIEW 2: View mode ──
    if (firm && !isEditing) {
        const getStatusStyles = (status) => {
            switch (status) {
                case 'Approved': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
                case 'Rejected': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
                default:         return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            }
        };

        return (
            <div className="max-w-4xl mx-auto my-8 bg-zinc-950 border border-zinc-900 rounded-xl p-8 space-y-8">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-900 pb-6">
                    <div className="flex items-center gap-4">
                        {firm.logo ? (
                            <img src={firm.logo} alt={firm.firmName} className="w-16 h-16 rounded-xl object-contain bg-zinc-900 p-2 border border-zinc-800" />
                        ) : (
                            <div className="w-16 h-16 rounded-xl bg-zinc-900 flex items-center justify-center border border-zinc-800">
                                <Briefcase size={24} className="text-zinc-600" />
                            </div>
                        )}
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold text-white">{firm.firmName}</h1>
                                <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${getStatusStyles(firm.status)}`}>
                                    {firm.status}
                                </span>
                            </div>
                            {firm.websiteUrl && (
                                <a
                                    href={firm.websiteUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sm text-zinc-400 hover:underline flex items-center gap-1 mt-1"
                                >
                                    <MapPin size={14} className="text-zinc-500" /> {firm.websiteUrl}
                                </a>
                            )}
                        </div>
                    </div>
                    <Button
                        onPress={startEditing}
                        variant="bordered"
                        className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 rounded-lg px-4 font-medium h-10 flex items-center gap-2"
                    >
                        <Pencil size={14} /> Edit Profile
                    </Button>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-zinc-900/30 border border-zinc-900 p-4 rounded-lg">
                        <span className="text-xs text-zinc-500 uppercase font-semibold block">Practice Area</span>
                        <span className="text-zinc-300 font-medium mt-1 block">{firm.practiceArea}</span>
                    </div>
                    <div className="bg-zinc-900/30 border border-zinc-900 p-4 rounded-lg">
                        <span className="text-xs text-zinc-500 uppercase font-semibold block">Location</span>
                        <span className="text-zinc-300 font-medium mt-1 block">{firm.location}</span>
                    </div>
                    <div className="bg-zinc-900/30 border border-zinc-900 p-4 rounded-lg">
                        <span className="text-xs text-zinc-500 uppercase font-semibold block">Firm Size</span>
                        <span className="text-zinc-300 font-medium mt-1 block">{firm.firmSize}</span>
                    </div>
                </div>

                {/* Description */}
                {firm.description && (
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">About the Firm</h3>
                        <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap bg-zinc-900/20 border border-zinc-900/60 p-4 rounded-xl">
                            {firm.description}
                        </p>
                    </div>
                )}
            </div>
        );
    }

    // ── SUB-VIEW 3: Form (create / edit) ──
    return (
        <div className="max-w-3xl mx-auto my-8 bg-zinc-950 p-8 border border-zinc-900 rounded-xl">
            <Form onSubmit={handleSubmit} className="space-y-8" validationErrors={errors} validationBehavior="aria">
                <Fieldset className="space-y-6 w-full">
                    <legend className="text-xl font-semibold text-zinc-200 border-b border-zinc-900 w-full pb-3 mb-2">
                        {firm ? 'Update Law Firm Profile' : 'Register Your Law Firm'}
                    </legend>

                    {/* ROW 1: Firm Name + Practice Area */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField name="firmName" defaultValue={firm?.firmName || ''} isInvalid={!!errors.firmName} className="flex flex-col gap-1 w-full">
                            <Label className="text-zinc-400 font-medium text-sm">Firm Name</Label>
                            <Input placeholder="e.g. Mitchell & Associates" className={textInputClass} />
                            {errors.firmName && <FieldError className="text-xs text-danger mt-1">{errors.firmName}</FieldError>}
                        </TextField>

                        <Select className={selectBoxClass} name="practiceArea" defaultSelectedKeys={[firm?.practiceArea || 'General Practice']}>
                            <Label className="text-zinc-400 font-medium text-sm mb-1 block">Practice Area</Label>
                            <Select.Trigger className={triggerClasses}>
                                <Select.Value className="text-white placeholder:text-zinc-600" />
                                <Select.Indicator><ChevronDown size={16} className="text-zinc-500" /></Select.Indicator>
                            </Select.Trigger>
                            {errors.practiceArea && <span className="text-xs text-danger mt-1">{errors.practiceArea}</span>}
                            <Select.Popover className={popoverClasses}>
                                <ListBox className="outline-none">
                                    <ListBox.Item id="General Practice"      className={listItemClasses} textValue="General Practice">General Practice</ListBox.Item>
                                    <ListBox.Item id="Corporate Law"         className={listItemClasses} textValue="Corporate Law">Corporate Law</ListBox.Item>
                                    <ListBox.Item id="Criminal Defense"      className={listItemClasses} textValue="Criminal Defense">Criminal Defense</ListBox.Item>
                                    <ListBox.Item id="Family Law"            className={listItemClasses} textValue="Family Law">Family Law</ListBox.Item>
                                    <ListBox.Item id="Immigration Law"       className={listItemClasses} textValue="Immigration Law">Immigration Law</ListBox.Item>
                                    <ListBox.Item id="Intellectual Property" className={listItemClasses} textValue="Intellectual Property">Intellectual Property</ListBox.Item>
                                    <ListBox.Item id="Real Estate Law"       className={listItemClasses} textValue="Real Estate Law">Real Estate Law</ListBox.Item>
                                    <ListBox.Item id="Tax Law"               className={listItemClasses} textValue="Tax Law">Tax Law</ListBox.Item>
                                    <ListBox.Item id="Employment Law"        className={listItemClasses} textValue="Employment Law">Employment Law</ListBox.Item>
                                    <ListBox.Item id="Civil Litigation"      className={listItemClasses} textValue="Civil Litigation">Civil Litigation</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    {/* ROW 2: Website + Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField name="websiteUrl" defaultValue={firm?.websiteUrl || ''} className="flex flex-col gap-1 w-full">
                            <Label className="text-zinc-400 font-medium text-sm">Website URL <span className="text-zinc-600">(Optional)</span></Label>
                            <div className="relative flex items-center">
                                <span className="absolute left-3 text-zinc-600 text-sm font-medium select-none pointer-events-none border-r border-zinc-800 pr-2">
                                    https://
                                </span>
                                <Input placeholder="www.yourfirm.com" className={`${textInputClass} pl-20`} />
                            </div>
                        </TextField>

                        <TextField name="location" defaultValue={firm?.location || ''} isInvalid={!!errors.location} className="flex flex-col gap-1 w-full">
                            <Label className="text-zinc-400 font-medium text-sm">Location</Label>
                            <div className="relative flex items-center">
                                <Globe2 size={16} className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                                <Input placeholder="City, Country" className={`${textInputClass} pl-9`} />
                            </div>
                            {errors.location && <FieldError className="text-xs text-danger mt-1">{errors.location}</FieldError>}
                        </TextField>
                    </div>

                    {/* ROW 3: Firm Size + Logo */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <Select className={selectBoxClass} name="firmSize" defaultSelectedKeys={[firm?.firmSize || '1-5 lawyers']}>
                            <Label className="text-zinc-400 font-medium text-sm mb-1 block">Number of Lawyers</Label>
                            <Select.Trigger className={triggerClasses}>
                                <Select.Value className="text-white" />
                                <Select.Indicator><ChevronDown size={16} className="text-zinc-500" /></Select.Indicator>
                            </Select.Trigger>
                            <Select.Popover className={popoverClasses}>
                                <ListBox className="outline-none">
                                    <ListBox.Item id="1-5 lawyers"    className={listItemClasses} textValue="1-5 lawyers">1–5 lawyers</ListBox.Item>
                                    <ListBox.Item id="6-20 lawyers"   className={listItemClasses} textValue="6-20 lawyers">6–20 lawyers</ListBox.Item>
                                    <ListBox.Item id="21-50 lawyers"  className={listItemClasses} textValue="21-50 lawyers">21–50 lawyers</ListBox.Item>
                                    <ListBox.Item id="51-100 lawyers" className={listItemClasses} textValue="51-100 lawyers">51–100 lawyers</ListBox.Item>
                                    <ListBox.Item id="100+ lawyers"   className={listItemClasses} textValue="100+ lawyers">100+ lawyers</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>

                        {/* Logo Upload */}
                        <div className="flex flex-col gap-1 w-full">
                            <span className="text-zinc-400 font-medium text-sm">Firm Logo</span>
                            <div className="flex items-center gap-4 mt-1">
                                <label className="w-14 h-14 border border-dashed border-zinc-700 hover:border-zinc-500 bg-zinc-900/40 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden">
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        onChange={handleLogoUpload}
                                        className="hidden"
                                    />
                                    {logoUrl ? (
                                        <img src={logoUrl} alt="Logo Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <ArrowUpToLine size={18} className="text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                                    )}
                                </label>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-zinc-300">
                                        {isUploading ? 'Uploading...' : 'Upload image'}
                                    </span>
                                    <span className="text-xs text-zinc-600 mt-0.5">PNG, JPG up to 5MB</span>
                                    {errors.logo && <span className="text-xs text-danger mt-1">{errors.logo}</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ROW 4: Description */}
                    <TextField name="description" defaultValue={firm?.description || ''} className="flex flex-col gap-1 w-full">
                        <Label className="text-zinc-400 font-medium text-sm">Brief Description</Label>
                        <TextArea
                            placeholder="Tell us about your firm's mission, values, and areas of expertise..."
                            rows={4}
                            className={textAreaClass}
                        />
                    </TextField>
                </Fieldset>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-5 border-t border-zinc-900 w-full">
                    {firm && (
                        <Button
                            type="button"
                            variant="bordered"
                            onPress={() => setIsEditing(false)}
                            className="border-zinc-800 text-zinc-400 hover:bg-zinc-900 rounded-lg px-5 font-medium h-11"
                        >
                            Cancel
                        </Button>
                    )}
                    <Button
                        type="submit"
                        className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 transition-colors h-11"
                    >
                        {firm ? 'Save Updates' : 'Register Firm'}
                    </Button>
                </div>
            </Form>
        </div>
    );
}