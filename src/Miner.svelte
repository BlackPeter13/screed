<script lang="ts">
    import { fade, fly } from 'svelte/transition'

    import { selected_pool } from './stores/stats.js'
    import { stats } from './stores/stats.js'
    import { max_miner_time } from './stores/miners.js'
    import { miner } from './stores/miners.js'
    import { wallet_address } from './stores/miners.js'

    // TODO: take this from a public API automatically
    const block_reward = 2500

    let minerShown = false

    async function submitAddress(event) {
        // Parse form data
        const formData = new FormData(event.target)
        const data = {}
        for (let field of formData) {
            const [key, value] = field
            data[key] = value
        }
        $wallet_address = data.address

        minerShown = !minerShown
    }
</script>

<!-- Start Miner Card -->
<div class="rounded min-h-fit col-span-1 xl:col-span-2 shadow-lg">
    <div class="p-3  rounded-t bg-gray-100 text-neutral-content">
        {#if minerShown}
            <button
                class="button align-text-bottom"
                on:click={() => {
                    minerShown = false
                }}
            >
                <span class="icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                </span>
            </button>
        {/if}

        <h2 class="inline-block text-2xl font-bold">Miner</h2>
    </div>

    {#if minerShown}
        <!-- Miner Stats Table -->
        {#await miner.init($selected_pool, $wallet_address) then}
            <div in:fade class="overflow-x-auto">
                <table class="table w-full ">
                    <tbody class="text-sm">
                        <tr class="hover:bg-indigo-50">
                            <th>Hashrate</th>

                            <!-- convert Hash to Megahash by dividing it by 1 million -->
                            <td
                                >{(
                                    parseFloat($miner.hashrate.shared) /
                                    1000 ** 2
                                ).toFixed(2) + ' MH/s'}</td
                            >
                        </tr>
                        <tr class="hover:bg-indigo-50">
                            <th>Workers</th>
                            <td>{$miner.workers.shared.length}</td>
                        </tr>
                        <tr class="hover:bg-indigo-50">
                            <th>Total Shares</th>
                            <td>{$miner.shares.shared.valid}</td>
                        </tr>
                        <!-- The Miner Round Share is the miners current share percent of the
                                 block reward for the current round. -->

                        <tr class="hover:bg-indigo-50">
                            <th>Round Share</th>
                            <td
                                >{(
                                    ($miner.shares.shared.valid /
                                        $stats.shares.valid) *
                                    100
                                ).toFixed(2)} %</td
                            >
                        </tr>
                        <!--
                        The Round Est. (round estimate) is an estimate of how much
                        would be earned by the miner if a block is found right now.
                        How it is calculated depends on the Pay System used by the pool.

                        The essence of the formula used is the same for all Pay Systems:
                        RoundEst = MinerShare / EveryonesShares * BlockRewardAndFees

                        For PPLNT, an if needs to be introduced:

                        If time mining >= 51% of the max:
                            Estimate = (shares / total shares) * (block reward - fees)
                        Otherwise:
                      	    Estimate = ((1 - (time / max time)) * shares) / total shares)
                      	               * (block reward - fees)
              	        -->
              	        <!-- TODO: set the round_est_earnings on $miner in stores/miners.js,
              	                   it's a bit too much complexity here.
              	        -->
                        <tr class="hover:bg-indigo-50">
                            <th>Round Est. Earnings</th>

                            {#if $miner.times.shared >= ($max_miner_time * 0.51)}
                                <td>
                                    {(
                                        ($miner.shares.shared.valid /
                                            $stats.shares.valid) *
                                        (block_reward -
                                            block_reward *
                                                $stats.config.recipientFee)
                                    ).toFixed(4)}
                                </td>
                            {:else}
                                <td>
                                    {(((1 -
                                        ($miner.times.shared /
                                            $max_miner_time) *
                                            $miner.shares.shared.valid) /
                                        $stats.shares.valid) *
                                        (block_reward -
                                            $stats.config.recipientFee)).toFixed(4)}
                                </td>
                            {/if}
                        </tr>
                        <tr class="text-base">
                            <th> Payments and Balances </th>
                        </tr>
                        <tr class="hover:bg-indigo-50">
                            <th>Unconfirmed</th>
                            <td>{$miner.payments.immature}</td>
                        </tr>
                        <tr class="hover:bg-indigo-50">
                            <th>Unpaid</th>
                            <td>{$miner.payments.balances}</td>
                        </tr>
                        <tr class="hover:bg-indigo-50">
                            <th>Immature</th>
                            <td>{$miner.payments.immature}</td>
                        </tr>
                        <tr class="hover:bg-indigo-50">
                            <th>Validated</th>
                            <td>{$miner.payments.generate}</td>
                        </tr>
                        <tr class="hover:bg-indigo-50">
                            <th>Total Paid</th>
                            <td>{$miner.payments.paid}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        {/await}
        <!-- END miner Stats Table -->
    {:else}
        <div out:fade class="p-3 text-center mb-7">
            <ul class="inline-block m-7 text-left">
                <!-- TODO: take from config -->
                <li class="block text-xl font-semibold">
                    stratum.yourpool.com
                </li>
                <li class="support">Stratum Adress</li>
            </ul>

            <ul class="text-sm sm:text-base block space-x-12 mb-7">
                <li class="text-left inline-block">
                    <span class="block font-medium"
                        >{$stats.config.algorithm}</span
                    >
                    <span class="support">Algo</span>
                </li>

                <li class="text-left inline-block">
                    <span class="block font-medium ">5031</span>
                    <!-- TODO: implement 2 diffs on backend, and change to correct diff here (coming from API, not hardcoded) -->
                    <span class="support">Port - 1 to 4 diff.</span>
                </li>

                <li class="text-left inline-block">
                    <span class="block font-medium">5032</span>
                    <span class="support">Port - 4 to 8 diff.</span>
                </li>
            </ul>

            <div class="text-center">
                <div class="form-control">
                    <!-- TODO: add some input validation: no spaces allowed, strip them -->
                    <form on:submit|preventDefault={submitAddress}>
                        <input
                            required
                            type="search"
                            name="address"
                            placeholder="RVN Wallet Address"
                            class="field w-auto ~indigo @high"
                        />
                        <button class="mt-2 button ~indigo @high" type="submit"
                            >Submit</button
                        >
                    </form>
                </div>
            </div>
        </div>
    {/if}
</div>

<!-- END Card -->
<style>
</style>
