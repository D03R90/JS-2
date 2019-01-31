let gulp = require('gulp'), // Сам галп
    sass = require('gulp-sass'), // компиляция sass
    uglifyJs = require('gulp-uglifyes'), // минификация js
    autoprefixer = require('gulp-autoprefixer'), // Вендорные префиксы
    concat = require('gulp-concat'), // Конкатенация
    bs = require('browser-sync'), // Сервер
    htmlMin = require('gulp-htmlmin'), // Минификация html
    rename = require('gulp-rename'), // Переименование
    delFiles = require('del'), // Удаление файлов
    cssMinify = require('gulp-csso'), // Минификация css
    babel = require('gulp-babel'), // Babel
    pug = require('gulp-pug'); // Pug

// Методы gulp
// gulp.task() - создание новой задачи
// gulp.src() - выбор файлов
// gulp.dest() - сохранение файла
// gulp.parallel() - паралельное выполнение задач
// gulp.series() - последовательное выполнение задач
// gulp.watch() - следит за изменениями в файлах

//Просто тест
gulp.task('test', () => {
    return console.log('Gulp works');
});

// Компилируем html
gulp.task('html', () => {
    return gulp.src('app/html/index.html') // Выбрали файл
        .pipe(htmlMin({collapseWhitespace: true})) //Выполнили минификацию
        .pipe(gulp.dest('dist')); //Сохранили
});

// Компилируем pug
gulp.task('pug', () => {
   return gulp.src('app/pug/*.pug') //Выбрали файлы pug
       .pipe(pug({
           pretty: true   // Хотим получить не минифицированные файлы
       }))
       .pipe(gulp.dest('dist/templates')) //Сохранили
});

// Компилируем стили
gulp.task('sass', () => {
    // return gulp.src('app/sass/**/*.+(scss|sass)')
    // return gulp.src('app/img/**/*.+(png|jpg|gif|svg)')
    return gulp.src('app/sass/**/*.scss') // Выбрали файлы scss
        .pipe(sass()) // Скомпилировали
        .pipe(autoprefixer()) //Добавили вендорные префиксы
        .pipe(cssMinify()) //Выполнили минификацию
        .pipe(gulp.dest('dist/css')); //Сохранили
});

// Эта задача очищает папку перед новой компиляцией
gulp.task('clean', () => {
   return delFiles(['dist/**', '!dist']); //Удаляем файлы
});

// Работаем с es6
gulp.task('js:es6', () => {
    return gulp.src('app/js/**/*.js') // Выбрали файлы js
        .pipe(gulp.dest('dist/js')) // Сохранили их в проект без изменений
        .pipe(uglifyJs()) // Минифицировали
        .pipe(rename({suffix: '.min'})) // Для минифицированных поменяли название
        .pipe(gulp.dest('dist/js')); //Сохранили
});

//Компилируем в es5
gulp.task('babel', () => {
    return gulp.src('app/js/**/*.js') // Выбрали
        .pipe(babel({
            presets: ['@babel/env'] // Скомпилировали
        }))
        .pipe(rename({suffix: '.es5'})) // Переименовали скомпилированный файл
        .pipe(gulp.dest('dist/js')); //Сохранили
});

// Запускаем сервер
gulp.task('server', () => {
   return bs({          // Плагин запускает сервер
       browser: 'google chrome canary', // Какой браузер использовать? (не обязательно)
       server: {
           baseDir: 'dist' // Из какой директории запускать сервер? (обязательно)
       }
   })
});

// Следим за файлами scss (для всех других по образу можно написать)
gulp.task('sass:watch', () => {
   return gulp.watch('app/sass/**/*.scss', // Выбираем файлы за которыми следим
                    gulp.series('sass', // Как только произошли изменения - перекомпилируем
                                (done) => { // выполняем для перезагрузки страницы
                                   bs.reload();
                                   done();
                                }));
});

// Базовая задача
gulp.task('default', gulp.series('clean', gulp.parallel('html', 'pug', 'sass', 'js:es6', 'babel', 'server', 'sass:watch')));