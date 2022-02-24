import { readable } from 'svelte/store'
import { writable } from 'svelte/store'

const endpoint = ''

// TODO: replace with DEFAULT_POOL or similiar from env vars
export const selected_pool = writable("Ravencoin")

export function createStatStore() {
    const { subscribe, set, update } = writable({})

    return {
        subscribe,
        // IMPORTANT: Promise for stats, used with {#await} blocks in the HTML to
        // wait for the API call to finish when calling components that need that data.
        //
        // In SvelteKit port, this should be handled in the load() function before components
        // start loading.
        init: async (selected_pool) => {

            const response = await fetch(endpoint + '/' + selected_pool)

            if (response.ok) {
                const json = await response.json()
                set(json.body.primary)
                return json.body.primary
            }

            throw new Error(response.statusText)

        }
        
    }
}

export const stats = createStatStore()
