__CLASS__('SenderClass', Obj,
{
    send: function(data)
	{
		this.SendOrderedBroadcast('MYFILTER', data);
	}
});
