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
        max_life = 10000,
        current_life = max_life;


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

    function randomKey() {

        if (started === 'end') {
            return;
        }

        var arr = ['up', 'left', 'down', 'right'];
        var $elem = $('<div class="key key-'+arr[Math.floor(Math.random()*arr.length)]+'"></div>');
        $elem.on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {

            // incremental speed
            var curr_step = (100 - (max-speed)*100/(max-min)) * step / 100;
            //console.log(curr_step+"     "+"("+max+"-"+speed+")*100/("+max+"-"+min+")");

            difficulty = (max-speed)/step;
            if ($(this).hasClass(keypressed)) {
                speed -= curr_step;
                current_life += 200;
                if (current_life > max_life) {
                    current_life = max_life;
                }
                updatePoints(difficulty);
            } else {
                speed += curr_step;
                current_life -= 1000;
                $square
                    .addClass('bad')
                    .on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
                    $square.removeClass('bad');
                })
            }

            if (speed < min) {
                speed = min;
            } else if (speed > max) {
                speed = max;
            }
            //$('#speed').html(speed);


            console.log("Interval;; current_life = "+current_life);
            var percent = current_life*100/max_life;
            var $elem = $('.percent');
            $elem.css('width', percent+'%');

            if (percent < 20) {
                $elem.addClass('low');
            } else if (percent < 60) {
                $elem.addClass('medium').removeClass('low');
            } else {
                $elem.removeClass('low medium');
            }

            if (current_life <= 0 && started === true) {
                started = 'end';
                $(".key").addClass("hide");
                $('.key-selector-container').addClass("hide");
                $('.results').addClass('show');
                $('.points-container').addClass('hide');
            }

            $(this).remove();
        });

        $container.append($elem);
        setTimeout(randomKey, speed);
    }

    $(document).keydown(function(e) {

        if (e.keyCode >= 37 && e.keyCode <= 40) {
            e.preventDefault();
            if (started === false) {
                started = true;

                $(".helper-container").addClass("hide");
                setTimeout(function() {
                    $(".key-selector")
                        .addClass("show fade")
                        .on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
                            $(this).removeClass("fade");
                        });
                }, 500);
                setTimeout(function() {
                    randomKey();
                }, 1000);

                $('.percent').css('width', '100%');
                //var timeInterval = setInterval(function() {
                //    console.log("Interval;; current_life = "+current_life);
                //    var percent = current_life*100/max_life;
                //    var $elem = $('.percent');
                //    $elem.css('width', percent+'%');
                //
                //    if (percent < 20) {
                //        $elem.addClass('low');
                //    } else if (percent < 60) {
                //        $elem.addClass('medium');
                //    }
                //
                //    if (current_life <= 0) {
                //        console.log("DONE WITH "+points);
                //        clearInterval(timeInterval);
                //    }
                //}, 1000);

                return false;
            }
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
        if (keypressed !== '') {
            $square.addClass('s-'+keypressed);
        }
    });

});