# Polar

_Mining pool frontend for the amazing [foundation-server](https://github.com/blinkhash/foundation-server) from [blinkhash](https://github.com/blinkhash)_

![screenshot of polar](https://github.com/xamogast/polar/blob/main/screenshots/polar.png?raw=true)

[Foundation-server](https://github.com/blinkhash/foundation-server) is a fresh rewrite of NOMP,
it works with new algos like KawPoW flawlessly and has minimal system requirements.

I highly recommend looking into it, especially if you are still using YiIMP or NOMP.

### Setup
_WIP: The frontend is currently only usable after some config tweaking_ 


The default setup is for a single-pool, but more pools can be added easily by editing
the Header component, and adding some logic to block_reward in the Miner component.

Until the SvelteKit port is finished, config vars have to be set up manually:
    - foundation api `endpoint` in `src/stores/miners.js`
    - `block_reward` in src/Miners.svelte
    	- used for Round Estimates -- some logic needed if you want multiple pools
    	    	
Important: _If you need a custom setup or premium support, please contact me through <https://polarpool.ml> -- DMs are a lot easier to miss than e-mails._

#### TODO
- [ ] finish SvelteKit port
- [ ] move config vars to .env
- [ ] move stats calculations to store
- [ ] add customization options

#### Made with:

- svelte
- a17t + tailwindcss
- rollup