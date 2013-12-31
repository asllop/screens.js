
__CLASS__('Page1Screen', Screen,
{
    OnLoad: function()
    {
        alert("Page1Screen OnLoad");
        this.Click(this.clickButton, '#button');
    },
            
    clickButton: function(sender)
    {
        alert("Page1 Button click = " + $(sender).text());
        this.PushScreen('#page2', Page2Screen, null, jqmLoader)
    }
});
