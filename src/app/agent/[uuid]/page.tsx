import Link from "next/link";
import { getAgentByUuid } from "@/lib/api";
import AgentHero from "./AgentHero";

export default async function AgentPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;
  const agent = await getAgentByUuid(uuid);

  if (!agent) {
    return (
      <main className="min-h-screen bg-black p-6 text-white">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 ring-1 ring-white/10 cursor-pointer"
        >
          Voltar
        </Link>
        <h1 className="mt-6 text-2xl font-bold">Agente não encontrado</h1>
      </main>
    );
  }

  return <AgentHero agent={agent} />;
}
