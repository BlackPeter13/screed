<script lang="ts">
    import { workers } from './stores/miners.js'

</script>

<!-- Start Workers Card -->
<div class="col-span-1 xl:col-span-2 shadow-lg ">
    <div class="p-3 rounded-t bg-gray-100 text-neutral-content">
        <h2 class="text-2xl font-bold">My Workers</h2>
    </div>

        {#if $workers.length == 0 }
            <span class="block p-4 supra">No Workers</span>
        {:else}
            <div class="overflow-x-auto">
                <table class="table w-full text-sm">
                    <!-- Workers Table -->
                    <thead>
                        <tr>
                            <th>Worker Name</th>
                            <th>Hashrate</th>
                            <th>Total Shares</th>
                            <th>Connected For</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each $workers || []  as worker}
                            <tr class="hover:bg-indigo-50">
                                <td>{worker.name}</td>
                                <td>
                                    {(
                                        parseFloat(worker.hashrate.shared) /
                                        1000 ** 2
                                    ).toFixed(2) + ' MH/s'}
                                </td>
                                <td>{worker.shares.shared.valid}</td>
                                <!-- TODO: format connected for time nicely, human readable automatically -->
                                <td>{worker.times.shared.toFixed(0)}s</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        {/if}
</div>

<!-- END Card -->
<style>
</style>
