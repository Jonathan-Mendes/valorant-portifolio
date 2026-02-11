"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { ValorantAgent } from "@/types/valorant";
import { makeAgentGradient } from "@/lib/gradient";

type Props = {
  agent: ValorantAgent;
};

export default function AgentHero({ agent }: Props) {
  const gradient = makeAgentGradient(agent.backgroundGradientColors);

  const portrait =
    agent.bustPortrait?.trim() ||
    agent.fullPortrait?.trim() ||
    agent.displayIcon?.trim() ||
    "";

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
        <Link href="/" className="text-white/70 hover:text-white">
          ← Voltar
        </Link>

        <div className="mt-8 grid items-center gap-10 md:grid-cols-2">
          {/* TEXTO */}
          <motion.div
            initial={{ x: -24 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="order-2 md:order-1"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 ring-1 ring-white/10">
              <span className="h-2 w-2 rounded-full bg-white/60" />
              {agent.role?.displayName ?? "Sem role"}
            </div>

            <h1 className="mt-4 text-4xl font-bold tracking-tight">
              {agent.displayName}
            </h1>

            <p className="mt-4 max-w-prose text-sm leading-relaxed text-white/75">
              {agent.description}
            </p>

            <div className="mt-8">
              <h2 className="text-lg font-semibold">Habilidades</h2>

              <ul className="mt-4 space-y-3">
                {agent.abilities.map((ab, i) => (
                  <motion.li
                    key={ab.slot}
                    initial={{ y: 16 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.28 }}
                    className="rounded-2xl bg-black/35 p-4 ring-1 ring-white/10"
                  >
                    <div className="flex gap-3">
                      {ab.displayIcon ? (
                        <Image
                          src={ab.displayIcon}
                          alt={ab.displayName}
                          width={32}
                          height={32}
                        />
                      ) : (
                        <div className="h-8 w-8 rounded bg-white/10" />
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

          {/* IMAGEM */}
          <div className="order-1 md:order-2">
            <div className="relative overflow-hidden rounded-3xl bg-black/30 ring-1 ring-white/10">
              {/* glow atrás */}
              <div
                className="pointer-events-none absolute -inset-10 -z-10 opacity-40 blur-3xl"
                style={{ backgroundImage: gradient }}
              />

              <motion.div
                initial={{ y: 40 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="flex items-center justify-center p-6"
              >
                {portrait ? (
                  <Image
                    src={portrait}
                    alt={agent.displayName}
                    width={520}
                    height={820}
                    priority
                    className="h-[560px] w-auto object-contain"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-[560px] items-center justify-center text-white/70">
                    Sem imagem disponível
                  </div>
                )}
              </motion.div>

              <div className="border-t border-white/10 bg-black/40 px-5 py-4">
                <p className="text-xs text-white/60">Developer Name</p>
                <p className="text-sm font-medium">
                  {agent.developerName ?? "—"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
