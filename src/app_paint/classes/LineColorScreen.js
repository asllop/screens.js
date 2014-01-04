
__CLASS__('LineColorScreen', ColorModalScreen,
{
    okClick: function(sender, e)
    {
        this.Super('okClick')();
        
        this.SendOrderedBroadcast('SET_LINE_COLOR', this.color);
    }
});
