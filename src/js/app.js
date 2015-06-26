'use strict';

$(function() {
    var points = 0,
        $pointContainer = $('.points'),
        keypressed = 'key-',
        $container = $('.container'),
        $square = $('.key-selector'),
        min = 350,
        max = 800,
        step = 8,
        speed = max,
        difficulty = 1,
        started = false,
        maxLife = 5000,
        currentLife = maxLife,
        scheduledSpawns = [] // array of objects: {delay, started, interval}
        ;


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

            console.log("coucou");

            // incremental speed
            var currStep = (100 - (max-speed)*100/(max-min)) * step / 100;
            //console.log(currStep+"     "+"("+max+"-"+speed+")*100/("+max+"-"+min+")");

            difficulty = (max-speed)/step;
            if ($(this).hasClass(keypressed)) {
                speed -= currStep;
                currentLife += 200;
                if (currentLife > maxLife) {
                    currentLife = maxLife;
                }
                updatePoints(difficulty);
            } else {
                speed += currStep;
                currentLife -= 1000;
                $square
                    .addClass('bad')
                    .on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
                        $square.removeClass('bad');
                    });
            }

            if (speed < min) {
                speed = min;
            } else if (speed > max) {
                speed = max;
            }

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
        scheduleSpawn(speed);
    }

    function scheduleSpawn(delay) {
        var now = new Date();
        var obj = {
            'delay': delay,
            'started': now.getTime()
        };
        console.log("Started: "+now.getTime());
        obj.interval = setTimeout(spawnRandomKey, delay, obj);
        scheduledSpawns.push(obj);
    }

    function removeScheduledSpawn(obj) {
        var index = scheduledSpawns.indexOf(obj);
        if (index > -1)
            scheduledSpawns.splice(index, 1);
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
        console.log('restart');
        points = 0;
        maxLife = 5000;
        currentLife = maxLife;
        speed = max;
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
            if (started === 'running' || started === 'paused') { // space bar pressed
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

        if (e.keyCode >= 37 && e.keyCode <= 40 && started !== 'paused' && started !== 'restart') { // arrow keys pressed
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