
__CLASS__('Pageargs1Screen', Screen,
{
    OnLoad: function()
    {
        this.Click(this.clickButton, '#button');
    },
            
    clickButton: function(sender)
    {
        this.PushScreen('#page2', Pageargs2Screen, null, jqmLoader, {transition: "slideup"});
    }
});
