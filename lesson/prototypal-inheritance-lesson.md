# JavaScript Protoypal Inheritance

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

When thinking about prototypal inheritance, I think of cars. 

There are all different kinds of cars: Honda's, Toyotas, Fords, Chevys.

![car brands](http://images.thetruthaboutcars.com/2011/07/car-logos.jpg)

Yet there are different things that each car has in common: 4 wheels, engine, mufflers, fuel type, etc.

![car parts](https://www.easypacelearning.com/design/images/carparts.jpg)

As coders, we are always looking for ways to DRY up our code. Prototypal inheritance is one way which we can do this.

### Constructor Functions - 7 mins

In JavaScript Functions can act as objects. So if we create a function, we can add a property on that function like we do an object.

```
function car(){
};

car.sound = "vrooooom!";
```

When we console.log `car` we see that we get a function, but if console.log `car.sound` then we see our string "vrooooom!".

With this we can create Constructor Functions to create multiple instances of an object that contain the same properties. To do this, we use a standard naming convention where we capitalize the first letter of the functions name, add properties to it, then create an instance of it using the `new` keyword.

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

### Inheritance - 6 mins

Looking at both of these examples of contructor functions, you might be picking up that if you wanted to created a butnch of cars that are of the same make and model, they must all make the same sound.

This is where protoypal inheritance comes in. 

Lets code this out first:

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

Mustang.prototype = Object.create(Car.prototype);

var blueMustang = new Mustang('blue');

blueMustang.makeSound();
```
