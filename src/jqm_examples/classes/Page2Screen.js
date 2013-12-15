
__CLASS__('Page2Screen', Screen,
{
    OnLoad: function()
    {
        alert("Page2Screen OnLoad");
        this.Click(this.clickButton, '#button');
        this.Click(this.clickButtonBack, '#buttonBack');
    },
    
    clickButton: function(sender)
    {
        alert("Page2 Button click = " + $(sender).text());
        this.PushScreen('#page3', Page3Screen, this.JQMLoader);
    },
    
	clickButtonBack: function(sender)
    {
        alert("Page2 ButtonBack click = " + $(sender).text());
		this.PopScreen();
    }
});
