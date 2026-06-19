<!-- src/lib/components/RichText.svelte -->
<script lang="ts">
  import type {  RichTextParagraphNode, RichTextTextNode, RichTextHardBreakNode } from '$lib/typings/richtext';

  const { content = null } = $props(); // check if doc is provided otherwise null
  console.log('RichText component received content:', content);
</script>

{#if content}
  {#each content as paragraph}
    {@const p = paragraph as RichTextParagraphNode}
    <p>
      {#if p.content}
        {#each p.content as node}
          {#if node.type === 'text'}
            {@const t = node as RichTextTextNode}
            {t.text}
          {:else if node.type === 'hard_break'}
            {@const br = node as RichTextHardBreakNode}
            <br />
          {/if}
        {/each}
      {/if}
    </p>
  {/each}
{/if}