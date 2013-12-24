
__CLASS__('PopupScreen', Screen,
{
    OnLoad: function()
    {
        this.Click(this.buttonClick, '#buttonClose');
    },
    
    buttonClick: function(sender)
    {
        alert("Close Popup");
        
        this.Ref('#popup1').popup('close');
    }
});
