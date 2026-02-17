import { getAgents } from "@/lib/api";
import AgentCard from "@/components/AgentCard";

export default async function Page() {
  const agents = await getAgents();

  return (
    <main className="min-h-screen bg-black p-6 text-white">
      <h1 className="text-3xl font-bold font-valorant text-center">
        Valorant Agents
      </h1>

      <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {agents.map((agent) => (
          <AgentCard key={agent.uuid} agent={agent} />
        ))}
      </ul>
    </main>
  );
}
