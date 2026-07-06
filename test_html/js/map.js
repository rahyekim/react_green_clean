

const userRoles = new Map();

userRoles.set("Tom", "ADMIN");
userRoles.set("jake","USER");

console.log(userRoles.get("Tom")) // ""ADMIN""

console.log(userRoles.size) //몇개 ?


userRoles.has("Tom") // true



userRoles.delete("Tom") //
console.log(userRoles.has("Tom")) // false

userRoles.clear() 

console.log(userRoles.size) //0

const coffeePrice = new Map([

    ['아아', 1800],
    ['라떼', 2300],
])

coffeePrice.forEach((price, name)=> {
    console.log(`${name}가격은 ${price}입니다`)
});

for (let coffee of coffeePrice.keys()) {}

for (let coffee of coffeePrice.values()){}