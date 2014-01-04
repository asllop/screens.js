
__CLASS__('BackgroundColorScreen', ColorModalScreen,
{
    okClick: function(sender, e)
    {
        this.Super('okClick')(sender, e);
        
        this.SendOrderedBroadcast('SET_BACKGROUND_COLOR', this.color);
    }
});
