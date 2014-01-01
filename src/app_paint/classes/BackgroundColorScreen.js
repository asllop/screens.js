
__CLASS__('BackgroundColorScreen', ColorModalScreen,
{
    okClick: function(sender, e)
    {
        this.Ref(this.Selector).modal("hide");
        
        this.SendOrderedBroadcast('SET_BACKGROUND_COLOR', this.color);
    }
});
