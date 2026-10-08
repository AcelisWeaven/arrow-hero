'use strict'

// One anonymous record per run, sent at game over, and as a snapshot when the
// tab gets hidden mid-run (mobile browsers can kill a hidden tab without any
// other event). The run id lives in memory only, so runs can't be linked.
//
// `ev` is the run as a string of tokens: a delay in 10 ms steps since the
// previous token, then a letter.
//   L U R D  stance changed
//   l u r d  an arrow of that direction reached the selector, `x` after it if
//            the game counted a miss
//   P F p    paused by the player, paused because the page lost focus, resumed
//   Z        the layout switched at 480 px, which restarts arrows in flight

const optOutKey = 'runData'

let run = null
let runCount = 0
let lastRunEnd = null

function randomId () {
	const bytes = crypto.getRandomValues(new Uint8Array(8))
	return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('')
}

let runDataOnWithoutStorage = false

export function isRunDataOn () {
	try {
		return localStorage.getItem(optOutKey) !== 'off'
	} catch {
		return runDataOnWithoutStorage
	}
}

export function setRunDataOn (on) {
	runDataOnWithoutStorage = on
	try {
		if (on)
			localStorage.removeItem(optOutKey)
		else
			localStorage.setItem(optOutKey, 'off')
	} catch {
		return
	}
}

// trusted: whether the key that started the run came from a real keyboard,
// undefined when the run was restarted with Space
export function startRun (exp, view, trusted) {
	const now = performance.now()
	runCount++
	run = {
		id: randomId(),
		n: runCount,
		gap: lastRunEnd === null ? null : Math.round((now - lastRunEnd) / 1000),
		exp,
		view,
		start: now,
		last: 0,
		keyboard: trusted === true,
		touch: trusted === false,
		ev: '',
	}
}

function log (token) {
	if (run === null)
		return

	// Rounding the offset, not each delay, keeps long runs from drifting
	const t = Math.round((performance.now() - run.start) / 10)
	run.ev += t - run.last + token
	run.last = t
}

export function logStance (direction) {
	log(direction[0].toUpperCase())
}

export function logArrival (direction, hit) {
	log(direction[0] + (hit ? '' : 'x'))
}

export function logPause (focusLost) {
	log(focusLost ? 'F' : 'P')
}

export function logResume () {
	log('p')
}

export function logLayout () {
	log('Z')
}

// Touch buttons dispatch synthetic key events, real keys are trusted
export function logInput (trusted) {
	if (run === null)
		return

	if (trusted)
		run.keyboard = true
	else
		run.touch = true
}

function send (end, score) {
	if (RUNS_URL === '' || !isRunDataOn())
		return

	const body = JSON.stringify({
		v: 2,
		build: BUILD,
		run: run.id,
		n: run.n,
		gap: run.gap,
		end,
		score,
		in: (run.keyboard ? 'k' : '') + (run.touch ? 't' : ''),
		exp: run.exp,
		view: run.view,
		ev: run.ev,
	})

	// A plain text body keeps this a simple request: no CORS preflight.
	// keepalive lets it outlive the page, within a 64 KB budget the browser
	// shares between all keepalive requests.
	fetch(RUNS_URL, {
		method: 'POST',
		body,
		mode: 'no-cors',
		credentials: 'omit',
		keepalive: body.length < 60000,
	}).catch(() => null)
}

export function endRun (score) {
	if (run === null)
		return

	send('dead', score)
	lastRunEnd = performance.now()
	run = null
}

export function snapshotRun (score) {
	if (run !== null)
		send('hidden', score)
}
