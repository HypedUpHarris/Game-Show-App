const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
const lives = document.getElementsByTagName('img');
const button = document.getElementsByTagName('button');
const start = document.querySelector('.btn__reset');
const ul = document.querySelector('ul');
const phrases = [
'Superman',
'Batman',
'Green Lantern',
'Wonder Woman',
'Cyborg',
'Martain Manhunter',
'Aquaman',
'Flash'
];


let missed = 0;

start.addEventListener('click', () => {
    overlay.style.transform = "translateY(-100%)";
    grabPhrase();
});

//Gets a random array
const getRandomPhrasesArray = (arr) => {
    const randomPhraseIndex = Math.floor(Math.random() * arr.length);
    const phrase = arr[randomPhraseIndex];
    const splitPhrase = phrase.split("");
    return splitPhrase;
}
//Function that displays the array to board and adds class of letter
const addPhraseToDisplay = (arr) => {
    for (let i = 0; i < arr.length; i++){
        let li = document.createElement('li');
        li.textContent = arr[i];
        ul.appendChild(li);
        if(arr[i] === " "){
            li.classList.add("space");
        }else {
            li.classList.add("letter");
        }
    }
}


function checkLetter(btn){
    const phraseLetters = document.querySelectorAll('.letter');
    let letterFound = null;
    for (let i = 0; i < phraseLetters.length; i++){
        if (phraseLetters[i].textContent.toLocaleLowerCase() === btn.textContent.toLocaleLowerCase()){
            phraseLetters[i].style.transition = 'ease-out .2s';
            phraseLetters[i].style.transform = 'scale(1.1)';
            btn.style.backgroundColor = 'green';
            phraseLetters[i].classList.add("show");
            letterFound = phraseLetters[i].textContent;
        }
    }
    if(letterFound == null){
        btn.style.backgroundColor = 'crimson';
        lives[missed].src = "images/lostHeart.png";
        missed += 1;
    }
    
 
}


//Function gets random Array and adds to game board//////////////////////////////////////
function grabPhrase(){
    const phraseArray = getRandomPhrasesArray(phrases);
    addPhraseToDisplay(phraseArray);
}


qwerty.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON'){
        const button = e.target;
        button.classList.add('chosen');
        button.disabled = true;
        let letterFound = checkLetter(button);
    }
    checkWin();
});

//Resets the game by chossing new phrase, resets keyboard, and resets the lives////////////////
function reset(){
    ul.innerHTML = '';
    for (let i = 0; i < lives.length; i++){
        lives[i].src = "images/Heart.png";
    }
    for (let i = 0; i < button.length; i++){
        button[i].style.backgroundColor = '';
        button[i].disabled = false;
        button[i].classList.remove('chosen');
    }

    missed = 0;
    grabPhrase();
}

//Game is won if the letters guessed equals the amount of letters on the board
function checkWin(){
    const phraseLetters = document.querySelectorAll('.letter');
    const guessedLetters = document.querySelectorAll('.show');
    if(phraseLetters.length == guessedLetters.length){
        overlay.style.transform = 'translateY(.1%)';
        overlay.className = 'win';
        start.textContent = "Great job! How about another?";
    } else if(missed >= 5){
        overlay.style.transform = 'translateY(.1%)';
        overlay.className = 'lose';
        start.textContent = "Tough luck. Try again?";
    }
    start.addEventListener('click', () => {
        reset();
    });
}