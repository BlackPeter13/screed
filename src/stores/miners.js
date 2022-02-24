import { writable } from 'svelte/store'
import { get } from 'svelte/store'

const endpoint = ''

// TODO: put endpoint in config for the SvelteKit port:
//const endpoint = import.meta.env.VITE_FOUNDATION_API


export const wallet_address = writable('')

export const max_miner_time = writable(0)
export const miners = createMinersStore()
export const miner  = createMinerByAddrStore()
export const workers = createWorkerStore()


/* Create store for '/miners' endpoint
*/
export function createMinersStore() {
    const {subscribe, set, update } = writable([])

    return {
        init: async (selected_pool) => {

          let miners = await fetchActiveMiners(selected_pool)
          // Find the maximum miner time value
          max_miner_time.set(
            Math.max.apply(
              Math, miners.shared.map(
                function(object)
                {
                  return object.times;
                })
            ))

          set(miners)

          return miners
        },
        subscribe,
        set
    }
}

/* Fetch '/miners?method=active', lists all miners
   Used in init of createMinersStore()
*/
async function fetchActiveMiners(selected_pool) {
  const response = await fetch(endpoint + '/' + selected_pool + '/miners?method=active')

  if (response.ok) {
    // TODO: unecessary second await here?
    const json = await response.json()
    return json.body.primary
  }
  throw new Error(response.statusText)
}

/* Fetch miner by wallet address
*/
async function fetchMinerByAddr(selected_pool, wallet_address) {
  const response = await fetch(
      endpoint + '/' + selected_pool + '/miners?method=' + wallet_address
  )
  if (response.ok) {
    // TODO: unecessary second await here?
    const json = await response.json()
    return json.body.primary
  }
  throw new Error(response.statusText)
}


/* Create store for '/miners?method=$wallet_addr' endpoint
*/
export function createMinerByAddrStore() {
    const {subscribe, set, update } = writable({})

    return {
        subscribe,
        init: async (selected_pool, wallet_address) => {

            // Init 'All Miners' object (/miners endpoint) for max_miner_time calculation
            miners.init(selected_pool)

            // fetch the specific miners data using their wallet address
            let miner = await fetchMinerByAddr(selected_pool, wallet_address)
            set(miner) // set() function sets result on _this_ svelte store!
          
            let worker_array = []
            for (let full_addr of miner.workers.shared) {
              let worker_obj = await fetchWorkerByAddr(selected_pool, full_addr)

              // split worker/rig name from address
              let [addr, worker_name] = full_addr.split(/[.]/)
              worker_obj.address = addr
              worker_obj.name  = worker_name

              worker_array.push(worker_obj)
            }

            // set all our fetched workers on the workers svelte store array
            workers.set(worker_array)

            //TODO: does this return get used in any way, if we are relying
            //      on set() above?
            return miner
        }
    }
}

/* Fetch data from '/workers' endpoint
   Lists out all workers at once, without filtering for a specific address.
*/
// async function fetchWorkers() {}
//


/* Fetch data for a single specific worker from '/workers?method=$wallet_addr'
*/
async function fetchWorkerByAddr(selected_pool, full_addr) {
    const response = await fetch(
        endpoint + '/' + selected_pool + '/workers?method=' + full_addr
    )
    if (response.ok) {
        const json = await response.json()
        return json.body.primary
    }
    throw new Error(response.statusText)
}

/* Create store for '/workers' endpoint
*/
export function createWorkerStore() {
    const {subscribe, set, update } = writable([])

    return {
        subscribe,
        set
    }
}
