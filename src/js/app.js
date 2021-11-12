'use strict'

import svg from '../images/key.svg'

const keySvg = atob(svg.split(',')[1])
const keyDomItem = new DOMParser().parseFromString(keySvg, 'image/svg+xml')

function addMultipleEventListener (element, events, handler) {
	events.forEach(e => element.addEventListener(e, handler))
}

document.addEventListener('DOMContentLoaded', () => {
	let points = 0
	const pointContainers = document.querySelectorAll('.points')
	let keypressed = 'key-'
	const container = document.querySelector('.keys-container')
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
			message: 'Don\'t ever stop!!',
			points: 32,
			keys: 4,
		},
		{
			score: 5500,
			speed: 280,
			message: 'I\'m really impressed.',
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
			message: 'You\'re really still here?',
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
	let bestScore = localStorage.getItem('bestScore')
	const mobileControls = document.querySelector('.mobile-controls')

	// initialize helpers
	const bottom = document.querySelector('.bottom')
	const bottomKeys = [ 'left', 'up', 'right', 'down' ]
	bottomKeys.forEach(k =>
		bottom.querySelector('.key-' + k).appendChild(keyDomItem.childNodes[0].cloneNode(true)))

	function updatePoints (pts) {
		if (pts < 1)
			pts = 1

		pts = Math.floor(pts)
		points += pts
		square.classList.add('bump')
		square.onanimationend = () => {
			square.classList.remove('bump')
		}

		pointContainers.forEach(pointContainer => {
			pointContainer.textContent = points
			pointContainer.classList.add('bump')
			pointContainer.onanimationend = () => {
				pointContainer.classList.remove('bump')
			}
		})

		const ding = document.createElement('div')
		ding.classList.add('ding')
		ding.textContent = `+${ pts }`
		ding.onanimationend = () => {
			ding.remove()
		}

		square.appendChild(ding)
	}

	const levelMessage = document.querySelector('.level-message')

	function updateSpeed () {
		const oldSpeed = current
		for (const i in speeds) {
			const _speed = speeds[i]
			if (points >= _speed.score)
				current = _speed
			else if (points < _speed.score)
				break

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

	function spawnRandomKey (obj) {
		if (gameState !== 'paused') // running or ended
			removeScheduledSpawn(obj)

		if (gameState === 'end' || gameState === 'paused' || gameState === 'restart')
			return

		const arr = [ 'key-right', 'key-left', 'key-down', 'key-up' ]
		const direction = arr[Math.floor(Math.random() * current.keys)]
		let nextKey = container.querySelector('.idle')
		if (nextKey === null) {
			nextKey = document.createElement('div')
			nextKey.appendChild(keyDomItem.childNodes[0].cloneNode(true))
			nextKey.classList.add('key', direction)
			nextKey.onanimationend = () => {

				if (gameState === 'end' || gameState === 'restart' || nextKey.classList.contains('idle'))
					return

				if (nextKey.classList.contains(keypressed)) {
					currentLife = Math.min(currentLife + 200, maxLife)

					updatePoints(current.points)
				} else {
					currentLife -= 1000
					square.classList.add('bad')
					square.onanimationend = () => {
						square.classList.remove('bad')
					}
				}

				updateSpeed()

				const percent = currentLife * 100 / maxLife
				const percentElem = document.querySelector('.percent')
				percentElem.style.width = percent + '%'

				if (percent < 20)
					percentElem.classList.add('low')
				else if (percent < 60) {
					percentElem.classList.add('medium')
					percentElem.classList.remove('low')
				} else
					percentElem.classList.remove('low', 'medium')

				if (currentLife <= 0 && gameState === 'running')
					endGame()

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

	function scheduleSpawn (delay) {
		const now = new Date()
		const obj = {
			delay,
			started: now.getTime(),
		}
		obj.interval = setTimeout(spawnRandomKey, delay, obj)
		scheduledSpawns.push(obj)
	}

	function removeScheduledSpawn (obj) {
		const index = scheduledSpawns.indexOf(obj)
		if (index > -1)
			scheduledSpawns.splice(index, 1)

	}

	function pauseScheduledSpawns () {
		const now = new Date()
		for (const i in scheduledSpawns) {
			const obj = scheduledSpawns[i]
			obj.delay -= now.getTime() - obj.started
			obj.started = null
			clearInterval(obj.interval)
		}
	}

	function resumeScheduledSpawns () {
		const now = new Date()
		for (const i in scheduledSpawns) {
			const obj = scheduledSpawns[i]
			obj.started = now.getTime()
			obj.interval = setTimeout(spawnRandomKey, obj.delay, obj)
		}
	}

	function endGame () {
		gameState = 'end'
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

		const percent = document.querySelector('.percent')
		percent.style.width = '0%'

		document.querySelector('.pause-btn').textContent = 'Restart'

		if (points > bestScore) {
			// update best score
			bestScore = points
			localStorage.setItem('bestScore', bestScore)
			document.querySelector('.best-points .value').textContent = bestScore
			document.querySelector('.best').style.display = 'block'
		}
	}

	function restartGame () {
		gameState = 'restart'
		points = 0
		maxLife = 5000
		currentLife = maxLife
		current = speeds[0]

		if (keypressed !== '')
			square.classList.remove('s-' + keypressed)

		keypressed = ''

		container.querySelectorAll('.key').forEach(key => {
			key.classList.remove('key-up', 'key-down', 'key-left', 'key-right', 'hide')
			key.classList.add('idle')
		})

		const keySelectorContainer = document.querySelector('.key-selector-container')
		keySelectorContainer.classList.add('show')
		keySelectorContainer.classList.remove('hide')

		const results = document.querySelector('.results')
		results.classList.add('hide')
		results.classList.remove('show')

		setTimeout(() => {
			const pointsContainer = document.querySelector('.points-container')
			pointsContainer.classList.add('show')
			pointsContainer.classList.remove('hide')

			for (const i in scheduledSpawns) {
				const obj = scheduledSpawns[i]
				clearInterval(obj.interval)
			}
			scheduledSpawns = []
			pointContainers.forEach(pointContainer => pointContainer.textContent = points)

			const percent = document.querySelector('.percent')
			percent.style.width = '100%'
			percent.classList.remove('low', 'medium')

			setTimeout(() => {
				gameState = 'running'
				document.querySelector('.pause-btn').textContent = 'Pause'
				scheduleSpawn(1)
			}, 950)
		}, 1000)
	}

	document.body.onblur = () => {
		if (gameState === 'running')
			// auto pause
			document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 32 /* space */ }))
	}

	document.onkeydown = e => {

		if (e.keyCode === 32) {
			e.preventDefault()
			if (gameState === 'running' || gameState === 'paused') {
				// space bar pressed

				gameState = gameState === 'running' ? 'paused' : 'running'
				document.querySelectorAll('.key').forEach(k => k.classList.toggle('paused', gameState === 'paused'))
				document.querySelector('.pause').classList.toggle('show', gameState === 'paused')

				if (gameState === 'paused')
					pauseScheduledSpawns()
				else if (gameState === 'running')
					resumeScheduledSpawns()

			} else if (gameState === 'end')
				restartGame()

		}

		if ((e.keyCode >= 37 && e.keyCode <= 40 || e.keyCode >= 72 && e.keyCode <= 76)
            && gameState !== 'paused' && gameState !== 'restart') {
			// arrow keys pressed

			e.preventDefault()
			if (gameState === false) {
				startGame()
				return false
			}

			if (keypressed !== '')
				square.classList.remove('s-' + keypressed)

			switch (e.keyCode) {
				case 37: // left
				case 72: // h
					keypressed = 'key-left'
					break

				case 38: // up
				case 75: // j
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
		}

	}

	function startGame () {
		gameState = 'running'

		document.querySelector('.points-container').classList.add('show')
		document.querySelector('.helper-container').classList.add('hide')
		setTimeout(() => {
			const keySelector = document.querySelector('.key-selector')
			keySelector.classList.add('show', 'fade')
			keySelector.onanimationend = () => keySelector.classList.remove('fade')
		}, 500)
		scheduleSpawn(1000)

		document.querySelector('.percent').style.width = '100%'
	}

	if (bestScore) {
		document.querySelector('.best-points .value').textContent = bestScore
		document.querySelector('.best').style.display = 'block'
	}


	function addMobileListener (selector, /* @deprecated */ keyCode) {
		const keyElem = mobileControls.querySelector(selector)
		addMultipleEventListener(keyElem, [ 'touchstart', 'click' ], () => {
			document.dispatchEvent(new KeyboardEvent('keydown', { keyCode }))
		})
	}

	addMobileListener('.key-left', 37)
	addMobileListener('.key-up', 38)
	addMobileListener('.key-right', 39)
	addMobileListener('.key-down', 40)

	addMultipleEventListener(mobileControls.querySelector('.pause-btn'), [ 'click', 'touchstart' ], e => {
		e.preventDefault()
		document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 32 /* space */ }))
	})
})
