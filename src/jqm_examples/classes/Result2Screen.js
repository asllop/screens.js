__CLASS__('Result2Screen', Screen,
{
    OnLoad: function()
    {
        this.Click(this.clickButton, '#button');
    },
         
    clickButton: function(sender)
    {
        var value = this.Ref('#message').val();
        this.PopScreen(value);
    }
});
