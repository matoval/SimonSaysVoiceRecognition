
//Global varibales
const gameBox = document.getElementById('game-box')
const messageModal = document.getElementById('message-modal')
const gameTriangle = document.querySelectorAll('.game-triangle')
const modalMessage = document.getElementById('modal-message')
const modal = document.getElementById('message-modal')
const start = document.getElementById('start-btn')
let voiceAnswersArr = []
let score = 0

window.addEventListener('load', event => {
  const loadValue = event.target.all[11].value
  modalMenu()
})

//Modal menu
function modalMenu() {
  start.addEventListener('click', startTheGame, true) 
  modal.style.display = 'block'
}

function startTheGame() {
  modal.style.display = 'none'
  startGame()
  modalMessage.innerText = ''
}
//Game 

function startGame() {
  start.removeEventListener('click', startTheGame, true)
  let gameArr = []
  let playerArr = []
  gameTriangle.forEach(tri => {
    gameArr.push(Math.floor(Math.random() * gameTriangle.length ) + 1)
  })
  let i = 0 
  function gameLoop() {
    document.getElementById(`btn-${gameArr[i]}`).style.opacity = 1
    setTimeout(() => {
      document.getElementById(`btn-${gameArr[i]}`).style.opacity = .4
      i++
    }, 400)
    if (i < (gameArr.length - 1)) {
      setTimeout( gameLoop, 1000)
    }
  }
  gameLoop()
  
  function getVoiceArr() {
    window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    const answer = new SpeechRecognition()

    answer.addEventListener('result', event => {
      let voiceAnswers = Array.from(event.results)
      .map(result => result[0])
      .map(result => result.transcript)
      let voiceAnswersArr = voiceAnswers[0]
      voiceAnswersArr = voiceAnswersArr.split(' ')
      if (voiceAnswersArr.length >= gameArr.length) {
        for (const color of voiceAnswersArr) {
          if (color === 'yellow'){
            playerArr.push(1)
          } else if (color === 'red') {
            playerArr.push(2)
          } else if (color === 'blue') {
            playerArr.push(3)
          } else {
            modalMessage.innerText = 'I\'m sorry I didn\'t understand that.'
            modalMenu()
          }
        }
        if (playerArr.length > 0 && playerArr.length === gameArr.length) {
          checkForWinner()
          }
      }
    })
	  answer.start();
  }

  getVoiceArr()
  gameTriangle.forEach(tri => {
    tri.addEventListener('click', event => {
      const getTriId = event.target.id
      const getNum = getTriId.split('')
      document.getElementById(getTriId).style.opacity = 1
      setTimeout(() => {
        document.getElementById(getTriId).style.opacity = .4
        playerArr.push(parseInt(getNum[getNum.length - 1]))
        if (playerArr.length > 0 && playerArr.length === gameArr.length) {
          checkForWinner()
          }
      }, 400)
    })
  });

  function checkForWinner() {
    let score = 0
    for (let i = 0; i < playerArr.length; i++) {
      if (playerArr[i] === gameArr[i]) {
        score++
      }
      if (playerArr.length === i + 1) {
        checkScore(score)
      }
    } 
    

    function checkScore(s) {
      if (s === playerArr.length) {
        modalMessage.innerText = 'You Win'
        modalMenu()
      } else {
        modalMessage.innerText = 'Oh No, Try Again'
        modalMenu()
      }
    }
    
  }
}



