
__CLASS__('Page1Screen', Screen,
{
    OnLoad: function()
    {
        this.Click(this.clickButton, '#button');
    },
            
    clickButton: function(sender)
    {
        Screen.PushScreen('#page2', Page2Screen, bootstrapLoader);
    }
});
