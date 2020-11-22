class Calculator {
    constructor(previousOperanTextElement, currentOperandTextElement) {
        this.currentOperandTextElement = currentOperandTextElement;
        this.previousOperanTextElement = previousOperanTextElement;
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand != '') {
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let result;
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)

        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.operation) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '/':
                result = prev / curr;
                break;
            default:
                return
        }
        this.currentOperand = result;
        this.previousOperand = '';
        this.operation = undefined;
    }

    getDisplay(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;

        if (isNaN(integerDigits))
            integerDisplay = ''
        else {
            integerDisplay = integerDigits.toLocaleString('en-IN', { maximumFractionDigits: 0 });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplay(this.currentOperand);
        if (this.operation != null) {
            this.previousOperanTextElement.innerText =
                `${this.getDisplay(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperanTextElement.innerText = ''
        }
    }
}

const numbersButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equal]')
const acButton = document.querySelector('[data-all-clear]')
const delButton = document.querySelector('[data-delete]')
const previousOperanTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calc = new Calculator(previousOperanTextElement, currentOperandTextElement);

numbersButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.appendNumber(button.innerText);
        calc.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.chooseOperation(button.innerText);
        calc.updateDisplay();
    });
});

equalButton.addEventListener('click', () => {
    calc.compute();
    calc.updateDisplay();
});

acButton.addEventListener('click', () => {
    calc.clear()
    calc.updateDisplay()
})

delButton.addEventListener('click', () => {
    calc.delete()
    calc.updateDisplay()
})