import type { ReactNode } from 'react';

export type Project = {
  id: number;
  image: string[];
  thumbnail: string;
  title: string;
  sinopsis: string;
  description: string;
  tags: string[];
  techIcons: ReactNode[];
  date: string;
  liveUrl: string | null;
  repoUrl: string | null;
  impact?: string;
};
