import { headers } from 'next/headers';
import HomeClient from './components/HomeClient';
import { fetchProjects } from './lib/supabase';

export default async function Home() {
  const headersList = await headers();
  const host = headersList.get('host') ?? '';
  
  const privateUrl = process.env.NEXT_PUBLIC_PRIVATEURL || '';
  const isPrivate = !!privateUrl && host.includes(privateUrl);

  const displayName = isPrivate 
    ? process.env.NEXT_PUBLIC_PRIVATENAME
    : process.env.NEXT_PUBLIC_PUBLICNAME;
  
  const portfolioThumbnail = isPrivate
    ? 'https://rqbcrttxfhxmcaxiropg.supabase.co/storage/v1/object/public/storage/images/portofolio/portfolio_reza_thumbnail.webp'
    : 'https://rqbcrttxfhxmcaxiropg.supabase.co/storage/v1/object/public/storage/images/portofolio/portfolio_gorudentaiga_thumbnail.webp';

  const projects = await fetchProjects();

  return (
    <HomeClient
      displayName={displayName}
      portfolioThumbnail={portfolioThumbnail}
      isPrivate={isPrivate}
      projects={projects}
    />
  );
}
