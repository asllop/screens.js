
__CLASS__('ColorModalScreen', Screen,
{
    color: { Red: 0, Green: 0, Blue: 0, Alpha: 1 },
    
    OnLoad: function(color)
    {
        this.color = this.Clone(color);
        
        this.Change(this.redChanged, '#redSlider');
        this.Change(this.greenChanged, '#greenSlider');
        this.Change(this.blueChanged, '#blueSlider');
        this.Change(this.alphaChanged, '#alphaSlider');
        this.Click(this.okClick, '#buttonOK');
        
        this.Ref('#redSlider').val(this.color.Red);
        this.Ref('#greenSlider').val(this.color.Green);
        this.Ref('#blueSlider').val(this.color.Blue);
        this.Ref('#alphaSlider').val(this.color.Alpha * 100);
        
        this.setColor();
        
        this.Ref(this.Selector).modal("show");
    },
    
    redChanged: function(sender, e)
    {
        this.color.Red = parseInt($(sender).val());
        this.setColor();
    },
    
    greenChanged: function(sender, e)
    {
        this.color.Green = parseInt($(sender).val());
        this.setColor();
    },
    
    blueChanged: function(sender, e)
    {
        this.color.Blue = parseInt($(sender).val());
        this.setColor();
    },

    alphaChanged: function(sender, e)
    {
        this.color.Alpha = parseFloat($(sender).val()) / 100.0;
        this.setColor();
    },
        
    okClick: function(sender, e)
    {
        // To be Overwritten
    },
    
    setColor: function()
    {
        $('#colorBox').css('background-color', this.colorToString());
    },
    
    colorToString: function()
    {
        return "rgba(" + this.color.Red + "," + this.color.Green + "," + this.color.Blue + "," + this.color.Alpha + ")";
    }
});
