var packager = require('electron-packager')
packager({
    arch: all,
    platform: all,
    out: "./.bin",
    overwrite: true
}, function done (err, appPath) { });