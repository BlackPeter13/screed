# Screed for Foundation

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)


![screenshot of screed](https://github.com/xamogast/screed/blob/master/screenshots/screed.png?raw=true)

Screed is a frontend for the amazing mining-pool software [foundation-server](https://github.com/blinkhash/foundation-server) from [blinkhash](https://github.com/blinkhash); a complete rewrite of NOMP. It works flawlessly with new algos like kawpow, has a clean API and has minimal system requirements. I highly recommend looking into foundation if you are still using YiIMP or NOMP or are just looking into starting a new pool in 2022.

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
