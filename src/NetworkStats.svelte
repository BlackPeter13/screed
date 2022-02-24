<script lang="ts">
    import { stats } from './stores/stats.js'
</script>

    <div class="rounded col-span-1 xl:col-span-1 shadow-lg">
        <div class="rounded-t p-3 bg-gray-100 text-neutral-content">
            <h2 class="text-2xl font-bold">Network</h2>
        </div>

            <!-- Network Stats Table -->
                <div class="overflow-x-auto">
                    <table class="table w-full text-sm">
                        <tbody>
                            <tr class="hover:bg-indigo-50">
                                <th>Hashrate</th>
                                <!-- convert Hash to Terrahash by dividing it by 1 billion-->
                                <td>{(parseFloat($stats.network.hashrate) / (1000 ** 4)).toFixed(2) + ' TH/s'}</td>
                            </tr>
                            <tr class="hover:bg-indigo-50">
                                <th>Difficulty</th>
                                <td>{(parseFloat($stats.network.difficulty) / 1000).toFixed(2)} K</td>
                            </tr>
                            <tr class="hover:bg-indigo-50">
                                <th>Block Height</th>
                                <td>{$stats.network.height}</td>
                            </tr>
                            <!--
                            <tr class="hover:bg-indigo-50">
                                <th>Last Found</th>
                                <td>TODO minutes ago</td>
                            </tr>
                            <tr class="hover:bg-indigo-50">
                                <th>Est.Avg. Time</th>
                                <td>TODO</td>
                            </tr>
                            -->
                        </tbody>
                    </table>
                </div>
            <!-- END Network Stats Table -->
        <!-- END card-body -->
    </div>

<style>
</style>
