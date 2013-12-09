
__CLASS__('DynamicListScreen', Screen,
{
	elementCounter: 0,
	
	OnLoad: function()
	{
		this.Click(this.buttonClick, '#button');
	},
	
	buttonClick: function(sender)
	{
		// First time, create list and set click event listener
		if (this.elementCounter == 0)
		{
			// We use SetHtml to append all the appropriate classes to the DOM element
			this.SetHtml('#listContainer', '<ul data-inset="true" data-role="listview" id="list"></ul>');
			
			// Using Ref() insead of $() assures us that we are accessing the current Screen element, and not other with the same ID
			this.Ref('#list').listview();
			this.ListClick(this.listClick, '#list');
		}
		
		// Add a new element to the list
		this.Ref('#list').append('<li>Element ' + this.elementCounter + '</li>').listview('refresh');
		this.elementCounter ++;
	},
	
	listClick: function(sender)
	{
		alert('List Click on ' + $(sender).text());
	}
});
