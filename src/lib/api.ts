import { ValorantAgent, ValorantApiResponse } from "@/types/valorant";

const BASE_URL = "https://valorant-api.com/v1";

export async function getAgents(): Promise<ValorantAgent[]> {
  const res = await fetch(`${BASE_URL}/agents?isPlayableCharacter=true`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Erro ao buscar agentes");
  const json = (await res.json()) as ValorantApiResponse<ValorantAgent[]>;
  return json.data;
}

export async function getAgentByUuid(
  uuid: string,
): Promise<ValorantAgent | null> {
  const res = await fetch(`${BASE_URL}/agents/${uuid}`, {
    next: { revalidate: 3600 },
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Erro ao buscar agente");

  const json = (await res.json()) as ValorantApiResponse<ValorantAgent>;
  return json.data;
}
