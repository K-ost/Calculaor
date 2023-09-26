
// variables
const nums = document.querySelectorAll('.calculator-num')
const operationBtns = document.querySelectorAll('.calculator-operation')
const resultBtn = document.querySelector('.calculator-result')
const screenEl = document.querySelector('.calculator-screen')
const reset = document.querySelector('.calculator-reset')
const delBtn = document.querySelector('.calculator-del')
const systemMessage = document.querySelector('#system_message')

// store
let firstType = true
let operation = ''
let typedNumber = ['0']
let storageNumber = undefined


// Function reset
function resetCalc() {
  operation = ''
  firstType = true
  storageNumber = undefined
  typedNumber = ['0']
  screenEl.value = 0
}


// click reset
reset.addEventListener('click', resetCalc)
delBtn.addEventListener('click', () => {
  if (typedNumber.length !== 1) {
    typedNumber.pop()
  } else {
    typedNumber = ['0']
  }
  screenEl.value = typedNumber.join('')
})


// Type number
nums.forEach(btn => {
  btn.addEventListener('click', (e) => {
    let symbol = e.target.textContent

    if (screenEl.value.length < 10) {

      if (!typedNumber.includes('.')) {
        typedNumber.push(symbol)
      } else {
        if (symbol !== '.') {
          typedNumber.push(symbol)
        }
      }

      // remove first 0
      if (typedNumber[0] === '0') {
        typedNumber.shift()
      }

      // dot
      if (typedNumber[0] === '.') {
        typedNumber.shift()
        typedNumber.unshift('.')
        typedNumber.unshift('0')
      }

      // View
      screenEl.value = typedNumber.join('')
    } else {
      systemMessage.textContent = '(Max size of number is 10 characters)'
    }
  })
})


// Calculating
function calculate() {
  let typed = Number(typedNumber.join(''))
  
  if (firstType) {
    storageNumber = typed
  } else {

    if (typed !== 0) {

      if (operation === 'adding') {
        screenEl.value = storageNumber + typed
        storageNumber += typed
      }
      if (operation === 'subtraction') {
        screenEl.value = storageNumber - typed
        storageNumber -= typed
      }
      if (operation === 'multiple') {
        screenEl.value = String(storageNumber * typed).slice(0,10)
        storageNumber *= typed
      }
      if (operation === 'division') {
        screenEl.value = String(storageNumber / typed).slice(0,10)
        if (storageNumber === 0 && typed === 0) {
          screenEl.value = 'Error'
        } else {
          storageNumber /= typed
        }
      }

    }
    
  }

  typedNumber = ['0']

  console.log(`typedNumber: ${Number(typedNumber.join(''))}, storageNumber: ${storageNumber}, firstType: ${firstType}`)
}


// Operation buttons
operationBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    let symbol = e.target.textContent
    calculate()
    if (symbol === '+') operation = 'adding'
    if (symbol === '-') operation = 'subtraction'
    if (symbol === 'x') operation = 'multiple'
    if (symbol === '/') operation = 'division'
    firstType = false
  })
})


// resultBtn
resultBtn.addEventListener('click', calculate)


// Sound support
const soundBtn = document.querySelector('.calculator-sound')
let sound = true
soundBtn.addEventListener('click', e => {
  if (!e.target.classList.contains('disabled')) {
    e.target.classList.add('disabled')
    sound = false
  } else {
    e.target.classList.remove('disabled')
    sound = true
  }
})
document.querySelectorAll('.calculator-btn').forEach(el => {
el.addEventListener('click', () => {
    if (sound) {
      const audio = new Audio('click.mp3')
      audio.play()
    } else {
      return false
    }
  })
})



// Theme switcher
const switchBtns = document.querySelectorAll('.switcher input')
switchBtns.forEach(el => {
  el.addEventListener('change', e => {
    document.body.setAttribute('data-theme', e.target.value)
  })
})
