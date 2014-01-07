
__CLASS__('LineColorScreen', ColorModalScreen,
{
    OnLoad: function(color)
    {
        this.modalTitle = 'Select Line Color';
        this.broadcastFilter = 'SET_LINE_COLOR';
     
        this.Super('OnLoad')(color);
    }
});
