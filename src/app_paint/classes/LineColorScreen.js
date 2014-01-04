
__CLASS__('LineColorScreen', ColorModalScreen,
{
    okClick: function(sender, e)
    {
        this.Super('okClick')(sender, e);
        
        this.SendOrderedBroadcast('SET_LINE_COLOR', this.color);
    }
});
