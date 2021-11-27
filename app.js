import {questionsStore} from './questions.js'

const gameView = document.querySelector('.question__count');
const counter = document.querySelector('.question__count__numbers');
const conteinerQuestion = document.querySelector('.container');
const score = document.querySelector('#modal__box__scores-result');
const questions = document.querySelector('.question__count__question');
const answers = [...document.querySelectorAll('.container__answer')];
const modal = document.querySelector('.modal')

let acceptingAnswers = true;
let counterQuestion;
let scoreCounter;
let store = [];
let newQuestionsStore = [];
let currentQuestion = [];
let MAX = questionsStore.length

const startGame = () => {
    counterQuestion = 0;
    scoreCounter = 0;
    newQuestionsStore = [...questionsStore];
    startQuiz();
}

const startQuiz = () => {
    if(newQuestionsStore.length === 0 || counterQuestion > MAX){
        gameView.style.display = 'none';
        conteinerQuestion.style.display = 'none';
        modal.style.display = 'block';
        showModal()
        return
    }
        
    counterQuestion++
    counter.textContent = `${counterQuestion} / ${MAX}`

    currentQuestion = newQuestionsStore[0]
    
    questions.textContent  = currentQuestion.question

    
    answers.forEach( answer => {
        answer.textContent = currentQuestion[answer.dataset['answer']]
    })

    newQuestionsStore.splice(0,1)
    acceptingAnswers = true;

}
    answers.forEach(answer => {
        answer.addEventListener('click', e => {
            if(!acceptingAnswers) return
            acceptingAnswers = false;
            const clickedElement = e.target.textContent;

            if(clickedElement === currentQuestion.true) {
                scoreCounter += 10;
                answer.parentElement.classList.add('correct');
                store.push(scoreCounter);
            } else {
                answer.parentElement.classList.add('incorrect');
            }

            setTimeout(() => {
                answer.parentElement.classList.remove('correct');
                answer.parentElement.classList.remove('incorrect');
                startQuiz();
            }, 1000)
        })
            
    })

const showModal = () =>{
    if(store.length != []) {
        score.textContent = store[store.length - 1];
    } else {
        score.textContent = '0' ;
    }
}

startGame();