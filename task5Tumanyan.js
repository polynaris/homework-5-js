Hamburger.SIZE_SMALL = 'small';
Hamburger.SIZE_LARGE = 'large';

Hamburger.STUFFING_CHEESE = 'cheese';
Hamburger.STUFFING_SALAD = 'salad';
Hamburger.STUFFING_POTATO = 'potato';

Hamburger.STUFFING_COST_MAP = new Map([
    [Hamburger.STUFFING_CHEESE, 10],
    [Hamburger.STUFFING_SALAD, 20],
    [Hamburger.STUFFING_POTATO, 15]
]);

Hamburger.SIZE_COST_MAP = new Map([
    [Hamburger.SIZE_SMALL, 50],
    [Hamburger.SIZE_LARGE, 100]
]);

Hamburger.SIZE_CALORIES_MAP = new Map([
    [Hamburger.SIZE_SMALL, 20],
    [Hamburger.SIZE_LARGE, 40]
]);

Hamburger.STUFFING_CALORIES_MAP = new Map([
    [Hamburger.STUFFING_CHEESE, 20],
    [Hamburger.STUFFING_SALAD, 5],
    [Hamburger.STUFFING_POTATO, 10]
]);

Salad.TYPE_CESAR = 'cesar';
Salad.TYPE_OLIV = 'oliv';

Salad.TYPE_CALORIES_MAP = new Map([
    [Salad.TYPE_CESAR, 20],
    [Salad.TYPE_OLIV, 80]
]);

Salad.TYPE_COST_MAP = new Map([
    [Salad.TYPE_CESAR, 100],
    [Salad.TYPE_OLIV, 50]
]);

Drink.TYPE_COLA = 'cola';
Drink.TYPE_COFFEE = 'coffee';

Drink.TYPE_CALORIES_MAP = new Map([
    [Drink.TYPE_COLA, 40],
    [Drink.TYPE_COFFEE, 20]
]);

Drink.TYPE_COST_MAP = new Map([
    [Drink.TYPE_COLA, 50],
    [Drink.TYPE_COFFEE, 80]
]);

function Food() {}

Food.prototype.calculatePrice = function() {
    if (this.constructor === Food) {
        throw new Error('Cannot call this method on an instance of the food class');
    }
}

Food.prototype.calculateCalories = function() {
    if (this.constructor === Food) {
        throw new Error('Cannot call this method on an instance of the food class');
    }
}

function Hamburger(size, stuffing) {
    Food.apply(this, arguments); //does nothing (=
    this.size = size;
    this.stuffing = stuffing;
}
Hamburger.prototype = Object.create(Food.prototype);
Hamburger.prototype.constructor = Hamburger;

Hamburger.prototype.getSize = function() {
    return this.size;
}

Hamburger.prototype.getStuffing = function() {
    return this.stuffing;
}

Hamburger.prototype.calculatePrice = function() {
    return Hamburger.SIZE_COST_MAP.get(this.size) +
        Hamburger.STUFFING_COST_MAP.get(this.stuffing);
}

Hamburger.prototype.calculateCalories = function() {
    return Hamburger.SIZE_CALORIES_MAP.get(this.size) +
        Hamburger.STUFFING_CALORIES_MAP.get(this.stuffing);
}

function Salad(type, weight) {
    Food.apply(this, arguments); //does nothing (=
    this.type = type;
    this.weight = weight;
}
Salad.prototype = Object.create(Food.prototype);
Salad.prototype.constructor = Salad;

Salad.prototype.getType = function() {
    return this.type;
}

Salad.prototype.weight = function() {
    return this.weight;
}

Salad.prototype.calculatePrice = function() {
    return Salad.TYPE_COST_MAP.get(this.type) *
        this.weight / 100;
}

Salad.prototype.calculateCalories = function() {
    return Salad.TYPE_CALORIES_MAP.get(this.type) *
        this.weight / 100;
}

function Drink(type) {
    Food.apply(this, arguments); //does nothing (=
    this.type = type;
}
Drink.prototype = Object.create(Food.prototype);
Drink.prototype.constructor = Drink;

Drink.prototype.getType = function() {
    return this.type;
}

Drink.prototype.calculatePrice = function() {
    return Drink.TYPE_COST_MAP.get(this.type);
}

Drink.prototype.calculateCalories = function() {
    return Drink.TYPE_CALORIES_MAP.get(this.type);
}

function Order() {
    this.items = [];
    this.closed = false;
}
Order.prototype.addItem = function(item) {
    if (!this.closed) {
        this.items.push(item);
    } else
        console.log('You can not add this item. The order has already been paid.');
}

Order.prototype.deleteItem = function(number) {
    if (!this.closed) {
        this.items.splice(number, 1);
    } else
        console.log('You can not delete this item. The order has already been paid.');
}

Order.prototype.pay = function() {
    this.closed = true;
    console.log('Your order is payed');
}

Order.prototype.calculateSum = function() {
    var orderSum = 0;
    for (var i = 0; i < this.items.length; i++) {
        orderSum += this.items[i].calculatePrice();
    }
    return orderSum;
}

Order.prototype.calculateCalories = function() {
    var orderSumCalories = 0;
    for (var i = 0; i < this.items.length; i++) {
        orderSumCalories += this.items[i].calculateCalories();
    }
    return orderSumCalories;
}

var order = new Order();
var hamb = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
var salad = new Salad(Salad.TYPE_CESAR, 400);
var drink = new Drink(Drink.TYPE_COFFEE);
order.addItem(hamb);
order.addItem(salad);
order.addItem(drink);
console.log('Calories:' + order.calculateCalories());
console.log('Sum of your order: ' + order.calculateSum());
order.deleteItem(1);
console.log('Your order:', order);
console.log('Calories:' + order.calculateCalories());
order.pay();
var drink = new Drink(Drink.TYPE_COLA);
order.addItem(drink);