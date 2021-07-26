const Modal = document.querySelector('.modal')
const modalOverlay = document.querySelector('.modal-overlay')
const ButtonNewTransation = document.querySelector('.button.new')
const ButtonCancel = document.querySelector('.button.cancel')
const Form = document.querySelector('form')
const Tabela = document.querySelector('tbody')


function openModal(click) {
  modalOverlay.classList.add('active')  
}

function closeModal(click) {
  modalOverlay.classList.remove('active')
}

function addTransaction(event) {
  event.preventDefault()

  const InputDescription = document.querySelector('#description')
  const InputAmount = document.querySelector('#amount')
  const InputDate = document.querySelector('#date')
  const Tr = document.createElement('tr')
  const IconMinus = document.createElement('img')
  const TdIconMinus = document.createElement('td')
  const ButtonIconMinus =document.createElement('button')

  ButtonIconMinus.addEventListener('click', event => removeTransaction(event, Tr))

  const Description = document.createElement('td')
  Description.innerText = InputDescription.value

  const Amount = document.createElement('td')
  Amount.innerText = InputAmount.value
  
  const amountValue = Number(InputAmount.value)

  if (amountValue > 0) {
    Amount.classList.add('income')
    cardAnalyticsIncome(amountValue)

  } else {
   Amount.classList.add('expense')
   cardAnalyticsExpense(amountValue) 
  }

    

  const _Date = document.createElement('td')
  _Date.innerText = InputDate.value
 

  IconMinus.setAttribute('src', './assets/minus.svg')
  ButtonIconMinus.appendChild(IconMinus)
  IconMinus.classList.add()
  TdIconMinus.appendChild(ButtonIconMinus) 

  Tr.setAttribute('data-value', amountValue)
  Tr.appendChild(Description)
  Tr.appendChild(Amount)
  Tr.appendChild(_Date)
  Tr.appendChild(TdIconMinus)
  
  Tabela.appendChild(Tr)
  
  closeModal()
}

function removeTransaction(event, Tr) {
  const CardIncome = document.querySelector('#income-display')
  const CardExpense = document.querySelector('#expense-display')
  const CardTotal = document.querySelector('#total-display')
  
  const valueTr = Number(Tr.getAttribute('data-value'))

  const isIncome = valueTr > 0

  const valueIncome = Number(CardIncome.getAttribute('data-value')) - valueTr
  const valueExpense = Number(CardExpense.getAttribute('data-value')) - valueTr
  const valueTotal = Number(CardTotal.getAttribute('data-value')) - valueTr

  isIncome && CardIncome.setAttribute('data-value', valueIncome)
  !isIncome && CardExpense.setAttribute('data-value', valueExpense)
  CardTotal.setAttribute('data-value', valueTotal)



  const innerTextIncome = valueIncome.toLocaleString('pt-BR', {
    currency: 'BRL',
    style: 'currency'
  })

  const innerTextExpense = valueExpense.toLocaleString('pt-BR', {
    currency: 'BRL',
    style: 'currency'
  })

  const innerTextTotal = valueTotal.toLocaleString('pt-BR', {
    currency: 'BRL',
    style: 'currency'
  })


  isIncome && (CardIncome.innerText = innerTextIncome)
  !isIncome && (CardExpense.innerText = innerTextExpense)
  CardTotal.innerText = innerTextTotal

  Tabela.removeChild(Tr)
}

function cardAnalyticsIncome(income = 0) {
  const CardIncome = document.querySelector('#income-display')
  const CardTotal = document.querySelector('#total-display')
  
  const valueIncome = Number(CardIncome.getAttribute('data-value')) + income
  const valueTotal = Number(CardTotal.getAttribute('data-value')) + income

  CardIncome.setAttribute('data-value', valueIncome)
  CardTotal.setAttribute('data-value', valueTotal)

  const innerTextIncome = valueIncome.toLocaleString('pt-BR', {
    currency: 'BRL',
    style: 'currency'
  })

  const innerTextTotal = valueTotal.toLocaleString('pt-BR', {
    currency: 'BRL',
    style: 'currency'
  })

  CardIncome.innerText = innerTextIncome
  CardTotal.innerText = innerTextTotal
}

function cardAnalyticsExpense(expense = 0) {
  const CardExpense = document.querySelector('#expense-display')
  const CardTotal = document.querySelector('#total-display')

  const valueExpense = Number(CardExpense.getAttribute('data-value')) + expense
  const valueTotal = Number(CardTotal.getAttribute('data-value')) + expense

  console.log(valueTotal)
  CardTotal.setAttribute('data-value', valueTotal)
  CardExpense.setAttribute('data-value', valueExpense)

  const innerTextExpense = valueExpense.toLocaleString('pt-BR', {
    currency: 'BRL',
    style: 'currency'
  })

  const innerTextTotal = valueTotal.toLocaleString('pt-BR', {
    currency: 'BRL',
    style: 'currency'
  })

  CardExpense.innerText = innerTextExpense
  CardTotal.innerText = innerTextTotal
}

ButtonNewTransation.addEventListener('click', openModal)
ButtonCancel.addEventListener('click', closeModal)
Form.addEventListener('submit', addTransaction)