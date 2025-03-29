<script>
    import Tiptap from "./components/Tiptap.svelte";
  import './style.css';
  let content = '';
</script>

<svelte:head>
  <title>Editor</title>
</svelte:head>


<main class="flex flex-col h-screen w-screen bg-fade relative container mx-auto">

  <nav class="flex justify-between bg-primary px-4 py-4 shadow-lg">
    <h1 class="font-bold text-xl text-white">TTA</h1>
  </nav>

  <section class="flex flex-row items-center flex-1 w-full bg-background">

    <div class="w-1/2 h-full">
        <Tiptap bind:content />
    </div>

    <div id="preview" class="p-4 bg-background w-1/2 h-full font-nunito">{@html content}</div>

  </section>

</main>
