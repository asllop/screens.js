/* 
 * ScreensJS - v0.9b
 * Copyright (C) 2013 Andreu Santaren Llop
 */

/*
 * TODO:
 * 
 * -    Create backends (loader) for Bootstrap and JQuery UI.
 */

// Init ScreensJS library
{
    Array.prototype.last = function()
    {
        return this[this.length - 1];
    };
    
    Array.prototype.remove = function(index)
    {
        this.splice(index, 1);
    };
    
    window.BROADCAST_REGISTER_ARRAY = new Array();
    
    window.SCREEN_CLASS_STACK = new Array();
    window.SCREEN_HTML_LIST = new Object();
}

// Create a class
function __CLASS__(name, obj1, obj2)
{
    if (obj2 !== undefined)            // New class by heritance
    {
        // obj1 -> classe de la que heretem
        // obj2 -> definicio de la nova classe
        
        if (typeof(obj1) !== "object")
        {
            throw "Extending from a non object";
        }
        
        // Clone the object
        var _asc_ = __CLONE__(obj1);
        
        // Get all element of obj and push it in _asc_
        for (var index in obj2)
        {
            var attr = obj2[index];
            _asc_[index] = attr;
        }
        
        // Init base properties
        _asc_.CLASS_TYPE.push(_asc_.CLASS_NAME);
        _asc_.CLASS_NAME = name;
        
        // Create the global variable for the class
        window[name] = _asc_;
        return _asc_;
    }
    else                        // New base class
    {
        // Init base methods
        obj1.New = function()
        {
            var newObj = __CLONE__(this);

            newObj.OBJECT_UNIQUE_KEY = Math.floor(Math.random() * 10000000000000000).toString();
            newObj['Init'].apply(newObj, arguments);
            
            return newObj;
        };
        
        if (!('Init' in obj1))
        {
            obj1.Init = function() {};
        }

        // Init base properties
        obj1.CLASS_TYPE = new Array("__CLASS__");
        obj1.CLASS_NAME = name;

        // Create the global variable for the class
        window[name] = obj1;
        return obj1;
    }
}

// Base class for screens
__CLASS__('Screen',
{
    OnLoad: function()
    {},
    
    OnClose: function()
    {},
            
    OnReturn: function(retdata)
    {},
        
    CloseScreen: function(screen)
    {
        screen.OnClose();
    },
    
    PushPage: function(loader, pageid, screen)
    {
        __PUSH_PAGE__(loader, pageid, screen);
    },
            
    PopPage: function(retdata)
    {
        __POP_PAGE__(retdata);
    },
            
    JQMLoader: function(pageid)
    {
        __JQM_LOADER__(pageid);
    },
            
    LoadScreen: function(name, baseurl, readyCallBack, code)
    {
        __LOAD_SCREEN__(name, baseurl, this, readyCallBack, code);
    },
            
    PushScreen: function(name, baseurl)
    {
        __PUSH_SCREEN__(name, baseurl);
    },

    PopScreen: function(retdata)
    {
        __POP_SCREEN__(retdata);
    },

    LoadClass: function(name, baseurl, readyCallBack)
    {
        return __LOAD_CLASS__(name, baseurl, this, readyCallBack);
    },
            
    Callback: function(callback)
    {
        return __CALLBACK__(this, callback);
    },

    Ref: function(selector)
    {
        return __REF__(this, selector);
    },

    Click: function(delegate, selector)
    {
        __CLICK__(this, delegate, selector);
    },

    ListClick: function(delegate, selector)
    {
        __LIST_CLICK__(this, delegate, selector);
    },
    
    Change: function(delegate, selector)
    {
        __CHANGE__(this, delegate, selector);
    },
            
    CheckboxClick: function(delegate, selector)
    {
        __CHECKER_CLICK__(this, delegate, selector, 'checkbox');
    },
            
    RadioClick: function(delegate, selector)
    {
        __CHECKER_CLICK__(this, delegate, selector, 'radio');
    },
            
    MouseEnter: function(delegate, selector)
    {
        __MOUSE_ENTER__(this, delegate, selector);
    },
    
    MouseLeave: function(delegate, selector)
    {
        __MOUSE_LEAVE__(this, delegate, selector);
    },
            
    MouseDown: function(delegate, selector)
    {
        __MOUSE_DOWN__(this, delegate, selector);
    },
            
    MouseUp: function(delegate, selector)
    {
        __MOUSE_UP__(this, delegate, selector);
    },
            
    MouseMove: function(delegate, selector)
    {
        __MOUSE_MOVE__(this, delegate, selector);
    },
            
    RegisterReceiver: function(delegate, filter)
    {
        return __REGISTER_RECEIVER__(this, delegate, filter);
    },
            
    UnregisterReceiver: function(receiver)
    {
        __UNREGISTER_RECEIVER__(receiver);
    },
            
    SendOrderedBroadcast: function(filter, message)
    {
        __SEND_BROADCAST__(filter, message, false);
    },
            
    SendBroadcast: function(filter, message)
    {
        __SEND_BROADCAST__(filter, message, true);
    }
});

function __SCREEN__(name, obj)
{
    return __CLASS__(name, Screen, obj);
}

// Clone an object
function __CLONE__(obj)
{
   return __DESERIALIZE__(__SERIALIZE__(obj));
}

// Convert a class object to string
function __SERIALIZE__(obj)
{
    var fooArray = new Array();
    var attrArray = new Array();
    
    // Find all functions and convert to string
    for (var attr in obj)
    {
        if (typeof(obj[attr]) === 'function')
        {
            fooArray.push(obj[attr].toString());
            attrArray.push(attr);
        }
    }
    
    // Obtain a copy of the object (ignoring functions)
    var json = JSON.stringify(obj);
    var copy = JSON.parse(json);
    
    // Replace the original functions by the strings
    for (var i = 0 ; i < fooArray.length ; i++)
    {
        copy[attrArray[i]] = '(' + fooArray[i] + ')';
    }
    
    // Add an array for function names
    copy.OBJ_FOO_NAMES = attrArray;
    
    var serialized = JSON.stringify(copy);
    
    return serialized;
}

// Convert a string to a class object
function __DESERIALIZE__(obj)
{
    var copy = JSON.parse(obj);
    
    if (typeof(copy.OBJ_FOO_NAMES) !== 'object')
    {
        throw 'Not a valid serialized CLASS object';
    }
    
    // Take function string and evaluate to obtain the originals
    for (var i = 0 ; i < copy.OBJ_FOO_NAMES.length ; i++)
    {
        var fooStr = copy[copy.OBJ_FOO_NAMES[i]];
        copy[copy.OBJ_FOO_NAMES[i]] = eval('(' + fooStr + ')');
    }
    
    delete copy.OBJ_FOO_NAMES;
    
    return copy;
}

function __PUSH_PAGE__(loader, pageid, screen)
{
    var name = screen.CLASS_NAME;
    
    // Create an instance of screen class and save it in the stack
    var callname = name + '.New()';
    var screenJS = eval(callname);

    // Add classes to new page
    $('#' + pageid).addClass(name);
    $('#' + pageid).find('*').addClass(name);
    $('#' + pageid).find('*').addClass(screenJS.OBJECT_UNIQUE_KEY);

    loader(pageid);         // execute loader callback
    screenJS.OnLoad();      // Screen OnLoad methode
    
    // Add screen to stack
    window.SCREEN_CLASS_STACK.push({screen: screenJS, baseurl: '#' + pageid, loader: loader});
}

function __POP_PAGE__(retdata)
{
    // It is the main screen, no one in the back
    if (window.SCREEN_CLASS_STACK.length <= 1)
    {
        return;
    }
    
    // Close the current screen
    var lastScreen = window.SCREEN_CLASS_STACK.pop();
    lastScreen.screen.OnClose();

    // Get de previus screen object
    var stackObj = window.SCREEN_CLASS_STACK.last();
    
    var pageid = stackObj.baseurl.substring(1);
    var lastPageId = lastScreen.baseurl.substring(1);
    
    // Remove last page events and classes
    $('#' + lastPageId).add("*").off();
    $('#' + lastPageId).removeClass(lastScreen.screen.CLASS_NAME);
    $('#' + lastPageId).find('*').removeClass(lastScreen.screen.CLASS_NAME);
    $('#' + lastPageId).find('*').removeClass(lastScreen.screen.OBJECT_UNIQUE_KEY);
    
    stackObj.loader(pageid);
    stackObj.screen.OnLoad();      // Screen OnLoad methode

    // Call the return function
    if (retdata !== null)
    {
        stackObj.screen.OnReturn(retdata);
    }
}

function __JQM_LOADER__(pageid)
{
    $.mobile.changePage('#' + pageid);
}

// Load Screen
function __LOAD_SCREEN__(name, baseurl, obj, readyCallBack, code)
{
    jQuery.ajaxSetup({async:false});
    
    var htmlurl = baseurl + "/" + name + ".html";
    var jsurl = baseurl + "/" + name + ".js";
    
    if (typeof(window[name]) !== 'undefined')        // Screen already loaded
    {
        // Get the hml from the cache list
        var html = window.SCREEN_HTML_LIST[name];
        var screenHtml = $('<div/>').html(html).find(".SCREEN_CONTAINER" + "#" + name);
        screenHtml.find('*').addClass(name);
        
        var callname = name + '.New()';
        var screenJS = eval(callname);

        screenHtml.find('*').addClass(screenJS.OBJECT_UNIQUE_KEY);
        
        // Run the callback
        $.proxy(readyCallBack, obj)(screenHtml.html(), screenJS, code);
                
        screenJS.OnLoad();
    }
    else                                            // Screen Not loade yet
    {
        // Load HTML
        $.get(htmlurl, function(html)
        {
            window.SCREEN_HTML_LIST[name] = html;
            
            // Extract the screen container
            var screenHtml = $('<div/>').html(html).find(".SCREEN_CONTAINER" + "#" + name);
            screenHtml.find('*').addClass(name);

            // Load JS
            $.getScript(jsurl, function(data, textStatus, jqxhr)
            {
                // Create an instance of screen
                var callname = name + '.New()';
                var screenJS = eval(callname);

                screenHtml.find('*').addClass(screenJS.OBJECT_UNIQUE_KEY);

                // Run the callback
                $.proxy(readyCallBack, obj)(screenHtml.html(), screenJS, code);

                screenJS.OnLoad();
            });
        });
    }
    
    jQuery.ajaxSetup({async:true});
}

// Push a Screen in the stack and show in body
function __PUSH_SCREEN__(name, baseurl)
{
    // Check for an existing screen ot be closed
    if (window.SCREEN_CLASS_STACK.length > 0)
    {
        var lastScreen = window.SCREEN_CLASS_STACK.last();
        lastScreen.screen.OnClose();
    }
        
    var destelement = $('body');

    if (typeof(window[name]) !== 'undefined')        // Screen already loaded
    {
        // Show HTML in the body
        var html = window.SCREEN_HTML_LIST[name];
        var screenHtml = $('<div/>').html(html).find(".SCREEN_CONTAINER" + "#" + name);
        screenHtml.find('*').addClass(name);
        
        // Create an instance of screen class and save it in the stack
        var callname = name + '.New()';
        var screenJS = eval(callname);
        
        screenHtml.find('*').addClass(screenJS.OBJECT_UNIQUE_KEY);
        destelement.html(screenHtml.html());
        
        screenJS.OnLoad();
        
        window.SCREEN_CLASS_STACK.push({screen: screenJS, baseurl: baseurl});
    }
    else                                            // Screen not loaded yet
    {
        var htmlurl = baseurl + "/" + name + ".html";
    
        // Load HTML
        $.get(htmlurl, function(html)
        {
            window.SCREEN_HTML_LIST[name] = html;
                        
            // Show HTML in the body
            var screenHtml = $('<div/>').html(html).find(".SCREEN_CONTAINER" + "#" + name);
            screenHtml.find('*').addClass(name);

            var jsurl = baseurl + "/" + name + ".js";

            // Load JS
            $.getScript(jsurl, function(data, textStatus, jqxhr)
            {
                // Create an instance of screen class and save it in the stack
                var callname = name + '.New()';
                var screenJS = eval(callname);
                
                screenHtml.find('*').addClass(screenJS.OBJECT_UNIQUE_KEY);
                destelement.html(screenHtml.html());
        
                screenJS.OnLoad();

                window.SCREEN_CLASS_STACK.push({screen: screenJS, baseurl: baseurl});
            });
        });
    }
}

// Pop a Screen from the stack and show in body
function __POP_SCREEN__(retdata)
{
    // It is the main screen, no one in the back
    if (window.SCREEN_CLASS_STACK.length <= 1)
    {
        return;
    }
    
    // Close the current screen
    var lastScreen = window.SCREEN_CLASS_STACK.last();
    lastScreen.screen.OnClose();
        
    var destelement = $('body');
    
    // Remove the current screen object
    window.SCREEN_CLASS_STACK.pop();

    // Get de previus screen object
    var stackObj = window.SCREEN_CLASS_STACK.last();
    
    var name = stackObj.screen.CLASS_NAME;
    var key = stackObj.screen.OBJECT_UNIQUE_KEY;

    // Get previous screen html
    var html = window.SCREEN_HTML_LIST[name];
    
    // Show HTML in the body
    var screenHtml = $('<div/>').html(html).find(".SCREEN_CONTAINER" + "#" + name);
    screenHtml.find('*').addClass(name);
    screenHtml.find('*').addClass(key);
    
    destelement.html(screenHtml.html());
    
    // Init screen object
    stackObj.screen.OnLoad();
    
    // Call the return function
    if (retdata !== null)
    {
        stackObj.screen.OnReturn(retdata);
    }
}

// Load a class
function __LOAD_CLASS__(name, baseurl, obj, readyCallBack)
{
    var jsurl = baseurl + "/" + name + ".js";

    if (typeof(window[name]) === 'undefined')
    {
        jQuery.ajaxSetup({async:false});
        
        // Load JavaScript class
        $.getScript(jsurl, $.proxy(readyCallBack, obj));
        
        jQuery.ajaxSetup({async:true});
        
        return true;
    }
    else
    {
        // Class already loaded
        return false;
    }
}

// Callback in the obj context setting the original 'this' as argument
function __CALLBACK__(obj, callback)
{
    return function()
    {
        $.proxy(callback, obj)(this);
    };
}

// Get an element of a screen by a selector
function __REF__(obj, selector)
{
    return $(selector + '.' + obj.CLASS_NAME + '.' + obj.OBJECT_UNIQUE_KEY);
}

// Set click event delegate
function __CLICK__(obj, delegate, selector)
{
    __REF__(obj, selector).click(function()
    {
        $.proxy(delegate, obj)(this);
    });
}

// Set list click event delegate
function __LIST_CLICK__(obj, delegate, selector)
{
    __REF__(obj, selector).on('click', 'li', function()
    {
        $.proxy(delegate, obj)(this);
    });
}

// Element changed delegate
function __CHANGE__(obj, delegate, selector)
{
    __REF__(obj, selector).on('change', function()
    {
        $.proxy(delegate, obj)(this);
    });
}

// Set checkbox/radio click event delegate
function __CHECKER_CLICK__(obj, delegate, selector, type)
{
    __REF__(obj, selector).on('click', 'input[type=' + type + ']', function()
    {
        $.proxy(delegate, obj)(this);
    });
}

// Set mouse ter delegate
function __MOUSE_ENTER__(obj, delegate, selector)
{
    __REF__(obj, selector).mouseenter(function()
    {
        $.proxy(delegate, obj)(this);
    });
}

// Set mouse leave delegate
function __MOUSE_LEAVE__(obj, delegate, selector)
{
    __REF__(obj, selector).mouseleave(function()
    {
        $.proxy(delegate, obj)(this);
    });
}

// Set mouse down delegate
function __MOUSE_DOWN__(obj, delegate, selector)
{
    __REF__(obj, selector).mousedown(function()
    {
        $.proxy(delegate, obj)(this);
    });
}

// Set mouse up delegate
function __MOUSE_UP__(obj, delegate, selector)
{
    __REF__(obj, selector).mouseup(function()
    {
        $.proxy(delegate, obj)(this);
    });
}

// Set mouse move delegate
function __MOUSE_MOVE__(obj, delegate, selector)
{
    __REF__(obj, selector).mousemove(function()
    {
        $.proxy(delegate, obj)(this);
    });
}

// Register a broadcast receiver
function __REGISTER_RECEIVER__(obj, delegate, filter)
{
    var broadcastObj = {callback: $.proxy(delegate, obj), filter: filter, id: Math.random()};
    window.BROADCAST_REGISTER_ARRAY.push(broadcastObj);
    
    return broadcastObj.id;
}

// Unregister a broadcast receiver
function __UNREGISTER_RECEIVER__(receiver)
{
    for (var i = 0 ; i < window.BROADCAST_REGISTER_ARRAY.length ; i++)
    {
        if (window.BROADCAST_REGISTER_ARRAY[i].id === receiver)
        {
            window.BROADCAST_REGISTER_ARRAY.remove(i);
            return;
        }
    }
}

// Send broadcast message
function __SEND_BROADCAST__(filter, message, massive)
{
    // Make a copy of the array to avoid problems when others change it
    var arrCopy = window.BROADCAST_REGISTER_ARRAY.slice();
    
    for (var i = 0 ; i < arrCopy.length ; i++)
    {
        if (arrCopy[i].filter === filter)
        {
            if (massive)
            {
                arrCopy[i].callback(message);
            }
            else
            {
                // If ordered broadcast and callback returns true, halt broadcast
                if (arrCopy[i].callback(message)) return;
            }
        }
    }
}
