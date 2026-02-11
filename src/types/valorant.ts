export type ValorantAgent = {
  uuid: string;
  displayName: string;
  description: string;
  developerName: string;

  fullPortrait: string | null;
  bustPortrait: string | null;
  displayIcon: string;

  background: string | null;
  backgroundGradientColors: string[];

  role: {
    displayName: string;
    description: string;
    displayIcon: string;
  } | null;

  abilities: {
    slot: string;
    displayName: string;
    description: string;
    displayIcon: string | null;
  }[];
};

export type ValorantApiResponse<T> = {
  status: number;
  data: T;
};
