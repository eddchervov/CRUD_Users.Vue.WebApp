/// <binding BeforeBuild='clean-all, min-all' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify");

var paths = {
    webroot: "./wwwroot/",
    noderoot: "./node_modules/"
};

// plugins js
paths.concatPluginJsDest = paths.webroot + "js/plugins/plugin.min.js";

paths.jqueryJs = paths.noderoot + "jquery/dist/jquery.min.js";
paths.momentJs = paths.noderoot + "moment/min/moment-with-locales.min.js";
paths.vueJs = paths.noderoot + "vue/dist/vue.min.js";
paths.bootstrapJs = paths.noderoot + "bootstrap/dist/js/bootstrap.min.js";
paths.bootboxJs = paths.noderoot + "bootbox/dist/bootbox.all.min.js";
paths.vuejsPaginateJs = paths.noderoot + "vuejs-paginate/dist/index.js";


gulp.task("plugin.min:js", function () {
    return gulp.src([
        paths.jqueryJs,
        paths.momentJs,
        paths.vueJs,
        paths.bootstrapJs,
        paths.bootboxJs,
        paths.vuejsPaginateJs
    ], { base: "." })
        .pipe(concat(paths.concatPluginJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

// plugins css
paths.concatPluginCssDest = paths.webroot + "css/plugin.min.css";

paths.bootstrapCss = paths.noderoot + "bootstrap/dist/css/bootstrap.css";
paths.fontAwesomeCss = paths.noderoot + "font-awesome/css/font-awesome.css";

gulp.task("plugin.min:css", function () {
    return gulp.src([
        paths.bootstrapCss,
        paths.fontAwesomeCss
    ])
        .pipe(concat(paths.concatPluginCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

// site js
paths.concatSiteJsDest = paths.webroot + "js/plugins/site.min.js";

paths.edloaderJs = paths.webroot + "js/plugins/ed-loader.js";
paths.edbootboxJs = paths.webroot + "js/plugins/ed-bootbox.js";
paths.vuePrototypeJs = paths.webroot + "js/vue/vue-prototype.js";

gulp.task("site.min:js", function () {
    return gulp.src([
        paths.edloaderJs,
        paths.edbootboxJs,
        paths.vuePrototypeJs
    ], { base: "." })
        .pipe(concat(paths.concatSiteJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

// site css
paths.concatSiteCssDest = paths.webroot + "css/site.min.css";

paths.siteCss = paths.webroot + "css/site.css";

gulp.task("site.min:css", function () {
    return gulp.src([
        paths.siteCss
    ])
        .pipe(concat(paths.concatSiteCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

// users js
paths.concatUsersGridJsDest = paths.webroot + "js/vue/user-grid/index.min.js";

paths.usersGridJs = paths.webroot + "js/vue/user-grid/index.js";
paths.cuOperationUserComponentJs = paths.webroot + "js/components/user-grid/cu-operation-user.js";
paths.viewUserLogComponentJs = paths.webroot + "js/components/user-grid/view-user-log.js";

gulp.task("users-grid.min:js", function () {
    return gulp.src([
        paths.usersGridJs,
        paths.cuOperationUserComponentJs,
        paths.viewUserLogComponentJs
    ], { base: "." })
        .pipe(concat(paths.concatUsersGridJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

// users css
paths.concatUsersCssDest = paths.webroot + "css/users.min.css";

paths.usersCss = paths.webroot + "css/users.css";

gulp.task("users.min:css", function () {
    return gulp.src([
        paths.usersCss
    ])
        .pipe(concat(paths.concatUsersCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

// fonts 
paths.fonts = paths.webroot + "fonts";

paths.fontAwesomeFonts = paths.noderoot + 'font-awesome/fonts/*';

gulp.task('fonts', function () {
    return gulp.src([
            paths.fontAwesomeFonts
        ])
        .pipe(gulp.dest(paths.fonts));
});


// build all
gulp.task("min-all", [
    "fonts",
    "plugin.min:js",
    "plugin.min:css",
    "site.min:js",
    "site.min:css",
    "users-grid.min:js",
    "users.min:css"
]);

// clean js
gulp.task("clean:js", [
    "fonts",
    "plugin.min:js", 
    "site.min:js",
    "users-grid.min:js"
]);

// clean css
gulp.task("clean:css", [
    "plugin.min:css", 
    "site.min:css",
    "users.min:css"
]);

// clean all
gulp.task("clean-all", [
    "clean:js", 
    "clean:css"
]);