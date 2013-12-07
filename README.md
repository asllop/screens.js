Screens.js
==========

Real OOP, MVC and Messaging for Javascript.

### Overview

Screens.js is a Javascript library that offers full featured Object Oriented Programming, Model View Controller and Broadcast Messaging. It is based on JQuery and supports different UI backends, mainly JQuery Mobile and Bootstrap, but could be easily extended to use any other UI library.

### Contents

1. Object Oriented Programming
2. Model View Controller
3. Messaging

### 1. Object Oriented Programming

To create a new class just write a **NewClass.js** file like it:

	__CLASS__('NewClass',
	{
		salute: "Hi",
		
		Init: function()
		{
			console.log("Init NewClass");
		},
		
		foo: function(name)
		{
			console.log(this.salute + " " + name);
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

### 2. Model View Controller

TODO

### 3. Messaging

TODO
