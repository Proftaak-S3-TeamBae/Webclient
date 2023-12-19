<script lang="ts">
  import "./ToolBarItem.scss";

  export let icon: string = "";
  export let label: string = "Untitled";
  export let disabled: boolean = false;
  export let onPress: () => void = () => {};
</script>

<!-- Myman is still going 
yes
the reason is that i will probably not be as focused tomorrow
though, im thinking of going to a quiet room maybe
last friday i got very irritated by all the noise and random ass things around me

Ah yeah. Makes sense
Nothing personal to anyone but its just my brain not being able to cope
Nee snap ik helemaal. Heb ik ook soms. is gwn overprikkeldheid
Ik weet niet of het prikkels zijn maar het voelt gewoon op geven moment super vervelend
Ik kan daardoor niet goed focusen en ja, idk, maar gelukkig ging ik naar de wc op vrijdag, anders was 
ik helemaal gesnapt

Doe ik ook vaak haha. Soms zit ik gwn op de tiolet om te ontprikkelen.
Fair

Hebben wij fontawesome?
Nvm we hebben material icons, ook goed

-->
<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class={"item" + (disabled ? " disabled" : "")}
  role="button"
  on:click={() => {
    if (!disabled) onPress();
  }}
>
  {#if icon != ""}
    <span class={`material-symbols-outlined icon`}>{icon}</span>
  {/if}
  <span class="name">{label}</span>
</div>
