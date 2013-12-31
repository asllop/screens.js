__CLASS__('Result1Screen', Screen,
{
    OnLoad: function()
    {
        this.Click(this.clickButton, '#button');
    },
    
    OnReturn: function(data)
    {
        alert("Returned data = " + data);
    },
            
    clickButton: function(sender)
    {
        this.PushScreen('#page2', Result2Screen, null, jqmLoader)
    }
});
