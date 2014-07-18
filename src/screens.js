/* 
 * Screens.js - v1.0
 * Copyright (C) 2013-2014 Andreu Santaren Llop
 */

// Init Screens.js library
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
function __CONTEXT_CLASS__(context, name, obj1, obj2)
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
        
        // Create the variable for the class
        context[name] = _asc_;
        return _asc_;
    }
    else                        // New base class
    {
        // Init base methods
        obj1.New = function()
        {
            var newObj = __CLONE__(this);
            
            delete newObj.New;

            newObj.OBJECT_UNIQUE_KEY = new Date().getTime().toString() + Math.floor(Math.random() * 10000000000000000).toString();
            
            // Call constructor
            newObj['Init'].apply(newObj, arguments);
            
            return newObj;
        };
        
        obj1.Super = function(elementName)
        {
            var superClass = this.CLASS_TYPE.last();
            
            if (superClass === "__CLASS__")
            {
                return null;
            }
            else
            {
                var object = __CLONE__(eval(superClass));
                
                if (elementName == null)
                {
                    return object;
                }

                for (var attr in object)
                {
                    if (attr === elementName)
                    {
                        if (typeof(object[attr]) === 'function')
                        {
                            return $.proxy(object[attr], this);
                        }
                        else
                        {
                            return null;
                        }
                    }
                }
                
                return null;
            }
        };
        
        if (!('Init' in obj1))
        {
            obj1.Init = function() {};
        }

        // Init base properties
        obj1.CLASS_TYPE = new Array("__CLASS__");
        obj1.CLASS_NAME = name;

        // Create the variable for the class
        context[name] = obj1;
        return obj1;
    }
}

// Create a class in the global context
function __CLASS__(name, obj1, obj2)
{
    return __CONTEXT_CLASS__(window, name, obj1, obj2);
}

// Base class
__CLASS__('Obj',
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
	
	Merge: function(org, dest)
	{
    	__MERGE__(org, dest);
	},
	
    Copy: function(org, dest)
	{
    	__COPY__(org, dest);
	},
	
    LoadClass: function(name, baseurl, readyCallBack)
    {
        return __LOAD_CLASS__(name, baseurl, this, readyCallBack);
    },
    
    UnloadClass: function(classname)
    {
        return __UNLOAD_CLASS__(classname);
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
    },
    
    SendMessage: function(filter, message)
    {
        return __SEND_MESSAGE__(filter, message);
    },
    
    FindReceiver: function(receiver)
    {
        return __FIND_RECEIVER__(receiver);
    }
});

// Base class for screens
__CLASS__('Screen', Obj,
{
    Selector: null,
    
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
    
    PushScreen: function(selector, screen, sentdata, loader, args)
    {
        __PUSH_SCREEN__(selector, screen, sentdata, loader, args);
    },
    
    PopScreen: function(retdata, args)
    {
        __POP_SCREEN__(retdata, args);
    },
    
    SetScreen: function(selector, screen, sentdata)
    {
        return __SET_SCREEN__(selector, screen, sentdata);
    },
    
    UnsetScreen: function(selector, screenObj)
    {
        __UNSET_SCREEN__(selector, screenObj);
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
    
    DoubleClick: function(delegate, selector)
    {
        __DOUBLE_CLICK__(this, delegate, selector);
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

// Merge propierties of org object to dest object
function __MERGE__(org, dest)
{
    for (var attr in org)
    {
        if (attr != 'CLASS_NAME' && attr != 'CLASS_TYPE' && attr != '__proto__')
        {
            dest[attr] = org[attr];
        }
    }
}

// Copy propierties of org object to dest object
function __COPY__(org, dest)
{
    for (var attr in org)
    {
        if (attr != 'CLASS_NAME' && attr != 'CLASS_TYPE' && attr != '__proto__')
        {
            if (dest[attr] !== undefined)
            {
                dest[attr] = org[attr];
            }
        }
    }
}

function __PUSH_SCREEN__(selector, screen, sentdata, loader, args)
{
    var name = screen.CLASS_NAME;
    
    // Create an instance of screen class and save it in the stack
    var callname = name + '.New()';
    var screenObj = eval(callname);

    __BRAND__(selector, screenObj);

    if (loader != null)
    {
        loader(selector, args);     // execute loader callback
    }
    
    screenObj.Selector = selector;
    screenObj.OnLoad(sentdata);     // Screen OnLoad methode
    
    // Add screen to stack
    window.SCREEN_STACK.push({screen: screenObj, selector: selector, loader: loader});
}

function __POP_SCREEN__(retdata, args)
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
    
    var pageSelector = stackObj.selector;
    var lastPageSelector = lastScreen.selector;
    
    // Disable all events
    $(lastPageSelector).add("*").off();
    
    __UNBRAND__(lastScreen.selector);

    if (stackObj.loader != null)
    {
        stackObj.loader(pageSelector, args);
    }
    
    stackObj.screen.OnLoad();      // Screen OnLoad methode

    // Call the return function
    if (retdata !== null)
    {
        stackObj.screen.OnReturn(retdata);
    }
}

// Set a Screen class to control a part of an existing page
function __SET_SCREEN__(selector, screen, sentdata)
{
    // Disable all events
    $(selector).find("*").off();
    
    // Create an instance of screen class and save it in the stack
    var screenObj = eval(screen.CLASS_NAME + '.New()');

    __BRAND__(selector, screenObj);

    screenObj.Selector = selector;
    screenObj.OnLoad(sentdata);     // Screen OnLoad methode
    
    return screenObj;
}

function __UNSET_SCREEN__(selector, screenObj)
{
    // Disable all events
    $(selector).add("*").off();
    
    __UNBRAND__(selector);
    
    screenObj.OnClose();
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

function __UNLOAD_CLASS__(classname)
{
    if (typeof(classname) === 'string')
    {
        return delete window[classname];
    }
    else
    {
        return false;
    }
}

// Callback in the obj context setting the original 'this' as argument
function __CALLBACK__(obj, callback)
{
    return function(args)
    {
        return $.proxy(callback, obj)(this, args);
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
    __REF__(obj, selector).click(__CALLBACK__(obj, delegate));
}

// Set double click event delegate
function __DOUBLE_CLICK__(obj, delegate, selector)
{
    __REF__(obj, selector).dblclick(__CALLBACK__(obj, delegate));
}

// Set list click event delegate
function __LIST_CLICK__(obj, delegate, selector)
{
    __REF__(obj, selector).on('click', 'li', __CALLBACK__(obj, delegate));
}

// Element changed delegate
function __CHANGE__(obj, delegate, selector)
{
    __REF__(obj, selector).on('change', __CALLBACK__(obj, delegate));
}

// Set checkbox/radio click event delegate
function __CHECKER_CLICK__(obj, delegate, selector, type)
{
	__REF__(obj, selector).find('input[type=' + type + ']').on('click', __CALLBACK__(obj, delegate));
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

// Send message and return result
function __SEND_MESSAGE__(filter, message)
{
    // Make a copy of the array to avoid problems when others change it
    var arrCopy = window.BROADCAST_REGISTER_ARRAY.slice();
    
    for (var i = 0 ; i < arrCopy.length ; i++)
    {
        if (arrCopy[i].filter === filter)
        {
            // Execute the first ocurrence of 'filter' and return the result
            return arrCopy[i].callback(message);
        }
    }
    
    return null;
}

// Return the receiver object for a certain receiver id
function __FIND_RECEIVER__(receiver)
{
    for (var i = 0 ; i < window.BROADCAST_REGISTER_ARRAY.length ; i++)
    {
        if (window.BROADCAST_REGISTER_ARRAY[i].id === receiver)
        {
            return window.BROADCAST_REGISTER_ARRAY[i];
        }
    }
}
