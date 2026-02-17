"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ValorantAgent } from "@/types/valorant";
import { makeAgentGradient } from "@/lib/gradient";

type Props = {
  agent: ValorantAgent;
};

const roleConfig: Record<string, { icon: string }> = {
  Sentinel: {
    icon: "/icons/sentinel.svg",
  },
  Duelist: {
    icon: "/icons/duelist.svg",
  },
  Initiator: {
    icon: "/icons/initiator.svg",
  },
  Controller: {
    icon: "/icons/controller.svg",
  },
};

export default function AgentHero({ agent }: Props) {
  const gradient = makeAgentGradient(agent.backgroundGradientColors);
  const roleName = agent.role?.displayName;
  const role = roleName ? roleConfig[roleName] : null;
  const lettersBg = agent.background?.trim?.() ? agent.background.trim() : "";

  const portrait =
    agent.bustPortrait?.trim() ||
    agent.fullPortrait?.trim() ||
    agent.displayIcon?.trim() ||
    "";

  console.log(agent);

  return (
    <main
      className="min-h-screen text-white"
      style={{
        background: `radial-gradient(1200px 600px at 20% 10%, rgba(255,255,255,0.06), transparent 60%),
          linear-gradient(180deg, rgba(0,0,0,.92), rgba(0,0,0,.96)),
          ${gradient}`,
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-8">
        <motion.div
          initial={{ x: -24 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="order-2 md:order-1"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 ring-1 ring-white/10 cursor-pointer"
          >
            <Image
              src="/icons/back.svg"
              alt="back to page"
              width={12}
              height={12}
            />
            Back
          </Link>
        </motion.div>

        <div className="mt-8 grid gap-10 md:grid-cols-2 items-stretch">
          <motion.div
            initial={{ x: -24 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="order-1 md:order-2 h-full"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 ring-1 ring-white/10">
              {role ? (
                <Image
                  src={role.icon}
                  alt={roleName || ""}
                  width={16}
                  height={16}
                />
              ) : (
                <span className="h-2 w-2 rounded-full bg-white/60" />
              )}

              {roleName ?? "Sem role"}
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight font-valorant">
              {agent.displayName}
            </h1>
            <p className="mt-4 max-w-prose text-sm leading-relaxed text-white/75">
              {agent.description}
            </p>
            <div className="mt-8">
              <h2 className="text-lg font-semibold">Abilities</h2>

              <ul className="mt-4 space-y-3">
                {agent.abilities.map((ab, i) => (
                  <motion.li
                    key={ab.slot}
                    initial={{ y: 16 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.28 }}
                    className="rounded-2xl bg-black/35 p-4 ring-1 ring-white/10"
                  >
                    <div className="flex items-center gap-3">
                      {ab.displayIcon ? (
                        <Image
                          src={ab.displayIcon}
                          alt={ab.displayName}
                          width={32}
                          height={32}
                        />
                      ) : (
                        <></>
                      )}

                      <div>
                        <p className="text-sm font-semibold">
                          {ab.displayName}
                        </p>
                        <p className="mt-1 text-xs text-white/70">
                          {ab.description}
                        </p>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          <div className="order-1 md:order-2 h-full">
            <div className="relative h-full overflow-hidden rounded-3xl bg-black/30 ring-1 ring-white/10">
              <div
                className="absolute inset-0"
                style={{ backgroundImage: gradient }}
              />

              {lettersBg ? (
                <Image
                  src={lettersBg}
                  alt={`${agent.displayName} letters`}
                  fill
                  className="object-cover opacity-20"
                  unoptimized
                  priority
                />
              ) : (
                <></>
              )}

              <div className="absolute inset-0 bg-black/30" />

              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="relative z-10 flex h-full items-center justify-center p-6"
              >
                {portrait ? (
                  <Image
                    src={portrait}
                    alt={agent.displayName}
                    width={520}
                    height={820}
                    className="h-[560px] w-auto object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
                    unoptimized
                    priority
                  />
                ) : (
                  <div className="flex h-[560px] items-center justify-center text-white/70">
                    No image available
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
