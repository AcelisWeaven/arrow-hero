Arrow hero
===

A minimalist game where your goal is to match your inputs with an unstoppable continuous overwelming flow of arrows.

Setting up Gulp
---

First, clone this repository (you can fork it too):

    git clone git@github.com:AcelisWeaven/arrow-hero.git

Then, we need to install [Node](https://nodejs.org/) [dependencies](https://www.npmjs.com/):

    sudo npm install

[Bower](http://bower.io/) manages the front-end libraries dependencies. To install them:

    bower install

Finally, we have to generate the assets with [Gulp](http://gulpjs.com/):
    
    gulp

And that's it!

If you want to listen for changes on your Sass or Javascript files, you only have to do this:

    gulp watch

Deploy to Github pages
---

If you need to update your gh-pages branch quickly, you can do this:
    
    gulp deploy
    