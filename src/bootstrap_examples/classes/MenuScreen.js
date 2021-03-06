
__CLASS__('MenuScreen', Screen,
{
    nav1Screen: null,
    nav2Screen: null,
    
    OnLoad: function()
    {
        this.nav1Screen = this.SetScreen('#page1', Nav1Screen);
        this.nav2Screen = this.SetScreen('#page2', Nav2Screen);
        
        this.Click(this.clickGoBlank, '#goblank');
        this.Click(this.clickGoPage1, '#gopage1');
        this.Click(this.clickGoPage2, '#gopage2');
    },
            
    clickGoBlank: function(sender)
    {
        $('#page1').hide();
        $('#page2').hide();
        
        $('#gopage1').removeClass('active');
        $('#gopage2').removeClass('active');
    },
               
    clickGoPage1: function(sender)
    {
        if (!$('#gopage1').hasClass('active'))
        {
            $('#gopage1').addClass('active');
            $('#gopage2').removeClass('active');
        }
        
        $('#page2').hide();
        $('#page1').show();
    },
               
    clickGoPage2: function(sender)
    {
        if (!$('#gopage2').hasClass('active'))
        {
            $('#gopage2').addClass('active');
            $('#gopage1').removeClass('active');
        }
        
        $('#page1').hide();
        $('#page2').show();
    }
});
