__CLASS__('NestedClass',
{
    Init: function()
    {
        // Create a class in the current context
        __CONTEXT_CLASS__(this, 'InnerClass',
        {
            sayHello: function()
            {
                alert("Hello World!");
            }
        });
    },

    foo: function(name)
    {
        var obj = this.InnerClass.New();
        obj.sayHello();
    }
});
