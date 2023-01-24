const {src, dest, series, watch} = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin')
const autoprefixes = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const ulglify = require('gulp-uglify-es').default
const babel = require('gulp-babel')
const svgSprite = require('gulp-svg-sprite');
const  notify  = require('gulp-notify');
const imgmin = require('gulp-image')
const browserSync = require('browser-sync').create()//becase thats the rules of browser sync
const  srcmaps  = require('gulp-sourcemaps');
const del = require('del')// deltes the unnused files




const styles = (done) => {
    src('src/css/**/*.css')//get all ending with css in styles
    .pipe(srcmaps.init())
    .pipe(concat('main.css'))//in main css
    .pipe(autoprefixes({
        cascade: false
    }))
    .pipe(cleanCSS({
        level: 2
    }))
    .pipe(srcmaps.write())
    .pipe(dest('dist'))//in dist folder
    .pipe(browserSync.stream())
    done();
}
const scripts = () =>{
    return src([
        'src/**/*.js',
        
    ])
    .pipe(srcmaps.init())
 
    
    .pipe(ulglify().on('error',notify.onError()))
    .pipe(srcmaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}
const imgsmin = () => {
    return src([
        'src/imgs/**/*.jpg',
        'src/imgs/*.svg',
        'src/imgs/**/*.webp',
        'src/imgs/**/*.png',
])
    .pipe(imgmin())
    .pipe(dest('dist/imgs'))
}
const svgSprties = () => {
    return src('src/imgs/svg/**/*.svg')
    .pipe(svgSprite({
       mode: {
           stack: {
               sprite: '../sprite.svg'
           }
       } 
    }))
    .pipe(dest('dist/imgs'))
}
const htmlMinify = () => {
    return src('src/**/*.html')//get all html in src
    .pipe(htmlMin({
        collapseWhitespace:true,
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}
const resources = () => {
    return src('src/libs/**')
    .pipe(dest('dist/libs'))
}
// [] for multiple lines





const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
}
watch('src/**/*.html',htmlMinify)
watch('src/css/**/*.css', styles)
watch('src/imgs/svg/**/*.svg',svgSprties)
watch('src/**/*.js',scripts)
watch('src/libs/**',resources)

exports.styles = styles;
exports.scripts = scripts;
exports.htmlMinify = htmlMinify;//so you can call them отделно
//order is important!
exports.default = series(resources,htmlMinify,scripts, styles,imgsmin, svgSprties, watchFiles);