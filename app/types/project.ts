export type Project = {
  id: number | string;
  image: string[];
  thumbnail: string;
  title: string;
  sinopsis: string;
  description: string;
  tags: string[];
  techIcons: string[];
  date: string;
  liveUrl: string | null;
  repoUrl: string | null;
  impact?: string;
};
