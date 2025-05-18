<script lang="ts">
  export let images: string[] = [];
  let currentIndex = 0;

  function prev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  }

  function next() {
    currentIndex = (currentIndex + 1) % images.length;
  }
</script>

<div class="carousel has-text-centered">
  {#if images.length > 0}
    <div class="image-container">
      <img
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        style="max-height: 300px; object-fit: contain; margin: auto;"
      />
    </div>
    <div class="buttons is-centered mt-2">
      <button class="button is-small" on:click={prev}>←</button>
      <button class="button is-small" on:click={next}>→</button>
    </div>
    <p class="is-size-7 mt-1">Image {currentIndex + 1} of {images.length}</p>
  {:else}
    <p>No images available.</p>
  {/if}
</div>