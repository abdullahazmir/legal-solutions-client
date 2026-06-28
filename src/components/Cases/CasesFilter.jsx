// components/Cases/CasesFilter.jsx
"use client";

import { useMemo } from "react";
import { Select, Label, ListBox, InputGroup, TextField } from "@heroui/react";
import { LocationArrow, Briefcase, CircleDollar, MagnifierMinus } from "@gravity-ui/icons";

export default function CasesFilter({
  cases,
  search,         setSearch,
  specialization, setSpecialization,
  location,       setLocation,
  availability,   setAvailability,
  maxFee,         setMaxFee,
}) {
  const specializations = useMemo(() =>
    [...new Set(cases.map((c) => c.specialization).filter(Boolean))].sort()
  , [cases]);

  const locations = useMemo(() =>
    [...new Set(cases.map((c) => c.location).filter(Boolean))].sort()
  , [cases]);

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
                <ListBox.Item id="all"><Label>All Specializations</Label></ListBox.Item>
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
                <ListBox.Item id="all"><Label>All Locations</Label></ListBox.Item>
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
                <ListBox.Item id="all"><Label>All</Label></ListBox.Item>
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

          {/* Clear */}
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
    </div>
  );
}