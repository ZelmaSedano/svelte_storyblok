<script lang="ts">
  import { onMount } from 'svelte';
  import {
    Chart,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend
  } from 'chart.js';
  import { getNasaPrecipData } from '$lib/api/nasa-precip';

  Chart.register(
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend
  );

  let title = 'NASA Precipitation';
  let canvasEl: HTMLCanvasElement | null = null;
  let chart: Chart | null = null;
  let loading = true;
  let error: string | null = null;

  onMount(() => {

    const destroyChart = () => chart?.destroy();

    (async () => {
      try {
        console.log('Widget mounted, fetching data');
        const geojson = await getNasaPrecipData();
        console.log('Raw NASA data:', geojson);

        const features: any[] = geojson.features;
        console.log('Fetched NASA precipitation data:', features.length);

        if (!features?.length) throw new Error('No features in data');

        const firstSeries = features[0].properties.parameter.PRECTOTCORR;
        const dateKeys = Object.keys(firstSeries).sort();
        const labels = dateKeys.map((d) =>
          d.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
        );

        const maxLines = 25;
        const datasets = features.slice(0, maxLines).map((f: any, i: number) => {
          const [lon, lat] = f.geometry.coordinates;
          const series = f.properties.parameter.PRECTOTCORR;
          const data = dateKeys.map((k) => series[k]);
          return {
            label: `lon ${lon.toFixed(3)}, lat ${lat.toFixed(3)}`,
            data,
            borderColor: `hsl(${(i * 40) % 360} 80% 60%)`,
            borderWidth: 2,
            tension: 0.3,
            fill: false
          };
        });

        console.log('Prepared labels/datasets', { labels, datasetsCount: datasets.length });

        // Flip loading before chart, so even if chart crashes you see the canvas/error.
        loading = false;

        if (!canvasEl) {
          console.error('Canvas element not ready when creating chart');
          return;
        }

        console.log('Creating Chart.js chart', canvasEl);

        chart = new Chart(canvasEl, {
          type: 'line',
          data: { labels, datasets },
          options: {
            responsive: true,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label(ctx) {
                    const label = ctx.dataset.label ?? '';
                    const value = ctx.parsed.y;
                    const date = ctx.label;
                    return `${label} – ${date}: ${value}`;
                  }
                }
              },
              title: { display: true, text: title }
            }
          }
        });

        console.log('Chart created successfully');
        loading = false;
      } catch (e: any) {
        console.error('Error in NasaPrecipSelfContained widget:', e);
        error = e?.message ?? 'Unknown error';
        loading = false;
      }
    })();

    return destroyChart;
  });
</script>

<h1>Nasa precipitation Data</h1>
<canvas bind:this={canvasEl}></canvas>

{#if error}
  <p class="text-red-500">Error: {error}</p>
{/if}