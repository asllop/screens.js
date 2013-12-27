
__CLASS__('Nav2Screen', Screen,
{
    OnLoad: function()
    {
        this.Click(this.clickButton, '#button');
    },
            
    clickButton: function(sender)
    {
        alert("Input text = " + $("#input").val());
    }
});
