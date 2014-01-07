
__CLASS__('WeightModalScreen', Screen,
{
    lineWidth: 1,
    
    OnLoad: function(lineWidth)
    {
        this.lineWidth = lineWidth;
        this.Change(this.valueChanged, '#slider');
        this.Click(this.okClick, '#buttonOK');
        
        this.Ref("#slider").val(this.lineWidth);
        this.Ref('#weightValue').text(this.Ref("#slider").val());
        
        this.Ref(this.Selector).modal("show");
    },
    
    valueChanged: function(sender, e)
    {
        this.Ref('#weightValue').text($(sender).val());
    },
    
    okClick: function(sender, e)
    {
        this.Ref(this.Selector).modal("hide");
        
        this.SendOrderedBroadcast('SET_LINE_WIDTH', this.Ref("#slider").val());
    }
});
