
__CLASS__('CustomEventsScreen', Screen,
{
	OnLoad: function()
	{
		this.Ref('#input').keypress(this.Callback(this.inputKeyPress));
	},
	
	inputKeyPress: function(sender, e)
	{
		alert("Key Pressed:\n" + "Text = " + $(sender).val() + "\n"+ "Event = " + e.which);
	}
});
