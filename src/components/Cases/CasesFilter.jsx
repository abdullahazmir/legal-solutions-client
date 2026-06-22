// components/CasesFilter.jsx
"use client";

import { useState, useMemo } from "react";
import { Select, Label, ListBox, InputGroup, TextField } from "@heroui/react";
import { LocationArrow, Briefcase, CircleDollar, MagnifierMinus } from "@gravity-ui/icons";
import CaseCard from "./CaseCard";



export default function CasesFilter({ cases }) {
    const [search, setSearch]               = useState("");
    const [specialization, setSpecialization] = useState("");
    const [location, setLocation]           = useState("");
    const [availability, setAvailability]   = useState("");
    const [maxFee, setMaxFee]               = useState("");

    // Derive unique filter options from real data
    const specializations = useMemo(() =>
        [...new Set(cases.map((c) => c.specialization).filter(Boolean))].sort()
    , [cases]);

    const locations = useMemo(() =>
        [...new Set(cases.map((c) => c.location).filter(Boolean))].sort()
    , [cases]);

    const filtered = useMemo(() => {
        return cases.filter((c) => {
            const q = search.toLowerCase();
            const matchSearch =
                !q ||
                c.name?.toLowerCase().includes(q) ||
                c.specialization?.toLowerCase().includes(q) ||
                c.location?.toLowerCase().includes(q) ||
                c.bio?.toLowerCase().includes(q);

            const matchSpec  = !specialization || c.specialization === specialization;
            const matchLoc   = !location       || c.location === location;
            const matchAvail = !availability   || c.availability?.toLowerCase() === availability;
            const matchFee   = !maxFee         || Number(c.consultationFee) <= Number(maxFee);

            return matchSearch && matchSpec && matchLoc && matchAvail && matchFee;
        });
    }, [cases, search, specialization, location, availability, maxFee]);

    const hasFilters = search || specialization || location || availability || maxFee;

    const clearAll = () => {
        setSearch("");
        setSpecialization("");
        setLocation("");
        setAvailability("");
        setMaxFee("");
    };

    return (
        <div className="space-y-6">

            {/* ── Search + Filters Bar ── */}
            <div className="flex flex-col gap-3">

                {/* Search */}
                <TextField className="w-full" name="search" value={search} onChange={setSearch}>
                    <InputGroup>
                        <InputGroup.Prefix>
                            <MagnifierMinus className="size-4 text-zinc-500" />
                        </InputGroup.Prefix>
                        <InputGroup.Input
                            className="w-full bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600"
                            placeholder="Search by name, specialization, location..."
                        />
                    </InputGroup>
                </TextField>

                {/* Filter Row */}
                <div className="flex flex-wrap gap-3">

                    {/* Specialization */}
                    <Select
                        selectedKey={specialization}
                        onSelectionChange={(key) => setSpecialization(key === "all" ? "" : key)}
                        className="min-w-[200px]"
                    >
                        <Label className="sr-only">Specialization</Label>
                        <Select.Trigger className="bg-zinc-900 border-zinc-800 text-white">
                            <Briefcase className="size-3.5 text-zinc-500" />
                            <Select.Value placeholder="Specialization" />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox>
                                <ListBox.Item id="all">
                                    <Label>All Specializations</Label>
                                </ListBox.Item>
                                {specializations.map((s) => (
                                    <ListBox.Item key={s} id={s}>
                                        <Label className="capitalize">{s}</Label>
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>

                    {/* Location */}
                    <Select
                        selectedKey={location}
                        onSelectionChange={(key) => setLocation(key === "all" ? "" : key)}
                        className="min-w-[180px]"
                    >
                        <Label className="sr-only">Location</Label>
                        <Select.Trigger className="bg-zinc-900 border-zinc-800 text-white">
                            <LocationArrow className="size-3.5 text-zinc-500" />
                            <Select.Value placeholder="Location" />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox>
                                <ListBox.Item id="all">
                                    <Label>All Locations</Label>
                                </ListBox.Item>
                                {locations.map((l) => (
                                    <ListBox.Item key={l} id={l}>
                                        <Label className="capitalize">{l}</Label>
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>

                    {/* Availability */}
                    <Select
                        selectedKey={availability}
                        onSelectionChange={(key) => setAvailability(key === "all" ? "" : key)}
                        className="min-w-[160px]"
                    >
                        <Label className="sr-only">Availability</Label>
                        <Select.Trigger className="bg-zinc-900 border-zinc-800 text-white">
                            <Select.Value placeholder="Availability" />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox>
                                <ListBox.Item id="all">
                                    <Label>All</Label>
                                </ListBox.Item>
                                <ListBox.Item id="available">
                                    <Label>✦ Available</Label>
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="busy">
                                    <Label>● Busy</Label>
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>

                    {/* Max Fee */}
                    <TextField className="min-w-[150px]" name="maxFee" value={maxFee} onChange={setMaxFee}>
                        <InputGroup>
                            <InputGroup.Prefix>
                                <CircleDollar className="size-4 text-zinc-500" />
                            </InputGroup.Prefix>
                            <InputGroup.Input
                                type="number"
                                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600"
                                placeholder="Max fee"
                                min={0}
                            />
                        </InputGroup>
                    </TextField>

                    {/* Clear button */}
                    {hasFilters && (
                        <button
                            onClick={clearAll}
                            className="px-4 py-2 text-sm text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-600 rounded-xl transition-colors bg-zinc-900"
                        >
                            Clear all
                        </button>
                    )}
                </div>
            </div>

            {/* ── Results count ── */}
            <p className="text-sm text-zinc-600">
                {filtered.length === cases.length
                    ? <>{cases.length} lawyers available</>
                    : <><span className="text-zinc-400 font-medium">{filtered.length}</span> of {cases.length} lawyers match</>
                }
            </p>

            {/* ── Grid ── */}
            {filtered.length === 0 ? (
                <div className="text-center py-24 text-zinc-600 text-sm">
                    No lawyers match your filters.{" "}
                    <button onClick={clearAll} className="text-zinc-400 underline underline-offset-2">
                        Clear filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filtered.map((c) => (
                        <CaseCard key={c._id?.$oid || c._id} c={c} />
                    ))}
                </div>
            )}
        </div>
    );
}