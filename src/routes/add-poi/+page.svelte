<script lang="ts">
  import { subTitle } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
  import DonateForm from "./POIForm.svelte";
  import DonationList from "$lib/ui/POIList.svelte";

  subTitle.text = "Make a Donation";
</script>

<div class="columns">
  <div class="column">
    <Card title="Donations to Date">
      <DonationList />
    </Card>
  </div>
  <div class="column">
    <Card title="Please Donate">
      <DonateForm />
    </Card>
  </div>
</div>
