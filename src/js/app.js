'use strict';

$(function() {
    var points = 0;
    var $pointContainer = $('.points');
    var keypressed = 'key-';
    var $container = $('.container');
    var $square = $('.key-selector');
    // array of objects: {score, speed, message, points}
    var speeds = [
        {score: 0, speed: 800, message: '', points: 1},
        {score: 5, speed: 750, message: 'You\'ve got it!', points: 2},
        {score: 20, speed: 695, message: 'Keep going!', points: 5},
        {score: 70, speed: 630, message: 'You\'re doing great!', points: 7},
        {score: 150, speed: 570, message: 'You rock!', points: 10},
        {score: 300, speed: 520, message: 'Don\'t stop!', points: 12},
        {score: 500, speed: 490, message: 'Tricky!', points: 15},
        {score: 760, speed: 470, message: 'Great!', points: 17},
        {score: 1100, speed: 455, message: 'I like your style!', points: 20},
        {score: 1500, speed: 420, message: 'Awesome!', points: 22},
        {score: 2000, speed: 400, message: 'Yeah!!', points: 25},
        {score: 2700, speed: 385, message: 'How do you do that?', points: 27},
        {score: 3500, speed: 370, message: '...how?', points: 30},
        {score: 4300, speed: 360, message: 'Don\'t ever stop!!', points: 32},
        {score: 5500, speed: 350, message: 'I\'m really impressed.', points: 35},
        {score: 7000, speed: 340, message: 'Arrow hero!', points: 40},
        {score: 10000, speed: 330, message: 'You\'re really still here?', points: 40},
        {score: 10500, speed: 320, message: 'That\'s impressive!', points: 40}
    ];
    var current = speeds[0];
    var difficulty = 1;
    var started = false;
    var maxLife = 5000;
    var currentLife = maxLife;
    // array of objects: {delay, started, interval}
    var scheduledSpawns = [];

    function updatePoints(pts) {
        if (pts < 1) {
            pts = 1;
        }
        pts = Math.floor(pts);
        points += pts;
        $square.addClass('bump');
        $pointContainer
            .html(points)
            .addClass('bump')
            .on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
                $pointContainer.removeClass('bump');
                $square.removeClass('bump');
            })
        ;
        var $ding = $('<div class="ding">+'+pts+'</div>');
        $ding.on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
            $(this).remove();
        });
        $square.append($ding);
    }

    function updateSpeed() {
        var oldSpeed = current;
        for (var i in speeds) {
            var _speed = speeds[i];
            if (points >= _speed.score) {
                current = _speed;
            } else if (points < _speed.score) {
                break;
            }
        }
        if (current.speed !== oldSpeed.speed) {
            // Speed changed !
            $('.level-message')
                .text(current.message)
                .addClass('show')
                .on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
                    $(this).removeClass('show');
                });
        }
    }

    function spawnRandomKey(obj) {
        if (started !== 'paused') { // running or ended
            removeScheduledSpawn(obj);
        }

        if (started === 'end' || started === 'paused' || started === 'restart') {
            return;
        }

        var arr = ['up', 'left', 'down', 'right'];
        var $elem = $('<div class="key key-'+arr[Math.floor(Math.random()*arr.length)]+'"></div>');
        $elem.on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {

            if (started === 'end' || started === 'restart') {
                return;
            }

            if ($(this).hasClass(keypressed) || 1) {
                currentLife += 200;
                if (currentLife > maxLife) {
                    currentLife = maxLife;
                }
                updatePoints(current.points);
            } else {
                currentLife -= 1000;
                $square
                    .addClass('bad')
                    .on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
                        $square.removeClass('bad');
                    });
            }

            updateSpeed();

            var percent = currentLife*100/maxLife;
            var $elem = $('.percent');
            $elem.css('width', percent+'%');

            if (percent < 20) {
                $elem.addClass('low');
            } else if (percent < 60) {
                $elem.addClass('medium').removeClass('low');
            } else {
                $elem.removeClass('low medium');
            }

            if (currentLife <= 0 && started === 'running') {
                endGame();
            }

            $(this).remove();
        });

        $container.append($elem);
        // Spawn next key
        scheduleSpawn(current.speed);
    }

    function scheduleSpawn(delay) {
        var now = new Date();
        var obj = {
            'delay': delay,
            'started': now.getTime()
        };
        obj.interval = setTimeout(spawnRandomKey, delay, obj);
        scheduledSpawns.push(obj);
    }

    function removeScheduledSpawn(obj) {
        var index = scheduledSpawns.indexOf(obj);
        if (index > -1) {
            scheduledSpawns.splice(index, 1);
        }
    }

    function pauseScheduledSpawns() {
        var now = new Date();
        for (var i in scheduledSpawns) {
            var obj = scheduledSpawns[i];
            obj.delay -= now.getTime() - obj.started;
            obj.started = null;
            clearInterval(obj.interval);
        }
    }

    function resumeScheduledSpawns() {
        var now = new Date();
        for (var i in scheduledSpawns) {
            var obj = scheduledSpawns[i];
            obj.started = now.getTime();
            obj.interval = setTimeout(spawnRandomKey, obj.delay, obj);
        }
    }

    function endGame () {
        started = 'end';
        $('.key').addClass('hide');
        $('.key-selector-container').addClass('hide').removeClass('show');
        $('.results').addClass('show').removeClass('hide');
        $('.points-container').addClass('hide').removeClass('show');
    }

    function restartGame() {
        started = 'restart';
        points = 0;
        maxLife = 5000;
        currentLife = maxLife;
        current = speeds[0];
        difficulty = 1;
        keypressed = '';

        $('.key-selector-container').addClass('show').removeClass('hide');
        $('.results').addClass('hide').removeClass('show');
        $('.points-container').addClass('show').removeClass('hide');

        setTimeout(function() {
            for (var i in scheduledSpawns) {
                var obj = scheduledSpawns[i];
                clearInterval(obj.interval);
            }
            scheduledSpawns = [];
            $pointContainer.html(points);
            $('.percent').css('width', '100%').removeClass('low medium');
            setTimeout(function() {
                started = 'running';
                $('.key').addClass('remove');
                scheduleSpawn(1);
            }, 950);
        }, 1000);
    }

    $(document).keydown(function(e) {

        if (e.keyCode === 32) {
            if (started === 'running' || started === 'paused') {
                // space bar pressed

                started = (started === 'running' ? 'paused' : 'running');
                $('.key').toggleClass('paused', started === 'paused');

                if (started === 'paused') {
                    pauseScheduledSpawns();
                } else if (started === 'running') {
                    resumeScheduledSpawns();
                }
            } else if (started === 'end') {
                restartGame();
            }
        }

        if (e.keyCode >= 37 && e.keyCode <= 40 && started !== 'paused' && started !== 'restart') {
            // arrow keys pressed

            e.preventDefault();
            if (started === false) {
                startGame();
                return false;
            }

            if (keypressed !== '') {
                $square.removeClass('s-'+keypressed);
            }
            switch (e.keyCode) {
                case 37:
                    keypressed = 'key-left';
                    break;

                case 38:
                    keypressed = 'key-up';
                    break;

                case 39:
                    keypressed = 'key-right';
                    break;

                case 40:
                    keypressed = 'key-down';
                    break;
            }
            $square.addClass('s-'+keypressed);
        }

    });

    function startGame() {
        started = 'running';

        $('.helper-container').addClass('hide');
        setTimeout(function() {
            $('.key-selector')
                .addClass('show fade')
                .on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
                    $(this).removeClass('fade');
                });
        }, 500);
        scheduleSpawn(1000);

        $('.percent').css('width', '100%');
    }

});