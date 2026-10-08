'use strict'

import {
	endRun,
	isRunDataOn,
	logArrival,
	logInput,
	logLayout,
	logPause,
	logResume,
	logStance,
	setRunDataOn,
	snapshotRun,
	startRun,
} from './runLog'
import keySmallSvg from '../images/key-small.svg?raw'
import selectorSvg from '../images/selector.svg?raw'
import keySvg from '../images/key.svg?raw'

const keyDomItem = new DOMParser().parseFromString(keySvg, 'image/svg+xml')
const keySmallDomItem = new DOMParser().parseFromString(keySmallSvg, 'image/svg+xml')
const selectorDomItem = new DOMParser().parseFromString(selectorSvg, 'image/svg+xml')

function pointsLabel(value) {
	return Number(value) === 1 ? 'point' : 'points'
}

function addMultipleEventListener(element, events, handler) {
	events.forEach(e => element.addEventListener(e, handler))
}

// A link or button that has the keyboard focus, so Space belongs to it. Synthetic events target the document.
function onControl(e) {
	return e.target instanceof Element && e.target.closest('a, button') !== null
}

// A clicked button keeps the focus, so Space would press it again instead of reaching the game. Keyboard
// presses (detail 0) keep it, so keyboard users stay where they are.
function blurAfterClick(button) {
	button.addEventListener('click', e => {
		if (e.detail > 0) button.blur()
	})
}

function readBestScore() {
	try {
		return localStorage.getItem('bestScore')
	} catch {
		return null
	}
}

function saveBestScore(score) {
	try {
		localStorage.setItem('bestScore', score)
	} catch {
		return
	}
}

document.addEventListener('DOMContentLoaded', () => {
	let points = 0
	const pointContainers = document.querySelectorAll('.points')
	let keypressed = 'key-'
	const container = document.querySelector('.keys-container')
	const fullscreenContainer = document.querySelector('.fullscreen-container')
	const globalContainer = document.querySelector('.container')
	const square = document.querySelector('.key-selector')
	// array of objects: {score, speed, message, points}
	const speeds = [
		{
			score: 0,
			speed: 800,
			message: '',
			points: 1,
			keys: 1,
		},
		{
			score: 3,
			speed: 750,
			message: "You've got it!",
			points: 2,
			keys: 2,
		},
		{
			score: 20,
			speed: 670,
			message: 'Keep going!',
			points: 5,
			keys: 3,
		},
		{
			score: 70,
			speed: 620,
			message: "You're doing great!",
			points: 7,
			keys: 3,
		},
		{
			score: 150,
			speed: 560,
			message: 'You rock!',
			points: 10,
			keys: 3,
		},
		{
			score: 300,
			speed: 510,
			message: "Don't stop!",
			points: 12,
			keys: 4,
		},
		{
			score: 500,
			speed: 490,
			message: 'Tricky!',
			points: 15,
			keys: 4,
		},
		{
			score: 760,
			speed: 465,
			message: 'Great!',
			points: 17,
			keys: 4,
		},
		{
			score: 1100,
			speed: 440,
			message: 'I like your style!',
			points: 20,
			keys: 4,
		},
		{
			score: 1500,
			speed: 390,
			message: 'Awesome!',
			points: 22,
			keys: 4,
		},
		{
			score: 2000,
			speed: 360,
			message: 'Yeah!!',
			points: 25,
			keys: 4,
		},
		{
			score: 2700,
			speed: 330,
			message: 'How do you do that?',
			points: 27,
			keys: 4,
		},
		{
			score: 3500,
			speed: 310,
			message: '...how?',
			points: 30,
			keys: 4,
		},
		{
			score: 4300,
			speed: 290,
			message: "Don't ever stop!!",
			points: 32,
			keys: 4,
		},
		{
			score: 5500,
			speed: 280,
			message: "I'm really impressed.",
			points: 35,
			keys: 4,
		},
		{
			score: 7000,
			speed: 270,
			message: 'Arrow hero!',
			points: 40,
			keys: 4,
		},
		{
			score: 10000,
			speed: 260,
			message: "You're really still here?",
			points: 40,
			keys: 4,
		},
		{
			score: 10500,
			speed: 250,
			message: "That's incredible!",
			points: 40,
			keys: 4,
		},
	]
	let current = speeds[0]
	let gameState = false
	let maxLife = 5000
	let currentLife = maxLife
	// array of objects: {delay, started, interval}
	let scheduledSpawns = []
	let bestScore = readBestScore()
	const mobileControls = document.querySelector('.mobile-controls')
	// Same breakpoint as the mobile layout in responsive.css
	const mobileLayout = window.matchMedia('(max-width: 480px)')
	// Same as the instruction texts in responsive.css: a touch screen and no mouse
	const touchOnly = window.matchMedia('(hover: none) and (pointer: coarse)')
	let focusLost = false

	const bottomKeys = ['left', 'up', 'right', 'down']
	document
		.querySelectorAll('.about .key-up')
		.forEach(k => k.appendChild(keySmallDomItem.childNodes[0].cloneNode(true)))
	square.appendChild(selectorDomItem.childNodes[0].cloneNode(true))
	bottomKeys.forEach(k =>
		document
			.querySelector('.mobile-controls .key-' + k)
			.appendChild(keyDomItem.childNodes[0].cloneNode(true)),
	)

	function updatePoints(pts) {
		if (pts < 1) pts = 1

		pts = Math.floor(pts)
		points += pts
		replay('seat')

		showPoints()
		pointContainers.forEach(pointContainer => {
			pointContainer.classList.add('bump')
			pointContainer.onanimationend = () => {
				pointContainer.classList.remove('bump')
			}
		})

		const ding = document.createElement('div')
		ding.classList.add('ding')
		ding.textContent = `+${pts}`
		ding.onanimationend = () => {
			ding.remove()
		}

		square.appendChild(ding)
	}

	// the longest animation each class runs, on the selector or one of its parts
	const squareAnimations = {
		'selector-seat': 'seat',
		'selector-shake': 'bad',
		'selector-punch': 'punch',
		'life-heartbeat': 'heal',
	}

	square.addEventListener('animationend', e => {
		if (square.contains(e.target) && squareAnimations[e.animationName])
			square.classList.remove(squareAnimations[e.animationName])
	})

	// Restarts a selector animation, even if its class is still on from the last time
	function replay(cls) {
		square.classList.remove(cls)
		square.getBoundingClientRect()
		square.classList.add(cls)
	}

	// Screens change under a panel that covers the board: it slides on, the screens swap in one frame
	// (swap), it slides off, then done runs. A new transition finishes the pending swap first.
	const shutter = document.querySelector('.shutter')
	let pendingSwap = null

	function shutterSwap(swap, done) {
		if (pendingSwap) pendingSwap()

		pendingSwap = swap
		shutter.classList.remove('cover', 'uncover')
		shutter.getBoundingClientRect()
		shutter.classList.add('cover')
		shutter.onanimationend = () => {
			pendingSwap = null
			swap()
			shutter.classList.replace('cover', 'uncover')
			shutter.onanimationend = () => {
				shutter.classList.remove('uncover')
				if (done) done()
			}
		}
	}

	// The life band around the selector eases toward the real life. A miss leaves a red chunk that holds
	// for a moment, then drains, like a fighting game's health bar.
	const lifeBand = square.querySelector('.sel-life-band')
	const lifeChunk = square.querySelector('.sel-life-chunk')
	let lifeShown = maxLife
	let lifeLag = maxLife
	let lagHold = 0
	let lastHeartbeat = 0
	let lastLifeFrame = performance.now()

	function loseLife(amount) {
		const life = Math.max(0, currentLife)
		if (lagHold <= 0 && lifeLag <= life + 1) lifeLag = life
		lagHold = 0.45
		currentLife -= amount
	}

	function gainLife(amount) {
		// a heal beats like a heart, at most once per beat so fast catches don't flutter, and not at full life
		const now = performance.now()
		if (currentLife < maxLife && now - lastHeartbeat >= 300) {
			lastHeartbeat = now
			replay('heal')
		}
		currentLife = Math.min(currentLife + amount, maxLife)
	}

	function drawLife(now) {
		const dt = Math.min(0.05, (now - lastLifeFrame) / 1000)
		lastLifeFrame = now
		const life = Math.max(0, currentLife)
		// about 90% of the way in 0.05s
		lifeShown += (life - lifeShown) * Math.min(1, dt * 45)
		if (life >= lifeLag) lifeLag = lifeShown
		else if (lagHold > 0) lagHold -= dt
		else lifeLag = Math.max(life, lifeLag - maxLife * 0.5 * dt)

		const shown = (lifeShown * 100) / maxLife
		lifeBand.style.strokeDasharray = `${shown} 100`
		lifeChunk.style.strokeDasharray = `${((lifeLag - lifeShown) * 100) / maxLife} 100`
		lifeChunk.style.strokeDashoffset = -shown
		requestAnimationFrame(drawLife)
	}
	requestAnimationFrame(drawLife)

	function showPoints() {
		pointContainers.forEach(pointContainer => (pointContainer.textContent = points))
		document
			.querySelectorAll('.points + .points-label')
			.forEach(label => (label.textContent = pointsLabel(points)))
	}

	function showBest() {
		document.querySelector('.best-points .value').textContent = bestScore
		document.querySelector('.best-points .points-label').textContent = pointsLabel(bestScore)
		document.querySelector('.best').style.display = 'block'
	}

	const levelMessage = document.querySelector('.level-message')

	// Screen readers hear the game's state changes, not every point
	const announcer = document.getElementById('announcer')
	function announce(text) {
		// cleared first, so the same text twice in a row is read again
		announcer.textContent = ''
		setTimeout(() => (announcer.textContent = text), 100)
	}

	function updateSpeed() {
		const oldSpeed = current
		for (const i in speeds) {
			const _speed = speeds[i]
			if (points >= _speed.score) current = _speed
			else if (points < _speed.score) break
		}

		if (current.speed !== oldSpeed.speed) {
			// Speed changed !
			levelMessage.textContent = current.message
			levelMessage.classList.add('show')
			levelMessage.onanimationend = () => {
				levelMessage.classList.remove('show')
			}
		}
	}

	function spawnRandomKey(obj) {
		if (gameState !== 'paused')
			// running or ended
			removeScheduledSpawn(obj)

		if (gameState === 'end' || gameState === 'paused' || gameState === 'restart') return

		const arr = ['key-right', 'key-left', 'key-down', 'key-up']
		const direction = arr[Math.floor(Math.random() * current.keys)]
		let nextKey = container.querySelector('.idle')
		if (nextKey === null) {
			nextKey = document.createElement('div')
			nextKey.appendChild(keyDomItem.childNodes[0].cloneNode(true))
			nextKey.classList.add('key', direction)
			nextKey.onanimationend = () => {
				if (gameState === 'end' || gameState === 'restart' || nextKey.classList.contains('idle'))
					return

				// Keys are recycled, so the direction comes from the class, not from the spawn
				const hit = nextKey.classList.contains(keypressed)
				logArrival(
					bottomKeys.find(k => nextKey.classList.contains('key-' + k)),
					hit,
				)

				if (hit) {
					gainLife(200)

					updatePoints(current.points)
				} else {
					loseLife(1000)
					replay('bad')
				}

				updateSpeed()

				if (currentLife <= 0 && gameState === 'running') endGame()

				nextKey.classList.add('idle')
				nextKey.classList.remove('key-up', 'key-down', 'key-left', 'key-right')
			}
			container.appendChild(nextKey)
		} else {
			nextKey.classList.remove('idle')
			nextKey.classList.add(direction)
		}

		// Spawn next key
		scheduleSpawn(current.speed)
	}

	function scheduleSpawn(delay) {
		const now = new Date()
		const obj = {
			delay,
			started: now.getTime(),
		}
		obj.interval = setTimeout(spawnRandomKey, delay, obj)
		scheduledSpawns.push(obj)
	}

	function removeScheduledSpawn(obj) {
		const index = scheduledSpawns.indexOf(obj)
		if (index > -1) scheduledSpawns.splice(index, 1)
	}

	function pauseScheduledSpawns() {
		const now = new Date()
		for (const i in scheduledSpawns) {
			const obj = scheduledSpawns[i]
			obj.delay -= now.getTime() - obj.started
			obj.started = null
			clearInterval(obj.interval)
		}
	}

	function resumeScheduledSpawns() {
		const now = new Date()
		for (const i in scheduledSpawns) {
			const obj = scheduledSpawns[i]
			obj.started = now.getTime()
			obj.interval = setTimeout(spawnRandomKey, obj.delay, obj)
		}
	}

	function endGame() {
		gameState = 'end'
		endRun(points)
		document.querySelector('.pause-btn').textContent = 'Restart'

		// the arrows freeze for a moment so the loss reads before the board changes
		document.querySelectorAll('.key').forEach(k => k.classList.add('paused'))
		setTimeout(() => {
			if (gameState !== 'end') return

			shutterSwap(() => {
				document.querySelectorAll('.key').forEach(k => k.classList.add('hide'))

				const keySelectorContainer = document.querySelector('.key-selector-container')
				keySelectorContainer.classList.add('hide')
				keySelectorContainer.classList.remove('show')

				const results = document.querySelector('.results')
				results.classList.add('show')
				results.classList.remove('hide')

				const pointsContainer = document.querySelector('.points-container')
				pointsContainer.classList.add('hide')
				pointsContainer.classList.remove('show')
			})
		}, 250)

		const isBest = points > bestScore
		if (isBest) {
			// update best score
			bestScore = points
			saveBestScore(bestScore)
			showBest()
		}

		const restart = touchOnly.matches ? 'Touch Restart' : 'Press Space'
		announce(
			`Game over: ${points} ${pointsLabel(points)}${isBest ? ', a new best' : ''}. ${restart} to try again.`,
		)
	}

	function restartGame() {
		gameState = 'restart'
		points = 0
		maxLife = 5000
		currentLife = maxLife
		current = speeds[0]

		if (keypressed !== '') square.classList.remove('s-' + keypressed)

		keypressed = ''

		shutterSwap(
			() => {
				container.querySelectorAll('.key').forEach(key => {
					key.classList.remove('key-up', 'key-down', 'key-left', 'key-right', 'hide', 'paused')
					key.classList.add('idle')
				})

				const keySelectorContainer = document.querySelector('.key-selector-container')
				keySelectorContainer.classList.add('show')
				keySelectorContainer.classList.remove('hide')

				const results = document.querySelector('.results')
				results.classList.add('hide')
				results.classList.remove('show')

				const pointsContainer = document.querySelector('.points-container')
				pointsContainer.classList.add('show')
				pointsContainer.classList.remove('hide')

				for (const i in scheduledSpawns) {
					const obj = scheduledSpawns[i]
					clearInterval(obj.interval)
				}
				scheduledSpawns = []
				showPoints()
			},
			() => {
				gameState = 'running'
				startRunLog()
				announce('Game started')
				document.querySelector('.pause-btn').textContent = 'Pause'
				scheduleSpawn(1)
				if (!document.hasFocus()) autoPause()
			},
		)
	}

	function toggleFullscreen() {
		const isFullscreen = document.fullscreenElement !== null

		if (!isFullscreen) {
			if (fullscreenContainer.requestFullscreen) fullscreenContainer.requestFullscreen()
		} else if (document.exitFullscreen) document.exitFullscreen()
	}

	function updateScaleFactor() {
		// Original size is --size in variables.css
		const size = 390
		const height = globalContainer.offsetHeight

		document.documentElement.style.setProperty('--scale-factor', height / size)
	}

	document.onfullscreenchange = () => {
		const isFullscreen = document.fullscreenElement !== null

		if (!isFullscreen) fullscreenContainer.classList.remove('is-fullscreen')
		else fullscreenContainer.classList.add('is-fullscreen')

		// timeout is needed, so browser can update the size of the container properly
		setTimeout(updateScaleFactor, 100)
	}

	window.onresize = updateScaleFactor

	function autoPause() {
		if (gameState === 'running') {
			// auto pause
			focusLost = true
			document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 32 /* space */ }))
			focusLost = false
		}
	}

	document.body.onblur = autoPause

	document.onkeydown = e => {
		if (e.key === 'F11') {
			toggleFullscreen()
			e.preventDefault()
		}

		if (e.keyCode === 32) {
			// before the first run, Space presses the focused button. After that it restarts, as the game over
			// screen says, and Enter presses buttons.
			if (onControl(e) && gameState === false) return

			e.preventDefault()
			if (gameState === 'running' || gameState === 'paused') {
				// space bar pressed

				gameState = gameState === 'running' ? 'paused' : 'running'
				document
					.querySelectorAll('.key')
					.forEach(k => k.classList.toggle('paused', gameState === 'paused'))
				document.querySelector('.pause').classList.toggle('show', gameState === 'paused')

				if (gameState === 'paused') {
					pauseScheduledSpawns()
					logPause(focusLost)
					announce('Paused')
				} else if (currentLife <= 0) endGame()
				else {
					resumeScheduledSpawns()
					logResume()
					announce('Resumed')
				}
			} else if (gameState === 'end') restartGame()
		}

		if (
			[
				37 /* left */, 38 /* up */, 39 /* right */, 40 /* down */, 72 /* h */, 74 /* j */,
				75 /* k */, 76 /* l */,
			].includes(e.keyCode) &&
			gameState !== 'paused' &&
			gameState !== 'restart'
		) {
			// arrow keys pressed

			e.preventDefault()
			if (gameState === false) startGame(e.isTrusted)

			logInput(e.isTrusted)
			const previous = keypressed
			if (keypressed !== '') square.classList.remove('s-' + keypressed)

			switch (e.keyCode) {
				case 37: // left
				case 72: // h
					keypressed = 'key-left'
					break

				case 38: // up
				case 75: // k
					keypressed = 'key-up'
					break

				case 39: // right
				case 76: // l
					keypressed = 'key-right'
					break

				case 40: // down
				case 74: // j
					keypressed = 'key-down'
					break
			}
			square.classList.add('s-' + keypressed)
			if (keypressed !== previous) {
				logStance(keypressed.replace('key-', ''))
				replay('punch')
			}
		}
	}

	// The game took this Space on keydown, so the focused button must not get it as a press on keyup
	document.onkeyup = e => {
		if (e.keyCode === 32 && onControl(e) && gameState !== false) e.preventDefault()
	}

	function startGame(trusted) {
		gameState = 'running'
		startRunLog(trusted)
		announce('Game started')

		shutterSwap(() => {
			document.querySelector('.points-container').classList.add('show')
			document.querySelector('.helper-container').classList.add('hide')
			document.querySelector('.track').classList.add('show')
			document.querySelector('.key-selector').classList.add('show')
			// an arrow is invisible for the first 7% of its orbit, so the first one shows as the panel slides off
			scheduleSpawn(1)
		})
	}

	function tierIndex(score) {
		let index = 0
		speeds.forEach((speed, i) => {
			if (score >= speed.score) index = i
		})
		return index
	}

	function startRunLog(trusted) {
		const best = Number(bestScore)
		const exp = bestScore === null || Number.isNaN(best) ? null : tierIndex(best)
		let view = mobileLayout.matches ? 'mobile' : 'normal'
		if (fullscreenContainer.classList.contains('is-fullscreen')) view = 'full'

		startRun(exp, view, trusted)
	}

	if (bestScore) showBest()

	const arrowCodes = { 'key-left': 37, 'key-up': 38, 'key-right': 39, 'key-down': 40 }
	const slideDelay = 40
	const fingers = new Map()
	let lastGestureEnd = 0

	function arrowCode(button) {
		return arrowCodes[[...button.classList].find(c => c in arrowCodes)]
	}

	function arrowAt(x, y) {
		const button = document.elementFromPoint(x, y)?.closest('.mobile-controls button')
		return button && arrowCode(button) ? button : null
	}

	function pressArrow(button) {
		document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: arrowCode(button) }))
	}

	function showPressed() {
		const held = [...fingers.values()].map(f => f.arrow)
		mobileControls
			.querySelectorAll('button')
			.forEach(b => b.classList.toggle('pressed', held.includes(b)))
	}

	function settle(finger) {
		finger.arrow = finger.pending
		finger.pending = null
		pressArrow(finger.arrow)
		showPressed()
	}

	function liftFinger(e, lifted) {
		const finger = fingers.get(e.pointerId)
		if (!finger) return

		clearTimeout(finger.timer)
		if (lifted && finger.pending) settle(finger)
		fingers.delete(e.pointerId)
		showPressed()
		lastGestureEnd = performance.now()
	}

	mobileControls.addEventListener('pointerdown', e => {
		const arrow = arrowAt(e.clientX, e.clientY)
		if (!arrow) return

		mobileControls.setPointerCapture(e.pointerId)
		fingers.set(e.pointerId, { arrow, pending: null, timer: null })
		pressArrow(arrow)
		showPressed()
	})

	mobileControls.addEventListener('pointermove', e => {
		const finger = fingers.get(e.pointerId)
		if (!finger) return

		const arrow = arrowAt(e.clientX, e.clientY)
		if (arrow === finger.pending) return

		clearTimeout(finger.timer)
		finger.pending = null
		if (!arrow || arrow === finger.arrow) return

		finger.pending = arrow
		finger.timer = setTimeout(settle, slideDelay, finger)
	})

	mobileControls.addEventListener('pointerup', e => liftFinger(e, true))
	mobileControls.addEventListener('pointercancel', e => liftFinger(e, false))
	mobileControls.addEventListener('lostpointercapture', e => liftFinger(e, false))

	mobileControls.addEventListener('contextmenu', e => e.preventDefault())
	window.addEventListener('blur', () => {
		fingers.forEach(f => clearTimeout(f.timer))
		fingers.clear()
		showPressed()
	})

	Object.keys(arrowCodes).forEach(cls => {
		const button = mobileControls.querySelector('.' + cls)
		button.addEventListener('click', () => {
			if (fingers.size === 0 && performance.now() - lastGestureEnd > 500) pressArrow(button)
		})
		blurAfterClick(button)
	})

	blurAfterClick(mobileControls.querySelector('.pause-btn'))
	addMultipleEventListener(
		mobileControls.querySelector('.pause-btn'),
		['click', 'touchstart'],
		e => {
			e.preventDefault()
			document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 32 /* space */ }))
		},
	)

	// If URL contains ?fullscreen, start in pseudo-fullscreen
	if (window.location.search.includes('fullscreen'))
		fullscreenContainer.classList.add('is-fullscreen')

	document.getElementById('toggle-fullscreen').addEventListener('click', toggleFullscreen)
	blurAfterClick(document.getElementById('toggle-fullscreen'))

	document.addEventListener('visibilitychange', () => {
		if (document.visibilityState === 'hidden') snapshotRun(points)
	})

	mobileLayout.addEventListener('change', logLayout)

	const runDataStatus = document.querySelector('.run-data-status')
	const runDataToggle = document.getElementById('toggle-run-data')
	const runDataOnText = runDataStatus.textContent

	function updateRunData() {
		const on = isRunDataOn()
		runDataStatus.textContent = on ? runDataOnText : 'Run recording is off.'
		runDataToggle.textContent = on ? 'Turn off' : 'Turn on'
	}

	runDataToggle.addEventListener('click', () => {
		setRunDataOn(!isRunDataOn())
		updateRunData()
		announce(runDataStatus.textContent)
	})
	blurAfterClick(runDataToggle)
	updateRunData()

	updateScaleFactor()
})
