<script lang="ts">
  import { subTitle } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
  import POIForm from "$lib/ui/POIForm.svelte";
  import POIList from "$lib/ui/POIList.svelte";

  subTitle.text = "Add a POI";
</script>

<div class="columns">
  <div class="column">
    <Card title="POIs to Date">
      <POIList />
    </Card>
  </div>
  <div class="column">
    <Card title="Add a POI">
      <POIForm />
    </Card>
  </div>
</div>
// i think this age is redundant