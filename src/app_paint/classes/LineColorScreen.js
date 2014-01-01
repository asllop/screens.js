
__CLASS__('LineColorScreen', ColorModalScreen,
{
    okClick: function(sender, e)
    {
        this.Ref(this.Selector).modal("hide");
        
        this.SendOrderedBroadcast('SET_LINE_COLOR', this.color);
    }
});
