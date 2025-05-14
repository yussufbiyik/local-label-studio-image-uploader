import adapterAuto from '@sveltejs/adapter-auto';
import adapterNode from '@sveltejs/adapter-node';
import adapterStatic from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */

function pickAdapter() {
	switch (process.env.adapter) {
		case 'node':
			return adapterNode();
		case 'static':
			return adapterStatic();
		default:
			return adapterAuto();
	}
}

const config = {
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: pickAdapter(),
	}
};

export default config;
