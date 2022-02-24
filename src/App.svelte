<script lang="ts">
    import { selected_pool } from './stores/stats.js'
    import { stats } from './stores/stats.js'

    import Header from './Header.svelte'
    import NetworkStats from './NetworkStats.svelte'
    import Miner from './Miner.svelte'
    import Pool from './Pool.svelte'
    import Workers from './Workers.svelte'
    import ErrorBox from './ErrorBox.svelte'
</script>

<svelte:head>
    <!-- TODO: take site title from env vars -->
    <title></title>
</svelte:head>

<main class="block p-4 overflow-x-hidden">
    {#await stats.init($selected_pool)}
        <!-- TODO: repalce w/ spinner -->
    {:then}
        <Header />

        <!-- Start Grid Container -->
        <div
            class="max-w-6xl mx-auto grid container grid-cols-1 xl:grid-cols-3 gap-4"
        >
            <Pool />
            <Miner />
            <NetworkStats />
            <Workers />
        </div>
        <!-- END GRID container -->
    {:catch error_msg}
        <ErrorBox {error_msg} />
    {/await}
</main>

<style lang="postcss" global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>
