# Screens.js

*Real OOP, MVC and Messaging for Javascript.*

### Overview

Screens.js is a Javascript library that offers full featured Object Oriented Programming, Model View Controller and Broadcast Messaging. It is based on JQuery and supports different UI backends, mainly JQuery Mobile and Bootstrap, but could be easily extended to use any other UI library.

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
		
		anotherFoo: function(name)
		{
			alert("Another " + this.salute + " " + name);
		}
	});

The resulting class contains all methodes and propierties of the original NewClass plus the AnotherClass ones. The methodes and propierties with the same name are overwritten, in this case, the constructor.

### 2. Model View Controller

In Screens.js everything is based on the concept of screen. A screen is basically an instance of the **Screen** class and a piece of HTML working together. Let's see a very basic screen. First the HTML part, **index.html**:

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
				$(document).ready(function()
				{
					// Push the first screen on the stack
					Screen.PushScreen(Screen.JQMLoader, '#mainpage', BasicScreen)
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
				$(document).ready(function()
				{
					Screen.PushScreen(Screen.JQMLoader, '#page0', ReceiverScreen);
					Screen.PushScreen(Screen.JQMLoader, '#senderpage', SenderScreen);
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

#### jqm_examples

That's the folder where are located all the examples of using Screens.js with JQuery Mobile backend.

#### jqm_examples/example01.html

Basic behaviour and screen navigation.

#### jqm_examples/example02.html

Event handling.

#### jqm_examples/example03.html

Dynamic html, lists.

#### jqm_examples/example04.html

Message broadcasting.

TODO: Example of using popups and dialogs with screens.

TODO: Example for Bootstrap.
