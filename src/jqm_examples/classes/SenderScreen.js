
__CLASS__('SenderScreen', Screen,
{
	OnLoad: function()
	{
		this.Click(this.buttonClick, '#myButton');
	},
	
	buttonClick: function(sender)
	{
		this.SendOrderedBroadcast('MYFILTER', 'Hello World!');
	}
});
