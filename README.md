# Screed for Foundation

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)


_Mining pool frontend for the amazing [foundation-server](https://github.com/blinkhash/foundation-server) from [blinkhash](https://github.com/blinkhash)_

![screenshot of screed](https://github.com/xamogast/screed/blob/master/screenshots/screed.png?raw=true)

[Foundation-server](https://github.com/blinkhash/foundation-server) is a fresh rewrite of NOMP,
it works with new algos like KawPoW flawlessly and has minimal system requirements.

I highly recommend looking into it if you are still using YiIMP or NOMP or you are just looking into starting a new pool.

### Setup
_WIP but usable w/ some tweaking_ 

The default setup is for a single-pool; more pools can be added by editing
the Header component, and adding some logic to block_reward in the Miner component.

Until the SvelteKit port is finished, config vars have to be set up manually:
    - foundation api `endpoint` in `src/stores/miners.js`
    - `block_reward` in src/Miners.svelte
    	- used for Round Estimates -- some logic needed if you want multiple pools
    	    	

#### TODO
- [ ] add logic for coin selection
- [ ] finish SvelteKit port
- [ ] move config vars to .env
- [ ] move stats calculations to store
- [ ] add customization options

#### Made with:

- svelte
- a17t + tailwindcss
- rollup
