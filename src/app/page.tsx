import { getAgents } from "@/lib/api";
import AgentsFilter from "@/components/AgentsFilter";

export default async function Page() {
  const agents = await getAgents();

  return (
    <main
      className="min-h-screen bg-black p-6 text-white"
      style={{
        background: `
      radial-gradient(1400px 700px at 20% 10%, rgba(255,255,255,0.08), transparent 60%),
      radial-gradient(1000px 500px at 80% 30%, rgba(255,255,255,0.05), transparent 60%),
      linear-gradient(180deg, rgba(0,0,0,.92), rgba(0,0,0,.98))
    `,
      }}
    >
      <h1 className="text-3xl font-bold font-valorant text-center">
        Valorant Agents
      </h1>

      <AgentsFilter agents={agents} />
    </main>
  );
}
