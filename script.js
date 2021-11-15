var mm = 25
var ss = 0

// 1 sec interval (1000ms) that will be used in the setInterval
var time = 1000
var cron

// Create a variable with the treated value HH:MM:SS
var format = (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss)

// setting the counter with the formatted value
document.getElementById('counter').innerText = format

// Start Timer
function start() {
    cron = setInterval(() => { timer() }, time)

    changeBtn()
}

// Stop Timer but don´t clean variables
function pause() {
    clearInterval(cron)
    changeBtn()
}

// Stop Timer and clean variables
function stop() {
    clearInterval(cron)
    hh = 0
    mm = 0
    ss = 0

    // clean timer
    document.getElementById('counter').innerText = '00:00'

    changeBtn()
}

// variables that determine the flow of the pomodoro (4 times of 25 min alternating with 3 breaks of 5 min and finally a break of 15 min)
var countPomodoro = 0
var countShortBreak = 0

function timer() {

    const option = document.getElementById('options')
    const valueOption = option.getAttribute("option")


    if (ss == 0) {
        mm--
        ss = 60
    }

    ss--

    if (mm == 0 && ss == 0) {
        pause()

        if ( valueOption == 'pomodoro') {
            if (countPomodoro == 3) {
                longBreak()
                option.setAttribute('option', 'long-break')
                countPomodoro = 0
            } else {
                shortBreak()
                option.setAttribute('option', 'short-break')
                countPomodoro++
            }

            console.log(countPomodoro);
        } else if (valueOption == 'short-break') {
            pomodoro()
            option.setAttribute('option', 'pomodoro')
        } else if (valueOption == 'long-break') {
            pomodoro()
            option.setAttribute('option', 'pomodoro')
        }

    }
    
    showTime()
}

// This function will show the formatted value of the timer
function showTime() {
    var format = (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss)

    // Insert the treated value into the counter element
    document.getElementById('counter').innerText = format

    const title = document.getElementsByTagName('title')[0]
    const container = document.getElementById('container')
    var icon = document.getElementById('icon')

    // This condition will display the timer in the title of the page
    if (container.classList.contains('container-pomodoro')) {
        title.innerText = `${format} - Time to focus!`
        icon.setAttribute('href', 'images/icon-pomodoro.png')
    } else if (container.classList.contains('container-short-break')){
        title.innerText = `${format} - Time for a break!`
        icon.setAttribute('href', 'images/icon-short-break.png')
    } else if (container.classList.contains('container-long-break')){
        title.innerText = `${format} - Time for a break!`
        icon.setAttribute('href', 'images/icon-long-break.png')
    }
    
    console.log(icon);
    
    // Return treated value
    return format
}

// This function will change the button according to the selected option
function changeBtn() {
    
    // Returning HTML elements to change the button according to the selected option
    divButton = document.querySelector('.button')
    button = document.getElementById('btn')
    body = document.getElementById('body')
    
    // Will store the selected option (Pomodoro, short-break, long-break)
    var option

    // At every click on the button the stop class will be added or removed
    button.classList.toggle('stop')

    // if the stop class is activated the button adopts the style according to the selected option with the text 'STOP'
    // if the stop class is disabled the button adopts the style according to the selected option with the text 'START'
    if (button.classList.contains('stop')) { 
        
        if (button.classList.contains('text-pomodoro')) {
            option = 'text-pomodoro'
        } else if (button.classList.contains('text-short-break')) {
            option = 'text-short-break'
        } else if (button.classList.contains('text-long-break')) {
            option = 'text-long-break'
        }

        divButton.innerHTML = `<button onclick="pause()" id="btn" class="stop ${option}">STOP</button>`

    } else {
        if (button.classList.contains('text-pomodoro')) {
            option = 'text-pomodoro'
        } else if (button.classList.contains('text-short-break')) {
            option = 'text-short-break'
        } else if (button.classList.contains('text-long-break')) {
            option = 'text-long-break'
        }

        divButton.innerHTML = `<button onclick="start()" id="btn" class="${option}">START</button>`
    }
}

// if the user is using the pomodoro timer this function will format the timer container according to this option
function pomodoro() {
    body = document.getElementById('body')
    container = document.getElementById('container')
    button = document.getElementById('btn')

    buttonPomodoro = document.querySelector('.btn-pomodoro')
    buttonShortBreak = document.querySelector('.btn-short-break')
    buttonLongBreak = document.querySelector('.btn-long-break')

    divButton = document.querySelector('.button')

    body.classList.add('body-pomodoro')
    container.classList.add('container-pomodoro')

    body.classList.remove('body-short-break')
    container.classList.remove('container-short-break')

    body.classList.remove('body-long-break')
    container.classList.remove('container-long-break')

    pause()
    mm = 25
    ss = 0
    showTime()

    divButton.innerHTML = '<button onclick="start()" id="btn" class="text-pomodoro">START</button>'
    
    buttonPomodoro.classList.add('selected')
    
    if (buttonShortBreak.classList.contains('selected')) {
        buttonShortBreak.classList.remove('selected')
    }

    if (buttonLongBreak.classList.contains('selected')) {
        buttonLongBreak.classList.remove('selected')
    }
    
}

// if the user is using the short break timer this function will format the timer container according to this option
function shortBreak() {
    body = document.getElementById('body')
    container = document.getElementById('container')
    button = document.getElementById('btn')

    buttonPomodoro = document.querySelector('.btn-pomodoro')
    buttonShortBreak = document.querySelector('.btn-short-break')
    buttonLongBreak = document.querySelector('.btn-long-break')

    divButton = document.querySelector('.button')

    body.classList.add('body-short-break')
    container.classList.add('container-short-break')

    body.classList.remove('body-pomodoro')
    container.classList.remove('container-pomodoro')

    body.classList.remove('body-long-break')
    container.classList.remove('container-long-break')

    pause()
    mm = 5
    ss = 0
    showTime()

    divButton.innerHTML = '<button onclick="start()" id="btn" class="text-short-break">START</button>'
    
    buttonShortBreak.classList.add('selected')

    if (buttonPomodoro.classList.contains('selected')) {
        buttonPomodoro.classList.remove('selected')
    }

    if (buttonLongBreak.classList.contains('selected')) {
        buttonLongBreak.classList.remove('selected')
    }
}

// if the user is using the long break timer this function will format the timer container according to this option
function longBreak() {
    body = document.getElementById('body')
    container = document.getElementById('container')
    button = document.getElementById('btn')
    divButton = document.querySelector('.button')

    body.classList.add('body-long-break')
    container.classList.add('container-long-break')

    body.classList.remove('body-short-break')
    container.classList.remove('container-short-break')

    body.classList.remove('body-pomodoro')
    container.classList.remove('container-pomodoro')

    pause()
    mm = 15
    ss = 0
    showTime()

    divButton.innerHTML = '<button onclick="start()" id="btn" class="text-long-break">START</button>'
    button.classList.toggle('text-long-break')

    buttonLongBreak.classList.add('selected')

    if (buttonPomodoro.classList.contains('selected')) {
        buttonPomodoro.classList.remove('selected')
    }

    if (buttonShortBreak.classList.contains('selected')) {
        buttonShortBreak.classList.remove('selected')
    }
}

// This function leaves the option selected according to what the user is using
function optionSelected() {
    buttonPomodoro = document.querySelector('.btn-pomodoro')
    buttonShortBreak = document.querySelector('.btn-short-break')
    buttonLongBreak = document.querySelector('.btn-long-break')

    if (buttonPomodoro.classList.contains('selected')) {
        buttonPomodoro.classList.remove('selected')
    }
}