<script lang="ts">

    import { stats } from './stores/stats.js'

</script>

<!-- Start Pool Card -->
<div class="rounded col-span-1 xl:col-span-1 shadow-lg">
    <div class="p-3 rounded-t bg-gray-100 text-neutral-content">
        <h2 class="text-2xl font-bold">Pool</h2>
    </div>

        <!-- Pool Stats Table -->
        <div class="overflow-x-auto">
            <table class="table w-full">
                <tbody class="text-sm">
                    <tr class="hover:bg-indigo-50">
                        <th>Hashrate</th>
                        <!-- convert hash to megahash by dividing by 1 mil -->
                        <td>{(parseFloat($stats.hashrate.shared) / (1000 ** 2)).toFixed(2) + ' MH/s'}</td>
                    </tr>
                    <tr class="hover:bg-indigo-50">
                        <th>Effort</th>
                        <td>{parseFloat($stats.status.effort).toFixed(2)}</td>
                    </tr>
                    <tr class="hover:bg-indigo-50">
                        <!-- luck1, luck10, luck100 show the pool luck over the last x blocks-->
                        <th>Luck (last 10 blocks)</th>
                        <td>{parseFloat($stats.status.luck.luck10)}</td>
                    </tr>
                    <tr class="hover:bg-indigo-50">
                        <th>Workers</th>
                        <td>{$stats.status.workers}</td>
                    </tr>
                    <tr class="hover:bg-indigo-50">
                        <th>Fee</th>
                        <td>{$stats.config.recipientFee}%</td>
                    </tr>
<!--                            Date($stats.payments.next * 1000).toLocaleTimeString("en-US") -->
                    <tr class="hover:bg-indigo-50">
                        <th>Next Payment</th>
                        <td>{new Date(
                                     parseInt($stats.payments.next)
                                 ).toLocaleTimeString("en-US")
                           }
                       </td>
                    </tr>
                    <tr class="hover:bg-indigo-50">
                        <th>Total Blocks Found</th>
                        <!-- blocks are retained indefinitely, shares reset at start of
                             every new round after a block is found. -->
                        <td>{$stats.blocks.valid}</td>
                    </tr>
                    <!--
                    <tr class="hover:bg-indigo-50">
                        <th>Last Found</th>
                        <td>TODO minutes ago</td>
                    </tr>
                    -->
                    <tr class="hover:bg-indigo-50">
                        <th>Shares Since Last Round</th>
                        <td>{$stats.shares.valid}</td>
                    </tr>
                    <tr class="hover:bg-indigo-50">
                        <th>Pay System</th>
                        <td>PPLNT</td>
                    </tr>
                    <!--
                    <tr class="hover:bg-indigo-50">
                        <th>Est.Avg. Time</th>
                        <td>TODO</td>
                    </tr>
                    -->
                </tbody>
            </table>
        </div>
        <!-- End Pool Stats Table -->
</div>

<!-- END card -->
<style>
</style>
