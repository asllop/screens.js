
__CLASS__('BarDragScreen', Screen,
{
    isDragging: false,
    value: 0,
    progress: null,
    delegate: function(){},
    
    OnLoad: function(progress)
    {
        this.progress = progress;
        
        this.Ref(this.Selector).mousedown(this.Callback(this.mouseDown));
        this.Ref(this.Selector).mouseup(this.Callback(this.mouseUp));
        this.Ref(this.Selector).mousemove(this.Callback(this.mouseMove));

        // Disable progress animation
        this.Ref(this.progress).css("-webkit-transition", "none");
        this.Ref(this.progress).css("-moz-transition", "none");
        this.Ref(this.progress).css("-ms-transition", "none");
        this.Ref(this.progress).css("-o-transition", "none");
        this.Ref(this.progress).css("transition", "none");
        
        // Set init value
        this.Ref(this.progress).width("20%");
    },
    
    mouseDown: function(sender, event)
    {
        this.isDragging = true;
        this.progressClick(sender, event);
        
        //this.delegate(this.value);
        
        return false;   // to avoid cursor changing when click over
    },
    
    mouseUp: function(sender, event)
    {
        this.isDragging = false;
        this.delegate(this.value);
    },

    mouseMove: function(sender, event)
    {
        if (this.isDragging)
        {
            this.progressClick(sender, event);

            //this.delegate(this.value);
        }
    },
    
    progressClick: function(sender, event)
    {
        this.value = Math.round((event.offsetX / $(sender).width()) * 100);
        this.Ref(this.progress).width(this.value + "%");
    }
});
