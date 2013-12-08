
__CLASS__('Page1Screen', Screen,
{
    OnLoad: function()
    {
        console.log("Page1Screen OnLoad");
        
        this.Click(this.clickButton, '#button');
    },
            
    clickButton: function(sender)
    {
        console.log("Page1 Button click = " + $(sender).text());
        this.PushPage(this.JQMLoader, 'page2', Page2Screen)
    }
});
