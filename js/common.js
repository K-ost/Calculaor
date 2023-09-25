
// variables
const nums = document.querySelectorAll('.calculator-num')
const operationBtns = document.querySelectorAll('.calculator-operation')
const resultBtn = document.querySelector('.calculator-result')
const screenEl = document.querySelector('.calculator-screen')
const reset = document.querySelector('.calculator-reset')
const delBtn = document.querySelector('.calculator-del')

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
  })
})


// Calculating
function calculate() {
  let typed = Number(typedNumber.join(''))
  if (!firstType) {
    
    if (operation === 'adding') {
      screenEl.value = storageNumber + typed
      storageNumber += typed
    }
    if (operation === 'subtraction') {
      screenEl.value = storageNumber - typed
      storageNumber -= typed
    }
    if (operation === 'multiple') {
      screenEl.value = storageNumber * typed
      storageNumber *= typed
    }
    if (operation === 'division') {
      screenEl.value = storageNumber / typed
      storageNumber /= typed
    }
    
  } else {
    storageNumber = typed
  }

  typedNumber = ['0']

  console.log(`typedNumber: ${Number(typedNumber.join(''))}, storageNumber: ${storageNumber}`)
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




// Theme switcher
const switchBtns = document.querySelectorAll('.switcher input')
switchBtns.forEach(el => {
  el.addEventListener('change', e => {
    document.body.setAttribute('data-theme', e.target.value)
  })
})
