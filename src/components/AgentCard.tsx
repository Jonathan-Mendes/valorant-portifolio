import Link from "next/link";
import Image from "next/image";
import { ValorantAgent } from "@/types/valorant";
import { makeAgentGradient } from "@/lib/gradient";

export default function AgentCard({ agent }: { agent: ValorantAgent }) {
  const gradient = makeAgentGradient(agent.backgroundGradientColors);

  return (
    <li className="v-card p-3 cursor-pointer">
      <Link href={`/agent/${agent.uuid}`} className="block">
        <div className="v-card-bg" style={{ backgroundImage: gradient }} />
        <div className="relative z-10">
          <div className="relative mx-auto h-[180px] w-[180px]">
            <Image
              src={agent.displayIcon}
              alt={agent.displayName}
              fill
              className="object-contain"
            />
          </div>
          <p className="mt-2 text-center text-sm font-semibold">
            {agent.displayName}
          </p>
        </div>
      </Link>
    </li>
  );
}
