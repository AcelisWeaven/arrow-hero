import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { defineConfig, lazyPlugins } from 'vite-plus'

const pkg = JSON.parse(readFileSync('package.json', 'utf8'))

function commitHash() {
	try {
		return execSync('git rev-parse --short HEAD').toString().trim()
	} catch {
		return 'dev'
	}
}

// Favicons, touch icons, startup images and the web manifest, written to assets/ like
// favicons-webpack-plugin did (the og:image meta tag points at one of them). Dev only gets the SVG.
function favicons(logo) {
	let isBuild
	let result

	return {
		name: 'favicons',
		configResolved(config) {
			isBuild = config.command === 'build'
		},
		async buildStart() {
			if (!isBuild) return

			const { favicons } = await import('favicons')
			result = await favicons(logo, {
				path: '',
				appName: pkg.name,
				appDescription: pkg.description,
				version: pkg.version,
				developerName: pkg.author,
				background: '#000',
				theme_color: '#ff3232',
				// relative to assets/manifest.webmanifest, so the installed app opens /arrow-hero/
				start_url: '../',
			})
		},
		generateBundle() {
			for (const { name, contents } of [...result.images, ...result.files])
				this.emitFile({ type: 'asset', fileName: `assets/${name}`, source: contents })
		},
		transformIndexHtml(html) {
			if (!isBuild)
				return [{ tag: 'link', attrs: { rel: 'icon', type: 'image/svg+xml', href: '/' + logo } }]

			const tags = result.html.map(tag =>
				tag
					.replace(/ href="/, ' href="assets/')
					.replace(/(name="msapplication-(?:TileImage|config)" content=")/, '$1assets/'),
			)
			return html.replace('</head>', tags.join('') + '</head>')
		},
	}
}

export default defineConfig(({ mode }) => {
	// Where run records go. Set RUNS_URL to an empty string to send nothing.
	const runsUrl =
		process.env.RUNS_URL ??
		(mode === 'production'
			? 'https://arrow-hero-runs.agraziani.workers.dev/run'
			: 'http://localhost:8787/run')

	return {
		// relative URLs, the site is served from /arrow-hero/
		base: './',
		define: {
			BUILD: JSON.stringify(commitHash()),
			RUNS_URL: JSON.stringify(runsUrl),
		},
		server: {
			open: true,
		},
		build: {
			// one chunk, so nothing to preload
			modulePreload: { polyfill: false },
		},
		plugins: lazyPlugins(() => [favicons('src/images/favicon.svg')]),
		lint: {
			ignorePatterns: ['dist/**'],
			categories: {
				correctness: 'error',
			},
			rules: {
				'no-undef': 'error',
			},
			env: {
				browser: true,
			},
			globals: {
				BUILD: 'readonly',
				RUNS_URL: 'readonly',
			},
			overrides: [
				{
					files: ['vite.config.js'],
					env: {
						node: true,
					},
				},
			],
		},
		fmt: {
			ignorePatterns: ['dist/**', 'index.html'],
			useTabs: true,
			semi: false,
			singleQuote: true,
			arrowParens: 'avoid',
			overrides: [
				{
					files: ['*.json'],
					options: {
						useTabs: false,
					},
				},
			],
		},
	}
})
