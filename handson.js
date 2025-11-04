const displayValueEl = document.getElementById('display-value');
const displayHistoryEl = document.getElementById('display-history');
const keypad = document.querySelector('.keypad');

let current = '0';
let previous = null;
let operator = null;
let reset = false;

function updateDisplay() {
  displayValueEl.textContent = current;
  displayHistoryEl.textContent = previous && operator ? `${previous} ${symbol(operator)}` : '';
}

function symbol(op) {
  if (op === 'add') return '+';
  if (op === 'subtract') return '−';
  if (op === 'multiply') return '×';
  if (op === 'divide') return '÷';
  return '';
}

function addDigit(d) {
  if (reset) { current = '0'; reset = false; }
  if (d === '.' && current.includes('.')) return;
  current = current === '0' ? d : current + d;
}

function clearAll() {
  current = '0';
  previous = null;
  operator = null;
  reset = false;
}

function compute() {
  if (!previous || !operator) return;
  const a = parseFloat(previous);
  const b = parseFloat(current);
  if (isNaN(a) || isNaN(b)) return;

  if (operator === 'add') current = String(a + b);
  else if (operator === 'subtract') current = String(a - b);
  else if (operator === 'multiply') current = String(a * b);
  else if (operator === 'divide') current = b === 0 ? 'Error' : String(a / b);

  previous = null;
  operator = null;
  reset = true;
}

function chooseOperator(op) {
  if (operator && !reset) compute();
  previous = current;
  operator = op;
  reset = true;
}

keypad.addEventListener('click', e => {
  const btn = e.target.closest('button');
  if (!btn) return;

  const digit = btn.dataset.digit;
  const op = btn.dataset.op;

  if (digit !== undefined) addDigit(digit);
  else if (op === 'clear') clearAll();
  else if (op === 'equals') compute();
  else chooseOperator(op);

  updateDisplay();
});

updateDisplay();
