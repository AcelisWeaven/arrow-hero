import { execSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { basename } from 'node:path'
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

// The fonts, cut down to the given characters and written to assets/, with their @font-face rules and preload
// hints in the page head, so declare only the faces the first screen uses. Dev inlines them instead.
// Fontsource ships the files Google Fonts serves.
function fonts(text, faces) {
	let isBuild
	let base
	let subsets

	return {
		name: 'fonts',
		configResolved(config) {
			isBuild = config.command === 'build'
			base = config.base
		},
		async buildStart() {
			const { default: subsetFont } = await import('subset-font')
			subsets = await Promise.all(
				faces.map(async face => {
					const { id } = await this.resolve(face.file)
					// name ID 14 is the OFL link, the copyright notice is kept by default
					const source = await subsetFont(readFileSync(id), text, {
						targetFormat: 'woff2',
						preserveNameIds: [14],
					})
					const hash = createHash('sha256').update(source).digest('base64url').slice(0, 8)
					return {
						...face,
						source,
						fileName: `assets/${basename(face.file, '.woff2')}-${hash}.woff2`,
					}
				}),
			)
		},
		generateBundle() {
			for (const { fileName, source } of subsets) this.emitFile({ type: 'asset', fileName, source })
		},
		transformIndexHtml() {
			const url = font =>
				isBuild ? base + font.fileName : `data:font/woff2;base64,${font.source.toString('base64')}`
			const rules = subsets.map(
				font =>
					`@font-face{font-family:'${font.family}';font-style:${font.style};font-weight:${font.weight};font-display:swap;src:url(${url(font)}) format('woff2')}`,
			)
			const preloads = (isBuild ? subsets : []).map(font => ({
				tag: 'link',
				attrs: {
					rel: 'preload',
					href: url(font),
					as: 'font',
					type: 'font/woff2',
					crossorigin: true,
				},
				injectTo: 'head',
			}))
			return [...preloads, { tag: 'style', children: rules.join(''), injectTo: 'head' }]
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
		plugins: lazyPlugins(() => [
			favicons('src/images/favicon.svg'),
			// the punctuation the texts use, and the whole alphabet so a reworded text still has its letters
			fonts("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 \u00a0!'()+,-.:?", [
				{
					family: 'DM Mono',
					style: 'normal',
					weight: 400,
					file: '@fontsource/dm-mono/files/dm-mono-latin-400-normal.woff2',
				},
				{
					family: 'DM Mono',
					style: 'normal',
					weight: 500,
					file: '@fontsource/dm-mono/files/dm-mono-latin-500-normal.woff2',
				},
				{
					family: 'Rubik Mono One',
					style: 'normal',
					weight: 400,
					file: '@fontsource/rubik-mono-one/files/rubik-mono-one-latin-400-normal.woff2',
				},
			]),
		]),
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
