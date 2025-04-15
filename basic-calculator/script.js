const buttons = document.querySelectorAll(".calcBtn");
let resultLabel = document.getElementById("result");

let result = 0;
let operand = "";
let second_num = 0;

buttons.forEach(button => {
    button.addEventListener("click", function() {
        const value = this.getAttribute("data-value");

        const operands = ["+", "-", "*", "/"];
        const other_operands = ["=", "C"]



        if (operands.includes(value)) {
            operand = value;
        }
        else if(other_operands.includes(value)) {
            if (value == "="){
                if (operand == "") { result = 0; resultLabel.innerHTML = "0";}
                else{
                    switch(operand)
                    {
                        case "+":
                        {
                            result = parseFloat(result) + parseFloat(second_num);
                            break;
                        }
                        case "-":
                        {
                            result = parseFloat(result) - parseFloat(second_num);
                            break;
                        }
                        case "*":
                        {
                            result = parseFloat(result) * parseFloat(second_num);
                            break;
                        }
                        case "/":
                        {
                            result = parseFloat(result) / parseFloat(second_num);
                            break;
                        }
                    }
                    operand = "";
                    second_num = 0;
                }
            }
            else {
                result = 0;
                operand = "";
                second_num = 0;
            }
        }
        else{
            // check if no operation and number is 0 - result
            if (operand == "" && result == 0) { result = value; }
            // append value if result is not 0
            else if (operand == "" && result != 0) { result += value }

            if (operand != "" && second_num == 0) { second_num = value; }
            else if (operand != "" && second_num != 0) { second_num += value }


        }

        let display;
        if (result == 0) { display = 0; }
        if (result != 0) { display = result; }
        if (operand != "") { display += operand; }
        if (second_num != 0) { display += second_num }
        resultLabel.innerHTML = display;
    });
});