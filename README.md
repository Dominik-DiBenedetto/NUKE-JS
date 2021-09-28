# NUKE-JS
The newest JavaScript Framework.
## [NOTE] Nuke JS Is Always Happy To Hear Feedback and Thoughts on Features You Guys Think Should Be Added!

## About
The first thing you should know is there are two ways to use NUKE JS, we'll get into that in a little for now let me introduce you to the benefits of using NUKE > Vanilla JS or Other Frameworks. You should know all frameworks have their pros and cons, really it all comes down to personal prefrence. So many times I feel like using a framework such as react for my project is just overkill and a hassel for the scale project im making. With nuke I feel as it is much more reasonable for a small-scale project and possibly a large scale project (overtime NUKE will get more features making it more and more effective for larger-scale projects too). Because of the fact that all you need is an import cdn to use NUKE I feel it is much easier, especially for newer programmers. NUKE can also easily be used along-side other Frameworks because of this reason.

### NUKE Syntax 
While developing NUKE I tried to keep the syntax as clean, and descriptive as possible, while also not taking away any possible variable/function names due to the fact **nuke functions** start with with .NUKE . Thats all for the syntax section, **more syntax will be covered in the individual HTML-Binding and Pure JS sections.**

## HTML-Binding w/ JS  or Pure JS
Thats right we have HTML-Binding w/ JS or Pure JS

### Whats the difference
####The HTML-Binding allows you to use custom attributes like
```javascript
nuke-controller
```
```javascript
nuke-bind
```
```javascript
nuke-bind-val
```
```javascript
nuke-bind-msg
```
####Using The Pure JS Version Everything Will Be Rendered In Javascript, using a function that returns the HTML Code To Display.
**Example:**
```javascript
const root = document.querySelector('.root1')
function App(){
  return `
    <div>
      <h1>Hello, World!</h1>
    </div>
  `
}
NUKE.render(App(), root)
```
We'll dive deeper into the syntax in a bit.
-----------------------------------------------------------
So now, which one is right for you? Well it really comes down to personal prefrence. I would always recommend the Pure JS (especially for more advanced programmers) as it has more features, the HTML Based one is still great but when your making a bigger scale app you would need the extra functionality. The HTML one is more pointed towards beginners, but anyone that knows the basics of Javascript can easily pull of the Pure JS due to its straight-foward syntax.


## HTML Based NUKE JS
Okay Okay I've been talking about it for a while so let me show you how to use the HTML Based NUKE JS

Before we begin open up a new HTML file and link it to a blank JS file (I like to use filename.nuke.js when using NUKE for file orginization)
###Creating a controller
So to actually be able to use these custom attributes mentioned earlier you need a controller-div to wrap around your elements (with the custom attributes). 
**[NOTE] You can create as many controllers as you want.**

To make a controller first make a div
```html
<div>
    
</div>
```
Next add a nuke-controller attribute and set it equal to your controller name. In my example I will make an input controller:
```html
<div nuke-controller="InputController">
    
</div>
```
Cool! You added a nuke-controller attribute but it doesn't actually do anything yet, let's change that!
Open your Javascript file and lets first tell nuke to create that controller by calling 
```Javascript
NUKE.controller('ControllerName', setUpFunc)
```
Okay the first parameter of NUKE.controller is the controller name, make this the same as what you put in your nuke-controller attribute.
Parameter 2 is a function to call when the controller gets created.
So the goal of this example is to make an input field that when typed changes the text of a header
Here is what my code will look like for my controller:

```Javascript
function Controller () {
    this.text = 'Text';
}
  
const controller = NUKE.controller('InputController', Controller);
```

So I made the InputController and gave it the Controller function which creates a text variable in the controller you can also make variables using ```
```Javascript
controller.varName = varValue
```
#### [IMPORTANT NOTE]: The controller is an object so to access its functions and variables you need to use controller.var
