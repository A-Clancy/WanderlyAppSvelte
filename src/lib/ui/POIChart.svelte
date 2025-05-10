<script lang="ts">
  import { onMount } from "svelte";
  import { Chart } from "frappe-charts";
  import { currentPOIs, currentCategories } from "$lib/runes.svelte";

  let chartContainer: HTMLDivElement;

  onMount(() => {
    const data = {
      labels: currentCategories.categories.map(c => c.name),
      datasets: [
        {
          name: "POIs",
          values: currentCategories.categories.map(c =>
            currentPOIs.places.filter(p => p.categoryId === c._id).length
          )
        }
      ]
    };

    new Chart(chartContainer, {
      title: "POIs per Category",
      data,
      type: "bar",
      height: 250
    });
  });
</script>

<div bind:this={chartContainer}></div>
