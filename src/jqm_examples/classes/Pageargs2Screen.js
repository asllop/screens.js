
__CLASS__('Pageargs2Screen', Screen,
{
    OnLoad: function()
    {
        this.Click(this.clickButton, '#button');
        this.Click(this.clickButtonBack, '#buttonBack');
    },

	clickButtonBack: function(sender)
    {
		this.PopScreen(null, {transition: "slideup", reverse: true});
    }
});
