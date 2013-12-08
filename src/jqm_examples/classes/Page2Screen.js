
__CLASS__('Page2Screen', Screen,
{
    OnLoad: function()
    {
        console.log("Page2Screen OnLoad");
        
        this.Click(this.clickButton, '#button');
    },
    
    clickButton: function(sender)
    {
        console.log("Page2 Button click = " + $(sender).text());
        this.PopPage();
    }
});
