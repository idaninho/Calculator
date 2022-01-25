const firstNumberText = document.querySelector('.previous-number')
const currentNumberText = document.querySelector('.current-number')
const deleteBtn = document.querySelector('.button--delete')
const resultBtn = document.querySelector('.button--result')
const resetBtn = document.querySelector('.button--reset')
const numbers = document.querySelectorAll('.button--num')
const operatorBtn = document.querySelectorAll('.button--operators')

let firstNumber = firstNumberText.innerText
let currentNumber = currentNumberText.innerText
let operation = null

function reset() {
  firstNumber = ''
  currentNumber = ''
  operation = null
}

function deleteButton() {
  currentNumber = currentNumber.toString().slice(0, -1)
}

function addNumber(number) {
  //two dots
  if (number === '.' && currentNumber.includes('.')) {
    return
  }
  currentNumber = currentNumber.toString() + number.toString()
}

function operationSelector(operate) {
  if (firstNumberText !== '') {
    calcOperation()
  }
  operation = operate
  firstNumber = currentNumber
  currentNumber = ''
}

function calcOperation() {
  let result
  let prev = parseFloat(firstNumber)
  let current = parseFloat(currentNumber)
  if (isNaN(prev) || isNaN(current)) return

  switch (operation) {
    case '+':
      result = prev + current
      break

    case '-':
      result = prev - current
      break

    case '×':
      result = prev * current
      break

    case '/':
      result = prev / current
      break

    default:
      return
  }
  currentNumber = result
  operation = null
  firstNumber = ''
  firstNumberText.innerText = ''
}

function displayNum() {
  currentNumberText.innerText = currentNumber.toLocaleString('en')
  if (operation !== null) {
    firstNumberText.innerText = `${firstNumber} ${operation.toString('en')}`
  } else {
    firstNumberText.innerText = firstNumber
  }
}

resetBtn.addEventListener('click', () => {
  reset()
  displayNum()
})

deleteBtn.addEventListener('click', () => {
  deleteButton()
  displayNum()
})

numbers.forEach((num) => {
  num.addEventListener('click', () => {
    console.log(num.innerText)
    addNumber(num.innerText)
    displayNum()
  })
})

operatorBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    operationSelector(btn.innerText)
    displayNum()
  })
})

resultBtn.addEventListener('click', () => {
  calcOperation()
  displayNum()
})
