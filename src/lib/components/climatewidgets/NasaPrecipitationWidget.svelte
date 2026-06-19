<script lang="ts">
  import { onMount } from "svelte";
  import type ApexCharts from "apexcharts";
  import { getNasaPrecipData } from "$lib/api/nasa-precip";

  let chartEl: HTMLDivElement | null = null;
  let chart: ApexCharts | null = null;
  let loading = true;
  let error: string | null = null;

  // version 4 syntax
  export let title: string;
  export let style: string;

  onMount(() => {
    const destroyChart = () => {
      chart?.destroy();
      chart = null;
    };

    (async () => {
      try {
        console.log("Widget mounted, fetching data");
        const geojson = await getNasaPrecipData();
        console.log("Raw NASA data:", geojson);

        const defaultTitle: string = geojson.header?.title;
        const features: any[] = geojson.features;
        console.log("Fetched NASA precipitation data:", features.length);

        if (!features?.length) throw new Error("No features in data");

        const firstSeries = features[0].properties.parameter.PRECTOTCORR;
        const dateKeys = Object.keys(firstSeries).sort();

        // x-axis labels as YYYY-MM-DD
        const labels = dateKeys.map((d) =>
          d.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"),
        );

        const maxLines = 25;
        const series = features.slice(0, maxLines).map((f: any, i: number) => {
          const [lon, lat] = f.geometry.coordinates;
          const precipSeries = f.properties.parameter.PRECTOTCORR;
          const data = dateKeys.map((k) => precipSeries[k]);

          return {
            name: `lon ${lon.toFixed(3)}, lat ${lat.toFixed(3)}`,
            data,
          };
        });

        console.log("Prepared labels/series", {
          labels,
          seriesCount: series.length,
        });

        loading = false;

        if (!chartEl) {
          console.error("Chart element not ready when creating Apex chart");
          return;
        }

        const options: ApexCharts.ApexOptions = {
          noData: {
            text: "Loading precipitation data...",
          },
          chart: {
            type: "line",
            background: "transparent",
            toolbar: { show: false },
            animations: { enabled: true },
          },
          series,
          xaxis: {
            categories: labels,
            labels: {
              style: { colors: "#ffffff" },
            },
          },
          yaxis: {
            title: {
              text: "Precipitation (mm/day)",
              style: { color: "#ffffff" },
            },
            labels: {
              style: { colors: "#ffffff" },
            },
          },
          stroke: {
            curve: "smooth",
            width: 2,
          },
          colors: series.map((_, i) => `hsl(${(i * 40) % 360} 80% 60%)`),
          legend: {
            show: true,
            labels: {
              colors: "#ffffff",
            },
          },
          tooltip: {
            theme: "dark",
            x: { show: true },
            y: {
              formatter: (value: number) => `${value.toFixed(2)} mm`,
            },
          },
          title: {
            text: title ?? defaultTitle,
            style: {
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: "600",
            },
          },
        };

        console.log("Creating ApexCharts chart", chartEl);
        const ApexChartsModule: any = await import("apexcharts");
        const ApexCharts = ApexChartsModule?.default ?? ApexChartsModule;
        chart = new ApexCharts(chartEl, options);
        // .render() allows the chart to finish rendering, THEN goes to the next line
        await chart.render();
        chart?.updateOptions({
          ...options,
          ...{ noData: { text: "Loading precipitation data..." } },
        });
      } catch (e: any) {
        console.error("Error in NasaPrecipSelfContained widget (Apex):", e);
        error = e?.message ?? "Unknown error";
        loading = false;
      }
    })();

    return destroyChart;
  });
</script>

<!-- Use the same `style` class to control size (w-full h-64, etc.) -->
<div bind:this={chartEl} class={style}>
  {#if loading}
    <p class="text-center text-white-500 py-12">
      Loading precipitation data...
    </p>
  {/if}
</div>

{#if error}
  <p class="text-red-500">Error: {error}</p>
{/if}
