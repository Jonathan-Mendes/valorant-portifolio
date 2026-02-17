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
        background: `
      radial-gradient(1400px 700px at 20% 12%, rgba(255,255,255,0.10), transparent 62%),
      radial-gradient(900px 500px at 85% 30%, rgba(255,255,255,0.06), transparent 60%),
      linear-gradient(180deg, rgba(0,0,0,.88), rgba(0,0,0,.96)),
      ${gradient}
    `,
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
            className="
              inline-flex items-center gap-2 rounded-full 
              bg-white/10 px-3 py-1 text-xs text-white/80 
              ring-1 ring-white/10 
              transition-all duration-200
              hover:bg-white/20 hover:text-white
              active:scale-95
              cursor-pointer
            "
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
              <ul className="mt-4 space-y-4">
                {agent.abilities.map((ab, i) => (
                  <motion.li
                    key={ab.slot}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.32 }}
                    whileHover={{ y: -2 }}
                    className="group relative overflow-hidden rounded-2xl p-5 ring-1 ring-white/10 bg-black/25 backdrop-blur-md transition hover:ring-white/20"
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-25"
                      style={{
                        background: `
            radial-gradient(900px 240px at 15% 0%, rgba(255,255,255,0.10), transparent 55%),
            radial-gradient(700px 220px at 90% 70%, rgba(255,255,255,0.06), transparent 60%)
          `,
                      }}
                    />

                    <div
                      className="pointer-events-none absolute -inset-10 opacity-[0.12] blur-2xl transition group-hover:opacity-[0.2]"
                      style={{ backgroundImage: gradient }}
                    />

                    <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                      <div className="absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-white/10 blur-md" />
                    </div>

                    <div className="relative flex items-center gap-4">
                      {ab.displayIcon ? (
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 transition group-hover:bg-white/10 group-hover:ring-white/20">
                          <Image
                            src={ab.displayIcon}
                            alt={ab.displayName}
                            width={30}
                            height={30}
                            className="object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.18)]"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <></>
                      )}

                      <div className="flex-1 cursor-default">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-white">
                            {ab.displayName}
                          </p>

                          <span className="text-xs font-bold text-white/50 tracking-widest">
                            [{ab.slot}]
                          </span>
                        </div>

                        <p className="mt-1 text-xs leading-relaxed text-white/70 group-hover:text-white/85 transition">
                          {ab.description}
                        </p>
                      </div>
                    </div>

                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-white/10 opacity-60" />
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
