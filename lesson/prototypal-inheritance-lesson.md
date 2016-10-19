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

### Intro - 2 minutes

When thinking about prototypal inheritance, I think of cars. 

There are all different kinds of cars: Honda's, Toyotas, Fords, Chevys.

![car brands](http://images.thetruthaboutcars.com/2011/07/car-logos.jpg)

Yet there are different things that each car has in common: 4 wheels, engine, mufflers, fuel type, etc.

![car parts](https://www.easypacelearning.com/design/images/carparts.jpg)

As coders, we are always looking for ways to DRY up our code. Prototypal inheritance is one way which we can do this.

### Constructor Functions - 3 minutes

In JavaScript Functions can act as objects. So if we create a function, we can add a property on that function like we do an object.

```
function car(){
};

car.sound = "vrooooom!";
```

When we console.log `car` we see that we get a function, but if console.log `car.sound` then we see our string "vrooooom!".




