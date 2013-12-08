
__CLASS__('Page2Screen', Screen,
{
    OnLoad: function()
    {
        alert("Page2Screen OnLoad");
        this.Click(this.clickButton, '#button');
    },
    
    clickButton: function(sender)
    {
        alert("Page2 Button click = " + $(sender).text());
        this.PopScreen();
    }
});
