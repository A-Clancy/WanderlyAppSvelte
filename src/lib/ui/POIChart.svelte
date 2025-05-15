<script lang="ts">
  import { onMount } from "svelte";
  import { Chart } from "frappe-charts";
  import { currentPOIs, currentCategories } from "$lib/runes.svelte";

  let barContainer: HTMLDivElement;
  let pieContainer: HTMLDivElement;

  onMount(() => {
    // Bar Chart – POIs per category
    const barData = {
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

    new Chart(barContainer, {
      title: "POIs per Category (Bar)",
      data: barData,
      type: "bar",
      height: 250
    });

    // Pie Chart – same data
    const pieData = {
      labels: currentCategories.categories.map(c => c.name),
      datasets: [
        {
          name: "POIs",
          chartType: "pie",
          values: currentCategories.categories.map(c =>
            currentPOIs.places.filter(p => p.categoryId === c._id).length
          )
        }
      ]
    };

    new Chart(pieContainer, {
      title: "POIs per Category (Pie)",
      data: pieData,
      type: "pie",
      height: 250
    });
  });
</script>

<div bind:this={barContainer} class="mb-6"></div>
<div bind:this={pieContainer}></div>
