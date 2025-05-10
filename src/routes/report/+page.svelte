<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import DonationList from "$lib/ui/POIList.svelte";
  import { subTitle } from "$lib/runes.svelte";

  subTitle.text = "Donation to Date";
</script>

<Card title="Donations">
  <DonationList />
</Card>
