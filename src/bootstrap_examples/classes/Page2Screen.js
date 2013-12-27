
__CLASS__('Page2Screen', Screen,
{
    OnLoad: function()
    {
        this.Click(this.clickButton, '#button');
    },
            
    clickButton: function(sender)
    {
        this.PopScreen();
    }
});
