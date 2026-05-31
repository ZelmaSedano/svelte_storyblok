import type { PageServerLoad } from './$types';
import { getNasaPrecipData } from '$lib/api/nasa-precip';

export const load: PageServerLoad = async () => {
  const precipData = await getNasaPrecipData();

  return precipData
};
