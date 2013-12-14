/* 
 * Screens.js - v0.9b
 * Copyright (C) 2013 Andreu Santaren Llop
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
    window.SCREEN_STACK = new Array();
}

// Create a class
function __CLASS__(name, obj1, obj2)
{
    if (obj2 !== undefined)            // New class by heritance
    {
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
            if (typeof(this.Super) !== 'undefined')
            {
                // Trying to create an object from an object, instead of a class
                return null;
            }
            
            var newObj = __CLONE__(this);

            newObj.OBJECT_UNIQUE_KEY = Math.floor(Math.random() * 10000000000000000).toString();
            newObj['Init'].apply(newObj, arguments);
            
            if (newObj.CLASS_TYPE.length > 1)   // It is a subclass of something, create the Super
            {
                var baseClassName = newObj.CLASS_TYPE.last();
                
                var callname = '__CLONE__(' + baseClassName + ')';
                var parentObj = eval(callname);
                
                newObj.Super = parentObj;
            }
            else
            {
                newObj.Super = null;
            }
            
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

// Base class
__CLASS__('SCRObject',
{
    Clone: function(obj)
    {
        return __CLONE__(obj);
    },
    
	Serialize: function(obj)
	{
		return __SERIALIZE__(obj);
	},

	Deserialize: function(obj)
	{
		return __DESERIALIZE__(obj);
	},
	
    LoadClass: function(name, baseurl, readyCallBack)
    {
        return __LOAD_CLASS__(name, baseurl, this, readyCallBack);
    },
    
    UnloadClass: function(classname)
    {
        return delete window[classname];
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

// Base class for screens
__CLASS__('Screen', SCRObject,
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
    
    PushScreen: function(loader, selector, screen)
    {
        __PUSH_SCREEN__(loader, selector, screen);
    },
    
    PopScreen: function(retdata)
    {
        __POP_SCREEN__(retdata);
    },
    
    JQMLoader: function(pageSelector)
    {
        __JQM_LOADER__(pageSelector);
    },
    
    SetHtml: function(selector, html)
    {
	    __SET_HTML__(this, selector, html);
    },
    
    Brand: function(selector)
    {
	    __BRAND__(seletor, this);
    },
    
    Unbrand: function(selector)
    {
	    __UNBRAND__(selector);
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
    }
});

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
        throw 'Not a valid serialized object';
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

function __PUSH_SCREEN__(loader, selector, screen)
{
    var name = screen.CLASS_NAME;
    
    // Create an instance of screen class and save it in the stack
    var callname = name + '.New()';
    var screenObj = eval(callname);

    __BRAND__(selector, screenObj);

    loader(selector);    	// execute loader callback
    screenObj.OnLoad();      // Screen OnLoad methode
    
    // Add screen to stack
    window.SCREEN_STACK.push({screen: screenObj, baseurl: selector, loader: loader});
}

function __POP_SCREEN__(retdata)
{
    // It is the main screen, no one in the back
    if (window.SCREEN_STACK.length <= 1)
    {
        return;
    }
    
    // Close the current screen
    var lastScreen = window.SCREEN_STACK.pop();
    lastScreen.screen.OnClose();

    // Get de previus screen object
    var stackObj = window.SCREEN_STACK.last();
    
    var pageSelector = stackObj.baseurl;
    var lastPageSelector = lastScreen.baseurl;
    
    // Disable all events
    $(lastPageSelector).add("*").off();
    
    __UNBRAND__(lastScreen.screen);

    stackObj.loader(pageSelector);
    stackObj.screen.OnLoad();      // Screen OnLoad methode

    // Call the return function
    if (retdata !== null)
    {
        stackObj.screen.OnReturn(retdata);
    }
}

function __JQM_LOADER__(pageSelector)
{
    $.mobile.changePage(pageSelector);
}

// Insert HTML in the DOM and update screen classes
function __SET_HTML__(screen, selector, html)
{
	__REF__(screen, selector).html(html);
    __BRAND__(selector, screen);
}

// Set the Screens brand for a piece of DOM
function __BRAND__(selector, screen)
{
	$(selector).attr('screensclass', screen.CLASS_NAME);
    $(selector).attr('screensid', screen.OBJECT_UNIQUE_KEY);
	$(selector).find('*').attr('screensclass', screen.CLASS_NAME);
    $(selector).find('*').attr('screensid', screen.OBJECT_UNIQUE_KEY);
}

// Remove the Screens brand
function __UNBRAND__(selector)
{
	$(selector).removeAttr('screensclass');
    $(selector).removeAttr('screensid');
	$(selector).find('*').removeAttr('screensclass');
    $(selector).find('*').removeAttr('screensid');
}

// Load a class
function __LOAD_CLASS__(name, baseurl, obj, readyCallBack)
{
    var jsurl = baseurl + "/" + name + ".js";

    if (typeof(window[name]) === 'undefined')
    {
        if (readyCallBack == null)
        {
            jQuery.ajaxSetup({async:false});
            
            // Load JavaScript class
            $.getScript(jsurl);
            
            jQuery.ajaxSetup({async:true});
            
            return true;            
        }
        else
        {
            // Load JavaScript class
            $.getScript(jsurl, $.proxy(readyCallBack, obj));
            
            return true;  
        }
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
    return $(
    			"[screensclass='" + obj.CLASS_NAME + "']" +
    			"[screensid='" + obj.OBJECT_UNIQUE_KEY + "']" +
    			selector
    		);
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
	__REF__(obj, selector).find('input[type=' + type + ']').on('click', function()
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
