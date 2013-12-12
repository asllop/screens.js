
__CLASS__('ReceiverScreen', Screen,
{
	receiver: null,
	
	OnLoad: function()
	{
		this.receiver = this.RegisterReceiver(this.broadcastReceiver, 'MYFILTER');
	},
	
	OnClose: function()
    {
    	this.UnregisterReceiver(this.receiver);
	},
	
	broadcastReceiver: function(message)
	{
		alert('Message received = ' + message);
	    return true;       // halt broadcast (if it is ordered)
    }
});