
__CLASS__('DelegateScreen', Screen,
{
    barClick: null,
    barDrag: null,
    
    OnLoad: function()
    {
        this.barClick = Screen.SetScreen('#progress-container1', BarClickScreen, '#progress1');
        this.barDrag = Screen.SetScreen('#progress-container2', BarDragScreen, '#progress2');
        
        this.barClick.delegate = this.Callback(this.valueChanged);
        this.barDrag.delegate = this.Callback(this.valueChanged);
    },
    
    valueChanged: function(sender, value)
    {
        alert('Value changed in ' + sender.CLASS_NAME + ' = ' + value);
    }
});
