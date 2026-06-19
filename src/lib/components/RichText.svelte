<!-- src/lib/components/RichText.svelte -->
<script lang="ts">
  import type {
    RichTextParagraphNode,
    RichTextTextNode,
    RichTextHardBreakNode,
  } from "$lib/typings/richtext";

  // must use version 4 syntax
  export let content: RichTextParagraphNode[] | null = null;
  // keep for now, helpful
  console.log("RichText component received content:", content);
</script>

{#if content}
  {#each content as paragraph}
    {@const p = paragraph}
    <p>
      {#if p.content}
        {#each p.content as node}
          {#if node.type === "text"}
            {@const t = node}
            {t.text}
          {:else if node.type === "hard_break"}
            {@const br = node}
            <br />
          {/if}
        {/each}
      {/if}
    </p>
  {/each}
{/if}
