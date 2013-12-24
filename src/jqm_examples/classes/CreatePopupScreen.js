
__CLASS__('CreatePopupScreen', Screen,
{
    OnLoad: function()
    {
        this.Click(this.buttonClick, '#button');
        this.SetScreen('#popup1', PopupScreen);
    },
    
    buttonClick: function(sender)
    {
        // We use $() instead of Ref() to access the Popup because when we executed SetScreen
        // the popup became a part of a different Screen (the PopupScreen).
        $('#popup1').popup('open');
    }
});
