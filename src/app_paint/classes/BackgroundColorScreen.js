
__CLASS__('BackgroundColorScreen', ColorModalScreen,
{
    OnLoad: function(color)
    {
        this.modalTitle = 'Select Background Color';
        this.broadcastFilter = 'SET_BACKGROUND_COLOR';
     
        this.Super('OnLoad')(color);
    }
});
