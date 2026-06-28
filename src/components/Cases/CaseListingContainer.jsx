// // components/Cases/CaseListingContainer.jsx
"use client";

import React, { useState, useMemo, useEffect } from "react";
import CasesFilter from "./CasesFilter";
import CaseCard from "./CaseCard";
import { useRouter } from "next/navigation";
import { Pagination } from "@heroui/react";
import { Icon } from "lucide-react";

export default function CaseListingContainer({ cases = [], total = 0, filters = {} }) {
  const [search, setSearch]                 = useState(filters.search || "");
  const [specialization, setSpecialization] = useState(filters.specialization || "");
  const [location, setLocation]             = useState(filters.location || "");
  const [availability, setAvailability]     = useState(filters.availability || "");
  const [maxFee, setMaxFee]                 = useState(filters.maxFee || "");
  const [page, setPage]                     = useState(Number(filters.page) || 1);


  const router = useRouter();

  const itemsPerPage = 12;
  const totalItems = Math.ceil(total / itemsPerPage);
  const totalPages = Math.ceil(total / itemsPerPage);

  // getPageNumbers should use totalPages not total
  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);
    if (page > 3) pages.push("ellipsis");
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (page < totalPages - 2) pages.push("ellipsis");
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };
  const startItem = (page - 1) * itemsPerPage + 1;        // e.g. page 8 → 85
  const endItem = Math.min(page * itemsPerPage, total);

  useEffect(() => {
    const sp = new URLSearchParams()

    if (maxFee) {
      sp.set('maxFee', maxFee)
    }
    if (search) {
      sp.set('search', search)
    }

    if (specialization !== 'all') {
      sp.set('specialization', specialization)
    }

    if (location !== 'all') {
      sp.set('location', location)
    }

    if (availability !== 'all') {
      sp.set('availability', availability)
    }

    if (page) {
      sp.set('page', page)
    }

    console.log('search params', sp.toString())

    const path = `?${sp.toString()}`
    router.push(path);

  }, [router, page, location, search, specialization, availability, maxFee])


  return (
    <>
      <CasesFilter
        cases={cases}
        search={search}
        setSearch={setSearch}
        specialization={specialization}
        setSpecialization={setSpecialization}
        location={location}
        setLocation={setLocation}
        availability={availability}
        setAvailability={setAvailability}
        maxFee={maxFee}
        setMaxFee={setMaxFee}
      />

      <div className="max-w-7xl mx-auto mb-6 text-sm text-zinc-500">
        Showing {cases.length} lawyer{cases.length !== 1 && "s"}
      </div>

      {cases.length > 0 ? (
        <>
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cases.map((c) => (
              <CaseCard key={c._id?.$oid || c._id} c={c} />
            ))}
          </div>

          <Pagination className="w-full">
            <Pagination.Summary>
              Showing {startItem}–{endItem} of {total} results
            </Pagination.Summary>
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous isDisabled={page === 1} onPress={() => setPage((p) => p - 1)}>
                  <Pagination.PreviousIcon />
                  <span>Previous</span>
                </Pagination.Previous>
              </Pagination.Item>
              {getPageNumbers().map((p, i) =>
                p === "ellipsis" ? (
                  <Pagination.Item key={`ellipsis-${i}`}>
                    <Pagination.Ellipsis />
                  </Pagination.Item>
                ) : (
                  <Pagination.Item key={p}>
                    <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                      {p}
                    </Pagination.Link>
                  </Pagination.Item>
                ),
              )}
              <Pagination.Item>
                <Pagination.Next isDisabled={page === totalPages} onPress={() => setPage((p) => p + 1)}>
                  <span>Next</span>
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </>
      ) : (
        <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl max-w-7xl mx-auto">
          <p className="text-zinc-500 text-lg">No lawyers match your search criteria.</p>
        </div>
      )}
    </>
  );
}