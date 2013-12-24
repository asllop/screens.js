
__CLASS__('Events1Screen', Screen,
{
	OnLoad: function()
	{
		this.Click(this.buttonClick, '#button');
		this.DoubleClick(this.buttonDblClick, '#dblbutton');
		this.Change(this.inputChange, '#input');
		this.ListClick(this.listClick, '#list');
		this.CheckboxClick(this.checkboxClick, '#checkbox');
		this.RadioClick(this.radioClick, '#radio');
		this.Change(this.selectChange, '#select');
	},
	
	buttonClick: function(sender)
	{
		alert('Button Click');
	},

	buttonDblClick: function(sender)
	{
		alert('Button Double Click');
	},
		
	inputChange: function(sender)
	{
		alert('Input Changed, value = ' + $(sender).val());
	},
	
	listClick: function(sender)
	{
		alert('List Click on ' + $(sender).text());
	},
	
	checkboxClick: function(sender)
	{
		alert("Checker click on = " + $(sender).val());
	},
    
	radioClick: function(sender)
	{
		alert("Radio click on = " + $(sender).val());
	},
    
	selectChange: function(sender)
	{
		alert('Selector Changed, value = ' + $(sender).find(":selected").val());
	}
});
