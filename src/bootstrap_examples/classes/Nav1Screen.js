
__CLASS__('Nav1Screen', Screen,
{
    OnLoad: function()
    {
        this.Click(this.clickButton, '#button');
    },
            
    clickButton: function(sender)
    {
        if ($("#paragraph").is(":visible"))
        {
            $(sender).text("Show");
            $("#paragraph").hide();
        }
        else
        {
            $(sender).text("Hide");
            $("#paragraph").show();
        }
    }
});
