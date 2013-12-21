__CLASS__('NewClass',
{
    salute: "Hi",

    Init: function()
    {
        alert("NewClass constructor");
    },

    foo: function(name)
    {
        alert(this.salute + " " + name);
    }
});
