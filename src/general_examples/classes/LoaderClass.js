__CLASS__('LoaderClass', Obj,
{
    Init: function()
	{
	    // NOTE: In some browsers this will not work locally (ie. Chrome) and need to be accesses through a webserver.
	    this.LoadClass('NewClass', 'classes/', this.loadReady);
	},
	
	loadReady: function()
	{
    	alert('Class loaded');
    	
    	var newObj = NewClass.New();
    	
    	this.UnloadClass('NewClass');
	}
});
