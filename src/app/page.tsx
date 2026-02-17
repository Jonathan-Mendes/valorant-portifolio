import { getAgents } from "@/lib/api";
import AgentsFilter from "@/components/AgentsFilter";

export default async function Page() {
  const agents = await getAgents();

  return (
    <main className="min-h-screen bg-black p-6 text-white">
      <h1 className="text-3xl font-bold font-valorant text-center">
        Valorant Agents
      </h1>

      <AgentsFilter agents={agents} />
    </main>
  );
}
