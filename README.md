# Screens.js

*Real OOP, MVC and Messaging for Javascript.*

### Overview

Screens.js is a Javascript library that offers full featured Object Oriented Programming, Model View Controller and Broadcast Messaging. It is based on JQuery and supports almost any UI library as a graphical backend, just like JQuery Mobile, Bootstrap or JQuery UI.

### Contents

1. Object Oriented Programming
2. Model View Controller
3. Messaging
4. Learn By Examples

### 1. Object Oriented Programming

To create a new class just write a **NewClass.js** file like it:

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

And use it on a simple **index.html** file:

	<!DOCTYPE html>
	<html>
		<head>
			<!-- JQuery is needed -->
			<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
			
			<!-- Screens.js library -->
			<script src="screens.js"></script>
		
			<!-- Load classes we will use -->
			<script src="NewClass.js"></script>
		
			<script>
				$(document).ready(function()
				{
					var newObj1 = NewClass.New();
					newObj1.foo('Joe');
					
					var newObj2 = NewClass.New();
					newObj2.salute = 'Bye';
					newObj2.foo('Tom');
				});
			</script>
		
		</head>
		<body>
			<div>...</div>
		</body>
	</html>

Inheritance works in a similar way, creating **AnotherClass.js**:

	__CLASS__('AnotherClass', NewClass,
	{
		Init: function()
		{
			alert("AnotherClass constructor");
		},
		
		foo: function(name)
		{
			alert("Another " + this.salute + " " + name);
			this.Super('foo')(name);
		}
	});

The resulting class contains all methods and propierties of the original NewClass plus the AnotherClass ones. The methods and propierties with the same name are overwritten. The Super method gives access to the superclass elements.

### 2. Model View Controller

In Screens.js everything is based on the concept of screen. A screen is basically an instance of the **Screen** class and a piece of HTML working together. It's analogous to the concepto of Activity in Android or ViewController in iOS. Let's see a very basic screen. First the HTML part, **index.html**:

	<!DOCTYPE html>
	<html>
		<head>
			<!-- JQuery is needed -->
        	<link rel="stylesheet" href="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.css" />
	        <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
    	    <script src="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.js"></script>
        			
			<!-- Screens.js library -->
			<script src="screens.js"></script>
		
			<!-- Load classes we will use -->
			<script src="BasicScreen.js"></script>
		
			<script>
				function jqmLoader(selector)
            	{
                	$.mobile.changePage(selector);
            	}
            	
				$(document).ready(function()
				{
					// Push the first screen on the stack
					Screen.PushScreen('#mainpage', BasicScreen, null, jqmLoader)
				});
			</script>
		
		</head>
		<body>
			<div data-role="page" id="mainpage">
            	<div data-role="content">
                	<button id="myButton">Click it</button>
	            </div>
    	    </div>
		</body>
	</html>

Now the Screen class, **BasicScreen.js**:

	__CLASS__('BasicScreen', Screen,
	{
		OnLoad: function()
		{
			this.Click(this.buttonClick, '#myButton');
		},
		
		buttonClick: function(sender)
		{
			alert("Click!");
		}
	});

### 3. Messaging

The messaging system allows objects to communicate to each others without the need to have a reference to the object itself.

Let's see the **ReceiverScreen.js**:

	__CLASS__('ReceiverScreen', Screen,
	{
		receiver: null,
		
		OnLoad: function()
		{
			this.receiver = this.RegisterReceiver(this.broadcastReceiver, 'MYFILTER');
		},
		
		OnClose: function()
	    {
        	this.UnregisterReceiver(this.receiver);
    	},
    	
		broadcastReceiver: function(message)
		{
			alert('Message received = ' + message);
    	    return true;       // halt broadcast (if it is ordered)
	    }
	});

The **SenderScreen.js**:

	__CLASS__('SenderScreen', Screen,
	{
		OnLoad: function()
		{
			this.Click(this.buttonClick, '#myButton');
		},
		
		buttonClick: function(sender)
		{
			this.SendOrderedBroadcast('MYFILTER', 'Helo World!');
		}
	});

And the **index.html**:

	<!DOCTYPE html>
	<html>
		<head>
			<!-- JQuery is needed -->
        	<link rel="stylesheet" href="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.css" />
	        <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
    	    <script src="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.js"></script>
        			
			<!-- Screens.js library -->
			<script src="screens.js"></script>
		
			<!-- Load classes we will use -->
			<script src="ReceiverScreen.js"></script>
			<script src="SenderScreen.js"></script>
		
			<script>
			  	function jqmLoader(selector)
            	{
                	$.mobile.changePage(selector);
            	}
            	            	
				$(document).ready(function()
				{
					Screen.PushScreen('#page0', ReceiverScreen, null, jqmLoader);
					Screen.PushScreen('#senderpage', SenderScreen, null, jqmLoader);
				});
			</script>
		
		</head>
		<body>
			<div data-role="page" id="page0">
            	<div data-role="content">
	            </div>
    	    </div>
			<div data-role="page" id="senderpage">
            	<div data-role="content">
                	<button id="myButton">Send Message</button>
	            </div>
    	    </div>
		</body>
	</html>

Using a SendBroadcast instead of a SendOrderedBriadcast will result in a massive message broadcasting to all receivers matching the filter.

### 4. Learn By Examples

You can find the examples inside the **src** directory.

#### general_examples

General examples of using the library.

#### general_examples/example01.html

Basic class definition and usage.

#### general_examples/example02.html

Contexts in class definitions.

#### general_examples/example03.html

Class inheritance, subclass and superclass.

#### general_examples/example04.html

Broadcast messaging.

#### general_examples/example05.html

Loading and unloading classes dynamically.

#### jqm_examples

Examples of using Screens.js with JQuery Mobile backend.

#### jqm_examples/example01.html

Basic behaviour and screen navigation.

#### jqm_examples/example02.html

Event handling.

#### jqm_examples/example03.html

Dynamic html, lists.

#### jqm_examples/example04.html

Message broadcasting.

#### jqm_examples/example05.html

Loading subscreens.

#### jqm_examples/example06.html

Returning data from a screen.

#### jqm_examples/example07.html

Custom events and callbacks.

#### jqm_examples/example08.html

Crating popups.

#### jqm_examples/example09.html

Passing arguments to the loader.

#### bootstrap_examples

Examples of using Screens.js with Bootstrap backend.

#### bootstrap_examples/example01.html

Basic screen navigation

#### bootstrap_examples/example02.html

Screen navigation using menus.

#### bootstrap_examples/example03.html

Delegation.

#### app_calculator

Application example: calculator with JQM and Bootstrap UI.

#### app_paint

Application example: paint program with Bootstrap.
