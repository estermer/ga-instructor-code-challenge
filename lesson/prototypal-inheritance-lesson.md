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

So what is going on here?

First we have our `Car` and `Mustang` constructor functions and we are creating a instance of `Mustang` called `blueMustang` which we are setting the color of blue as an argument.

But, we called `makeSound()` on our blue mustang even though it doesn't contain the `makeSound()` function in it. Yet, we should still see in our console "vrooooom!" logged because of the Prototype Chain.

When we set `Mustang.prototype` to `Object.create(Car.prototype)` we are creating a new Object based on the "Car"'s prototype and setting it to the "Mustang"'s prototype creating a chain of dependencies.

When we called `blueMustang.makeSound()`, JavaScript was looking in the `Mustang` object first to see if `makeSound()` is there, if not then it checks the parent prototype for `makeSound()` which we set as `Car`. JavaScript sees that `makeSound()` resides in `Car` and calls it.

### Conclusion - 1 min

1. What other examples can you come up with where we could use prototypal inheritance?
2. Do you see prototypal inheritance providing greater flexability and structure to your code?
