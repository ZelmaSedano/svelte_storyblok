import { PUBLIC_STORYBLOK_TOKEN } from '$env/static/public';

export async function getNasaPrecipData() {
   const url = 'https://power.larc.nasa.gov/api/temporal/daily/regional?start=20260504&end=20260514&latitude-min=57&latitude-max=60&longitude-min=5&longitude-max=12&community=ag&parameters=PRECTOTCORR&format=json&units=metric&header=true&time-standard=utc';
   const response = await fetch(url);
   return response.json();
}
