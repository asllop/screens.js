__CLASS__('AnotherClass', NewClass,
{
    Init: function()
    {
        alert("AnotherClass constructor");
    },

    foo: function(name)
    {
        alert("Another " + this.salute + " " + name);
        this.Super.foo(name);
    }
});
