
__CLASS__('Controller1Screen', Screen,
{
	OnLoad: function()
	{
		this.Click(this.buttonClick, '#button');
	},
	
	buttonClick: function(sender)
	{
		alert('Hello ' + $('#inputtext').val());
	}
});
