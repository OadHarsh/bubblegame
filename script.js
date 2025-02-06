var bubble = "";
function bubble_making() {
    // Reset the bubbles string each time a new set is created
    bubble = "";
    
    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
         [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }


    for (let i = 0; i < 30; i++) {
        let num = numbers[i % numbers.length];
        let randomColor = '#' + [1,1,1].map(() => (Math.floor(Math.random() * 186) + 70).toString(16).padStart(2, '0')).join('');
        bubble += `<div class="bubble" style="background-color:${randomColor}" onclick="check_bubble(${num})">${num}</div>`;
    }

    document.querySelector("#panel-bottom").innerHTML = bubble;
}

var hit_random = 0;
function hit_rn() {
    hit_random = Math.floor(Math.random() * 10);
    document.querySelector("#hit").textContent = hit_random;
}

// Initialize score
let score = 0;


// Check if the clicked bubble matches hit_random
function check_bubble(val) {
    if (val === hit_random) {
        score += 10; // Increase score by 10
        document.querySelector("#score").textContent = score; // Update the score on the screen
        hit_rn(); // Generate a new random hit number
        bubble_making(); // Regenerate the bubbles
    }

    else{
        score = score - 5 ;
        document.querySelector("#score").textContent = score;
        hit_rn(); // Generate a new random hit number
        bubble_making(); // Regenerate the bubbles
    }
}

let timer = 60;
function runtime() {
    let timerx = setInterval(() => {
        if (timer > 0) {
            timer--;
            document.querySelector("#timer").textContent = timer;
        }
        else {
            clearInterval(timerx);
            document.querySelector("#panel-bottom").innerHTML =  `<div class="result-set"><div class="game-over">GAME OVER</div> 
                                                                  <div class="score-show">SCORE : ${score}</div></div>`
        }
    }, 1000);

    
}

//to prevent inspect & right click.
document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
});

document.onkeydown = function(e) {
    if (e.keyCode == 123) { // F12 key
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) { // Ctrl + Shift + I (DevTools)
        e.preventDefault();
    }
};



// Initialize game
hit_rn();
runtime();
bubble_making();
