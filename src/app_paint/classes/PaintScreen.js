
__CLASS__('PaintScreen', Screen,
{
    ctx: null,
    isPainting: false,
    lastPos: null,
    lineWidth: 1,
    lineColor: { Red: 0, Green: 0, Blue: 0, Alpha: 1 },
    backgroundColor: { Red: 255, Green: 255, Blue: 255, Alpha: 1 },
    pointList: [],
    imgData: null,
    
    OnLoad: function()
    {
        var canvas = this.Ref('#canvas')[0];
        this.ctx = canvas.getContext("2d");
        
        canvas.width = this.Ref('#paint-container').width();
        canvas.height = window.innerHeight - this.Ref('div.btn-toolbar').height() - 40;
        
        this.Ref('#canvas').mousedown(this.Callback(this.mouseDown));
        this.Ref('#canvas').mouseup(this.Callback(this.mouseUp));
        this.Ref('#canvas').mousemove(this.Callback(this.mouseMove));
        
        this.Click(this.colorClick, '#buttonColor');
        this.Click(this.widthClick, '#buttonWidth');
        this.Click(this.backClick, '#buttonBackground');
        
        this.RegisterReceiver(this.broadcastReceiverLineWidth, 'SET_LINE_WIDTH');
        this.RegisterReceiver(this.broadcastReceiverLineColor, 'SET_LINE_COLOR');
        this.RegisterReceiver(this.broadcastReceiverBackgroundColor, 'SET_BACKGROUND_COLOR');
        
        this.changeLineWeight(this.lineWidth);
        this.changeStrokeColor(ColorModalScreen.colorToString(this.lineColor));
        this.changeBackgorundColor(ColorModalScreen.colorToString(this.backgroundColor));
    },
    
    broadcastReceiverLineWidth: function(message)
	{
	    this.lineWidth = message;
	    this.changeLineWeight(this.lineWidth);

	    return true;
    },
    
    broadcastReceiverLineColor: function(message)
	{
	    this.lineColor = message;
	    this.changeStrokeColor(ColorModalScreen.colorToString(message));
    },

    broadcastReceiverBackgroundColor: function(message)
	{
	    this.backgroundColor = message;
	    this.changeBackgorundColor(ColorModalScreen.colorToString(message));
    },
        
    mouseDown: function(sender, event)
    {
        this.isPainting = true;
        
        this.imgData = this.ctx.getImageData(0, 0, this.Ref('#canvas')[0].width, this.Ref('#canvas')[0].height);

        return false;   // to avoid cursor changing when click over
    },
    
    mouseUp: function(sender, event)
    {
        this.isPainting = false;
        
        this.ctx.clearRect(0, 0, this.Ref('#canvas')[0].width, this.Ref('#canvas')[0].height);
        this.ctx.putImageData(this.imgData, 0, 0);
        this.drawPointList();
    },

    mouseMove: function(sender, event)
    {
        if (this.isPainting)
        {
            this.drawTram(event.offsetX, event.offsetY);
            this.addPointToList(event.offsetX, event.offsetY);
        }
        
        this.lastPos = { X: event.offsetX, Y: event.offsetY };
    },
    
    colorClick: function(sender, event)
    {
        this.SetScreen('#colorModal', LineColorScreen, this.lineColor);
    },
    
    widthClick: function(sender, event)
    {
        this.SetScreen('#weightModal', WeightModalScreen, this.lineWidth);
    },
    
    backClick: function(sender, event)
    {
        this.SetScreen('#colorModal', BackgroundColorScreen, this.backgroundColor);
    },

    drawTram: function(x, y)
    {
        this.ctx.beginPath();
        this.ctx.lineJoin = "round";
        this.ctx.lineCap = "round";
        this.ctx.moveTo(this.lastPos.X, this.lastPos.Y);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    },
    
    addPointToList: function(x, y)
    {
        this.pointList.push({ X: x, Y: y });
    },
    
    drawPointList: function()
    {
        this.ctx.beginPath();
        this.ctx.lineJoin = "round";
        this.ctx.lineCap = "round";

        for (var i = 0 ; i < this.pointList.length ; i++)
        {
            this.ctx.lineTo(this.pointList[i].X, this.pointList[i].Y);
        }
        
        this.ctx.stroke();
        
        this.pointList = [];
    },
    
    changeBackgorundColor: function(color)
    {
        this.Ref('#canvas').css({ "background-color": color });
    },
    
    changeLineWeight: function(width)
    {
        this.ctx.lineWidth = width;
    },
    
    changeStrokeColor: function(color)
    {
        this.ctx.strokeStyle = color;
    }
});
