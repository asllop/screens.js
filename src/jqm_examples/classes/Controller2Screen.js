
__CLASS__('Controller2Screen', Screen,
{
	elementCounter: 0,

	OnLoad: function()
	{
		this.Click(this.buttonClick, '#button');
		this.ListClick(this.listClick, '#list');
	},
	
	buttonClick: function(sender)
	{
		// Add a new element to the list
		this.Ref('#list').append('<li>Element ' + this.elementCounter + '</li>').listview('refresh');
		this.elementCounter ++;
	},
	
	listClick: function(sender)
	{
		alert('List Click on ' + $(sender).text());
	}
});
