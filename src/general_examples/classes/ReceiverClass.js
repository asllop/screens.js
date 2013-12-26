__CLASS__('ReceiverClass', Obj,
{
    receiver: null,
    
    Init: function()
	{
		this.receiver = this.RegisterReceiver(this.broadcastReceiver, 'MYFILTER');
	},
	
	unregister: function()
    {
    	this.UnregisterReceiver(this.receiver);
	},
	
	broadcastReceiver: function(message)
	{
		alert('Message received = ' + message);
	    return true;       // halt broadcast (if it is ordered)
    }

});
