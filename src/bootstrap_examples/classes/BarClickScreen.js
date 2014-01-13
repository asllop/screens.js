
__CLASS__('BarClickScreen', Screen,
{
    value: 0,
    progress: null,
    delegate: function(){},
    
    OnLoad: function(progress)
    {
        this.progress = progress;
        
        this.Ref(this.Selector).click(this.Callback(this.mouseClick));

        // Set init value
        this.Ref(this.progress).width("50%");
    },
    
    mouseClick: function(sender, event)
    {
        this.progressClick(sender, event);
        this.delegate(this.value);
    },
    
    progressClick: function(sender, event)
    {
        this.value = Math.round((event.offsetX / $(sender).width()) * 100);
        this.Ref(this.progress).width(this.value + "%");
    }
});
