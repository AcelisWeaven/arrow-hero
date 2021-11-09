'use strict'

import $ from 'jquery'

$(() => {
	let points = 0
	const $pointContainer = $('.points')
	let keypressed = 'key-'
	const $container = $('.keys-container')
	const $square = $('.key-selector')
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
			message: 'You\'ve got it!',
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
			message: 'You\'re doing great!',
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
			message: 'Don\'t stop!',
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
			message: 'That\'s incredible!',
			points: 40,
			keys: 4,
		},
	]
	let current = speeds[0]
	let started = false
	let maxLife = 5000
	let currentLife = maxLife
	// array of objects: {delay, started, interval}
	let scheduledSpawns = []
	let bestScore = localStorage.getItem('bestScore')
	const $mobileControls = $('.mobile-controls')
	const $body = $('body')


	// Migration from sessionStorage to localStorage
	const sessionStorageScore = sessionStorage.getItem('bestScore')
	if (sessionStorageScore) {
		localStorage.setItem('bestScore', sessionStorageScore)
		bestScore = sessionStorageScore
	}

	function updatePoints (pts) {
		if (pts < 1)
			pts = 1

		pts = Math.floor(pts)
		points += pts
		$square.addClass('bump')
		$pointContainer
			.html(points)
			.addClass('bump')
			.on('webkitAnimationEnd oanimationend msAnimationEnd animationend', () => {
				$pointContainer.removeClass('bump')
				$square.removeClass('bump')
			})

		const $ding = $('<div class="ding">+' + pts + '</div>')
		$ding.on('webkitAnimationEnd oanimationend msAnimationEnd animationend',
			/* @this HTMLElement */ function () {
				$(this).remove()
			})
		$square.append($ding)
	}

	function updateSpeed () {
		const oldSpeed = current
		for (const i in speeds) {
			const _speed = speeds[i]
			if (points >= _speed.score)
				current = _speed
			else if (points < _speed.score)
				break

		}
		if (current.speed !== oldSpeed.speed)
		// Speed changed !
			$('.level-message')
				.text(current.message)
				.addClass('show')
				.on('webkitAnimationEnd oanimationend msAnimationEnd animationend', /* @this HTMLElement */ function () {
					$(this).removeClass('show')
				})

	}

	function spawnRandomKey (obj) {
		if (started !== 'paused') // running or ended
			removeScheduledSpawn(obj)


		if (started === 'end' || started === 'paused' || started === 'restart')
			return


		const arr = [ 'key-right', 'key-left', 'key-down', 'key-up' ]
		const direction = arr[Math.floor(Math.random() * current.keys)]
		let $elem = $container.find('.idle').first()
		if ($elem.length <= 0) {
			$elem = $('<div class="key ' + direction + '"></div>')
			$elem.on('webkitAnimationEnd oanimationend msAnimationEnd animationend', /* @this HTMLElement */ function () {

				if (started === 'end' || started === 'restart' || $(this).hasClass('idle'))
					return


				if ($(this).hasClass(keypressed)) {
					currentLife += 200
					if (currentLife > maxLife)
						currentLife = maxLife

					updatePoints(current.points)
				} else {
					currentLife -= 1000
					$square
						.addClass('bad')
						.on('webkitAnimationEnd oanimationend msAnimationEnd animationend', () => {
							$square.removeClass('bad')
						})
				}

				updateSpeed()

				const percent = currentLife * 100 / maxLife
				const $elem = $('.percent')
				$elem.css('width', percent + '%')

				if (percent < 20)
					$elem.addClass('low')
				else if (percent < 60)
					$elem.addClass('medium').removeClass('low')
				else
					$elem.removeClass('low medium')


				if (currentLife <= 0 && started === 'running')
					endGame()


				$(this).removeClass('key-up key-down key-left key-right')
					.addClass('idle')
			})
			$container.append($elem)
		} else
			$elem.removeClass('idle').addClass(direction)


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
		started = 'end'
		$('.key').addClass('hide')
		$('.key-selector-container').addClass('hide')
			.removeClass('show')
		$('.results').addClass('show')
			.removeClass('hide')
		$('.points-container').addClass('hide')
			.removeClass('show')
		$('.pause-btn').text('Restart')

		if (points > bestScore) {
			// update best score
			bestScore = points
			sessionStorage.setItem('bestScore', bestScore)
			$('.best-points .value').text(bestScore)
			$('.best').fadeIn()
		}
	}

	function restartGame () {
		started = 'restart'
		points = 0
		maxLife = 5000
		currentLife = maxLife
		current = speeds[0]

		if (keypressed !== '')
			$square.removeClass('s-' + keypressed)

		keypressed = ''

		$container.find('.key').removeClass('key-up key-down key-left key-right hide')
			.addClass('idle')
		$('.key-selector-container').addClass('show')
			.removeClass('hide')
		$('.results').addClass('hide')
			.removeClass('show')
		$('.points-container').addClass('show')
			.removeClass('hide')

		setTimeout(() => {
			for (const i in scheduledSpawns) {
				const obj = scheduledSpawns[i]
				clearInterval(obj.interval)
			}
			scheduledSpawns = []
			$pointContainer.html(points)
			$('.percent').css('width', '100%')
				.removeClass('low medium')
			setTimeout(() => {
				started = 'running'
				$('.key').addClass('remove')
				$('.pause-btn').text('Pause')
				scheduleSpawn(1)
			}, 950)
		}, 1000)
	}

	$(document).keydown(e => {

		if (e.keyCode === 32) {
			e.preventDefault()
			if (started === 'running' || started === 'paused') {
				// space bar pressed

				started = started === 'running' ? 'paused' : 'running'
				$('.key').toggleClass('paused', started === 'paused')
				$('.pause').toggleClass('show', started === 'paused')

				if (started === 'paused')
					pauseScheduledSpawns()
				else if (started === 'running')
					resumeScheduledSpawns()

			} else if (started === 'end')
				restartGame()

		}

		if ((e.keyCode >= 37 && e.keyCode <= 40 || e.keyCode >= 72 && e.keyCode <= 76)
            && started !== 'paused' && started !== 'restart') {
			// arrow keys pressed

			e.preventDefault()
			if (started === false) {
				startGame()
				return false
			}

			if (keypressed !== '')
				$square.removeClass('s-' + keypressed)

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
			$square.addClass('s-' + keypressed)
		}

	})

	function startGame () {
		started = 'running'

		$('.points-container').addClass('show')
		$('.helper-container').addClass('hide')
		setTimeout(() => {
			$('.key-selector')
				.addClass('show fade')
				.on('webkitAnimationEnd oanimationend msAnimationEnd animationend', /* @this HTMLElement */ function () {
					$(this).removeClass('fade')
				})
		}, 500)
		scheduleSpawn(1000)

		$('.percent').css('width', '100%')
	}

	if (bestScore) {
		$('.best-points .value').text(bestScore)
		$('.best').fadeIn()
	}

	$mobileControls.find('.key-up, .key-down, .key-left, .key-right').on('touchstart click', /* @this HTMLElement */ function () {
		const _class = $(this).attr('class')
		const e = $.Event('keydown')

		switch (_class) {
			case 'key-left':
				e.keyCode = 37
				break

			case 'key-up':
				e.keyCode = 38
				break

			case 'key-right':
				e.keyCode = 39
				break

			case 'key-down':
				e.keyCode = 40
				break
		}

		$(document).trigger(e)
	})
	$mobileControls.find('.pause-btn').on('touchstart', () => {
		const e = $.Event('keydown')
		e.keyCode = 32
		$(document).trigger(e)
	})

	$body.toggleClass('colorblind', localStorage.getItem('colorblind') === 'yes')
	$('.colorblind-btn').on('click touchstart', () => {
		$body.toggleClass('colorblind', !$body.hasClass('colorblind'))
		localStorage.setItem('colorblind', $body.hasClass('colorblind') ? 'yes' : 'no')
	})
})
