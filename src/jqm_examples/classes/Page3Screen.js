
__CLASS__('Page3Screen', Screen,
{
    OnLoad: function()
    {
        alert("Page3Screen OnLoad");
        this.Click(this.clickButton, '#button');
    },
            
    clickButton: function(sender)
    {
        alert("Page3 Button click = " + $(sender).text());
        this.PopScreen();
    }
});
