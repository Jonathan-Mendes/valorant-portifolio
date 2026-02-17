"use client";

import { useMemo, useState } from "react";
import type { ValorantAgent } from "@/types/valorant";
import Image from "next/image";
import AgentCard from "@/components/AgentCard";

const ROLES = ["Duelist", "Sentinel", "Initiator", "Controller"] as const;
type RoleName = (typeof ROLES)[number];

const roleIcons: Record<string, string> = {
  Duelist: "/icons/duelist.svg",
  Sentinel: "/icons/sentinel.svg",
  Initiator: "/icons/initiator.svg",
  Controller: "/icons/controller.svg",
};

export default function AgentsFilter({ agents }: { agents: ValorantAgent[] }) {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<RoleName | "all">("all");
  const [mobileOpen, setMobileOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return agents.filter((a) => {
      const nameOk = !q || a.displayName.toLowerCase().includes(q);
      const roleName = a.role?.displayName ?? "";
      const roleOk = role === "all" || roleName === role;
      return nameOk && roleOk;
    });
  }, [agents, query, role]);

  return (
    <div className="mt-6">
      <div className="hidden md:block">
        <FilterBar
          query={query}
          onQueryChange={setQuery}
          role={role}
          onRoleChange={setRole}
          count={filtered.length}
          onClear={() => {
            setQuery("");
            setRole("all");
          }}
        />
      </div>

      <div className="mb-4 flex items-center justify-between gap-3 md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm text-white/80 ring-1 ring-white/10 cursor-pointer"
        >
          <Image
            src="/icons/filter.svg"
            alt="Clear filters"
            width={18}
            height={18}
            className="object-contain"
          />
          Filters
        </button>

        <div className="text-xs text-white/70">
          {filtered.length} agent{filtered.length === 1 ? "" : "s"}
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-zinc-950 p-4 ring-1 ring-white/10">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold">Filters</p>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="cursor-pointer rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 ring-1 ring-white/10"
              >
                <Image
                  src="/icons/close.svg"
                  alt="Close filters"
                  width={18}
                  height={18}
                  className="object-contain"
                />
              </button>
            </div>

            <FilterPanel
              query={query}
              onQueryChange={setQuery}
              role={role}
              onRoleChange={setRole}
              onClear={() => {
                setQuery("");
                setRole("all");
              }}
            />

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="cursor-pointer mt-4 w-full rounded-2xl bg-white/10 py-3 text-sm font-medium ring-1 ring-white/10 hover:bg-white/15"
            >
              Show results ({filtered.length})
            </button>
          </div>
        </div>
      )}

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {filtered.map((agent) => (
          <AgentCard key={agent.uuid} agent={agent} />
        ))}
      </ul>
    </div>
  );
}

/** Desktop */
function FilterBar({
  query,
  onQueryChange,
  role,
  onRoleChange,
  count,
  onClear,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  role: RoleName | "all";
  onRoleChange: (v: RoleName | "all") => void;
  count: number;
  onClear: () => void;
}) {
  return (
    <div className="mb-5 flex flex-col gap-4 rounded-3xl bg-white/5 p-4 ring-1 ring-white/10">
      <div className="flex-1">
        <label className="block text-xs font-medium text-white/70">
          Search by name
        </label>
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Type an agent name…"
          className="mt-2 w-full rounded-2xl bg-black/40 px-4 py-3 text-sm text-white outline-none ring-1 ring-white/10 placeholder:text-white/40 focus:ring-white/20"
        />
      </div>

      <div className="min-w-[320px]">
        <p className="text-xs font-medium text-white/70">Role</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <RoleChip
            active={role === "all"}
            onClick={() => onRoleChange("all")}
            label="All"
          />
          {ROLES.map((r) => (
            <RoleChip
              key={r}
              active={role === r}
              onClick={() => onRoleChange(r)}
              label={r}
            />
          ))}

          <button
            type="button"
            onClick={onClear}
            className="flex items-center gap-2 rounded-2xl ml-5 px-3 py-2 text-xs ring-1 transition bg-white/15 text-white ring-white/20 cursor-pointer"
          >
            <Image
              src="/icons/filter-remove.svg"
              alt="Clear filters"
              width={18}
              height={18}
              className="object-contain"
            />
            Clear filters
          </button>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <div className="text-xs text-white/70 whitespace-nowrap">
          {count} agent{count === 1 ? "" : "s"}
        </div>
      </div>
    </div>
  );
}

/* Mobile */
function FilterPanel({
  query,
  onQueryChange,
  role,
  onRoleChange,
  onClear,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  role: RoleName | "all";
  onRoleChange: (v: RoleName | "all") => void;
  onClear: () => void;
}) {
  return (
    <div className="rounded-3xl bg-white/5 p-4 ring-1 ring-white/10">
      <label className="block text-xs font-medium text-white/70">
        Search by name
      </label>
      <input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Type an agent name…"
        className="mt-2 w-full rounded-2xl bg-black/40 px-4 py-3 text-sm text-white outline-none ring-1 ring-white/10 placeholder:text-white/40 focus:ring-white/20"
      />

      <div className="mt-5">
        <p className="text-xs font-medium text-white/70">Role</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <RoleChip
            active={role === "all"}
            onClick={() => onRoleChange("all")}
            label="All"
          />
          {ROLES.map((r) => (
            <RoleChip
              key={r}
              active={role === r}
              onClick={() => onRoleChange(r)}
              label={r}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onClear}
        className="mt-5 w-full rounded-2xl bg-white/10 py-3 text-sm font-medium ring-1 ring-white/10 hover:bg-white/15 cursor-pointer"
      >
        Clear filters
      </button>
    </div>
  );
}

function RoleChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  const icon = roleIcons[label];

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex items-center gap-2 rounded-2xl px-3 py-2 text-xs ring-1 transition cursor-pointer",
        active
          ? "bg-white/15 text-white ring-white/20"
          : "bg-black/30 text-white/70 ring-white/10 hover:bg-white/10 hover:text-white",
      ].join(" ")}
    >
      {icon && (
        <Image
          src={icon}
          alt={label}
          width={14}
          height={14}
          className="object-contain"
        />
      )}

      <span>{label}</span>
    </button>
  );
}
