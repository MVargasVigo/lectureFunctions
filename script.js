'use strict';

//Defalut Parameters: to create default parameters in functions, we simply add an equal sign next to the name of the parameter, followed by the default value of the parameter. For exmaple:

const exampleFunction = function (parameter1 = 0, parameter2 = 10, parameter3) {
  parameter3 = parameter1 * 2;
  console.log(parameter1, parameter2, parameter3);
};
//Function returning functions as arrow
const greet = greeting => n => console.log(`${greeting} ${n}`);
greet('Hello')('Mauricio');

//Call method: allows us to manually manipulate the this keyword. For example. if we define a method for an object, and then we create a variable that has a value equivalent to that method, we won't be able to call that function for another object or outside from the original object. So we use the call method. For example:

const latam = {
  airline: 'latam',
  book(name, flightNum) {
    console.log(
      `${name} booked a flight on ${this.airline} flight number ${flightNum}`
    );
  },
};

latam.book('Mauricio', 'LA242');

//If we want to use the book funtion declared inside of this object for others, we do the following.
const book = latam.book;

const star = {
  airline: 'star',
};

book.call(star, 'Pedro', 'ST556');
//In the line above, we use the call method to the function. We then have three parameters, the first one being the object that represents the new this keyword, and then the parameters of the function itself.

//Bind method
//We can also use the bind method, which lets us create a new variable that will be equal to the call method for a specific object. For example:

const jetSmart = {
  airline: 'JetSmart',
};

const bookJetSmart = book.bind(jetSmart);
//In the line above, we indicated the book function which object is going to be their new this keyword. So now, we only need to pass the function as we would normally do:

bookJetSmart('Leticia', 'js9900');

//Bind Partial Application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
//The code below this line would be the same as: //addVat = (value) => value + value *23
const addVat = addTax.bind(null, 0.23);
//In the code above we use the bind method to create a new version of the addTax function, except we dont attatch a new this to it, we set that parameter to null, an instead, we set a fixed value for the "rate" parameter, so that in future uses, we only specify the value parameter of the function.

console.log(addVat(200));

const addNewVat = function (value) {
  return function (rate) {
    return value + value * rate;
  };
};

//Example of a function with a closure:

const secureBooking = function () {
  let passangerCount = 0;
  return function () {
    passangerCount++;
    console.log(`${passangerCount} passengers`);
  };
};

const booker = secureBooking();
booker();
//In the code above, booker, which is a function, has access to the passanger count variable from the secureBooking function thanks to the closure. The closure allows booker to "remember" the variales from the execution context in which it was declared, which in this case is the secureBooking function; since the anonymous function that gets returned in secureBooking is the value of booker. When booker gets called, the execution context of secureBooking is gone because the function has already returned, but the booker function works because of the closure allowing it to access the passangerCount variable form its birthplace.
