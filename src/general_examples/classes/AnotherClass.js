__CLASS__('AnotherClass', NewClass,
{
    Init: function()
    {
        alert("AnotherClass constructor");
    },

    foo: function(name)
    {
        alert("Another " + this.salute + " " + name);
        
        var superObj = this.Super();
        superObj.foo(name);
    }
});
