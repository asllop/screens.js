
__CLASS__('CreatePopupScreen', Screen,
{
    popupScreen: null,
    
    OnLoad: function()
    {
        this.Click(this.buttonClick, '#button');
        this.popupScreen = this.SetScreen('#popup1', PopupScreen);
    },
    
    buttonClick: function(sender)
    {
        // When we executed SetScreen the popup became a part of a different Screen: the PopupScreen.
        this.popupScreen.Ref('#popup1').popup('open');
    }
});
