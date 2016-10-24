# JavaScript Prototypal Inheritance

### Student Objectives
- Demonstrate a use case for prototypal inheritance
- Demonstrate what kind of flexability prototypal inheritance provides programmers

### Preparation
before this lesson, students should know about:

- variables
- functions
- callbacks
- objects

### Intro - 2 mins

To start let's take a moment to generally review what an object is.

Objects can be anything. Take cars for example.

There are all different kinds of cars: Honda's, Toyotas, Fords, Chevys.

![car brands](http://images.thetruthaboutcars.com/2011/07/car-logos.jpg)

Yet there are many things that each car has in common: 4 wheels, engine, mufflers, fuel type, etc.

![car parts](https://www.easypacelearning.com/design/images/carparts.jpg)

As coders, we are always looking for ways to DRY up our code. 

Remember DRY stands for `Dont Repeat Yourself`.

Prototypal inheritance is one way which we can do this.

### Constructor Functions - 4 mins

So in the past, we have covered objects and we covered functions. What is neat in JavaScript, functions can act like objects.

So if we create a function, we can add properties on that function like we do an object. So lets try that out.

```
function car(){
};

car.sound = "vrooooom!";
```

When we console.log `car` we see that we get a function, but if console.log `car.sound` then we see our string "vrooooom!".

From this idea that functions operate as objects, we can create something called a Constructor Function. A Constructor Function allow us to create multiple instances of the same object. 

To do this, we use a standard naming convention where we capitalize the first letter of the functions name, add properties to it, then create an instance of it using the `new` keyword.

```
function Car(){
  this.sound = "vrooooom!";//the this keyword refers to the newly created object that is created
};

var car = new Car();//the new keyword allows us to create a new instance of the Car
```

What if we wanted to create different cars based on the make which possess certain qualities that a specific to the manufacturer?

Well lets start by doing as we did before, but we are going to pass arguments to the constructor to set it properties when we create the new instance of the object...

```
function Car(make, model){
  this.make = make;
  this.model = model;
  //here we are passing in arguments to our constructor and setting it to
  //the properties of the objects instance
};

var mustang = new Car('Ford', 'Mustang');
```

If I was to console.log `mustang.make` and `mustang.model` we should see "Ford Mustang".

### Inheritance - 8 mins

Remembering what I mentioned before, Mustangs have similar features that can be found in all cars. So lets think about how we can set up our constructor functions that represent our object heirarchy.

```
function Car(){
  this.makeSound = function(){
    console.log("vroooooom!");
  };
};

function Mustang(color){
  this.model = 'Mustang';
  this.color = color
};
```

If we want to now, we can create different color mustangs.

```
var redMustang = new Mustang('red');
var blueMustang = new Mustang('blue');
```

There are different car models out there too such as a Corolla.

```
function Corolla(color){
  this.model = 'Corolla';
  this.color = color
};

var silverCorolla = new Corolla('silver');
```

So, how can we connect all instances of Corollas and all instances of Mustangs to make the same sound `"vrooooom!"`?

We do this with prototypal inheritance.

First we add the method to the constructors prototype.

```
function Car(){

};

Car.prototype.makeSound = function(){
  console.log("vroooooom!");
};
```

Then we need to add connect the Mustangs prototype as a new instance of the Car prototype.

```
Mustang.prototype = Object.create(Car.prototype);
Corolla.prototype = Object.create(Car.prototype);
```

Now we can access the Car's method in both Corolla and Mustang instances. Let's try it.

```
redMustang.makeSound();
silverCorolla.makeSound();
```

So what is going on here?

We were able to call `makeSound()` on our red mustang and silver corolla even though it doesn't contain the `makeSound()` method because of something called the Prototype Chain.

When we set `Mustang.prototype` and `Corolla.prototype` to the new Object instance of the `Car.prototype`, we are linking a chain of dependencies.

When we called `redMustang.makeSound()`, JavaScript was looking in the `Mustang` object first to see if `makeSound()` is there.

If it is not there, then it checks the parent prototype for the `makeSound()` method. JavaScript sees that `makeSound()` resides in `Car` and calls it.

For prototypes, JavaScript will check as far up a chain it need to to find the property it is looking for. If it reaches the end of the chain without finding it, the result will be undefined.

### Conclusion - 1 min

1. What other examples can you come up with where we could use prototypal inheritance?
2. Do you see prototypal inheritance providing greater flexability and structure to your code?
