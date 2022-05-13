//Required abilities of calculator
//accept user inputs of number, operator, and another number
//store inputs
//should accept decimal numbers
//recognize inputs and perform calculations
//return a result

//optional featurs:
//should accept longer arithmetic operations
//display the input as it is being entered
//previous total becomes start of new operation
//clear button should clear all entries
//should prevent invald inouts (operations next to each other, two decimal points etc...)

const keys = document.querySelector('.calculator-buttons');
keys.addEventListener('click', event => {
    const { target } = event;
    const { value } = target;
    if (!target.matches('button')) {
        return;
    } else {
        calculator.parseInput(value)
        //pass to parse method
        //console.log(value)
    }
})

const calculator = {
    displayText: '0',
    prevTotal: null,

    parseInput(value) {

        //have any of the special buttons been clicked?
        switch (value) {
            case '=':
                //calculate the answer
                this.calcAnswer(this.displayText)
                break;
            case 'AC':
                this.clearAll()
                //clear screen and stored values
                break;
            case '.':
                if (this.displayText == 0) {
                    this.addText('0.')
                    //pass '0.'into add text method
                } else {
                    this.addText(value)
                    //add value to text string
                }
                break;
            default:
                this.addText(value)
                break;
            //add value to text string
        }

    },
    addText(value) {
        if (this.displayText === '0') {
            this.displayText = ''
        } else if (this.prevTotal !== null) {
            this.displayText = this.prevTotal
            this.prevTotal = null
        }
        /*user has entered invaliid sequence do not proceed*/
        if (isNaN(+(value)) && isNaN(+(this.displayText))) {
            if (isNaN(this.displayText.slice(-1))) {
                return;
            }
        }
        this.displayText += value
        //output display text to screen
        this.outputText(this.displayText)

    },

    outputText(text) {
        document.querySelector('.calculator-screen').value = text
    },

    calcAnswer(equation) {
        let result = Function("return " + equation)()
        this.outputText(result)
    },

    clearAll() {
        this.displayText = '0',
            this.prevTotal = null,
            this.outputText(this.displayText)
    }
}