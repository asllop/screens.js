
__CLASS__('CalculatorScreen', Screen,
{
    displayString: "0",
    lastOperation: "",
    lastNumber: 0,
    resetDisplay: false,
    
    OnLoad: function()
    {
        this.updateDisplay();    
        this.Click(this.buttonClick, '.btn');
    },
    
    buttonClick: function(sender)
    {
        this.decodeButton($(sender).text());
        this.updateDisplay();
    },
    
    updateDisplay: function()
    {
        this.Ref('#display').val(this.displayString);
    },
    
    decodeButton: function(value)
    {
        if (isNaN(value))
        {
            // Is Operation
            this.prepareOperation(value);
        }
        else
        {
            // Is Number
            
            if (this.resetDisplay)
            {
                this.displayString = parseInt(value).toString();
                this.resetDisplay = false;
            }
            else if (this.displayString.length < 10)
            {
                this.displayString = this.displayString + value;
                this.displayString = parseInt(this.displayString).toString();
            }
        }
    },
    
    prepareOperation: function(operation)
    {
        if (operation == 'C')
        {
            // Clear

            this.displayString = "0";
            this.lastOperation = "";
            this.resetDisplay = false;
        }
        else if (operation == '=')
        {
            // Equal
            
            this.calculateOperation();
            this.resetDisplay = true;
            this.lastOperation = "";
        }
        else
        {
            // Math operation
            
            this.calculateOperation();
            this.lastNumber = parseInt(this.displayString);
            this.lastOperation = operation;
            this.resetDisplay = true;
        }
    },
    
    calculateOperation: function()
    {
        if (this.lastOperation == "")
        {
            return;
        }
        
        var currNumber = parseInt(this.displayString);
        var resultNumber = 0;
        
        switch (this.lastOperation)
        {
            case '+':
                // Add
                resultNumber = this.lastNumber + currNumber;
                break;
                
            case '-':
                // Sub
                resultNumber = this.lastNumber - currNumber;
                break;
                
            case 'x':
                // Mul
                resultNumber = this.lastNumber * currNumber;
                break;
                
            case '/':
                // Div
                resultNumber = this.lastNumber / currNumber;
                break;
        }
        
        this.displayString = resultNumber.toString();
    }
});
