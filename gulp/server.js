'use strict';

let gulp = require('gulp'),
  $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'pm2']
  }),
  environment = require('./lib/environment.js');

gulp.task('serve', 'Launch the server on development mode, autoreloads it when there are code changes', ['build'], () => {

  var nodemonConfiguration = {
    script: './dist/app.js',
    watch: './dist',
    ext: 'jade js',
    ignore: ["dist/"],
    env: {
      'NODE_ENV': 'development'
    }
  };


  $.nodemon(nodemonConfiguration)
    //.on('change', ['lint'])
    .on('restart', function () {
      console.log('restarted!')
    });

});

gulp.task('serveCluster', 'Launches clusterized server (for production). CURRENTLY FAILING, use serverCluser.sh bash CLI', ['build'], () => {
  $.pm2.connect(() => {
    $.pm2.start({
      script: './dist/server.js',                                     // Script to be run
      exec_mode: environment.get('exec_mode', 'cluster'),                // Allow your app to be clustered
      instances: environment.get('instances', 4),                        // Optional: Scale your app by 4
      max_memory_restart: environment.get('max_memory_restart', '100M'),  // Optional: Restart your app if it reaches 100Mo
    }, (err, apps) => {
      $.pm2.disconnect();
    });
  });

}, {
    options: {
      'exec_mode': 'PM2 exec mode',
      'instances': 'PM2 # instances in cluster',
      'max_memory_restart': 'PM2 Restart your app if it reaches this'
    }
  });
