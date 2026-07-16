
const arr = [1,2,3,4]

let sum =0 

for(let i=0; i<arr.length; i++){
    sum += arr[i];
}

console.log(sum)

const sum = arr.reduce((acc, curr)=>{
    return acc+curr;
},0)

const cart = [
    {name: "노트북", price:1000},
    {name: "마우스", price:500},
];

const total = cart.reduce((sum, item)=> {
    return sum + item.price
},0);


const users = [
    {id:1, name:"황현진"},
    {id:2, name:"문현빈"}
]

const obj = users.reduce((acc, user)=>{
     acc[user.id] = user.name;
     return acc ;
},{})


const fruits = [
    "apple",
    "banana",
    "apple",
    "orange",
    "banana"
];

const count = fruits.reduce((acc,cur)=>{
    acc[cur] = (acc[cur] || 0) +1; //없으면 1부터시작 아니면 1추가...

    return acc;
},{})

// acc["apple"]  "apple": 1
// acc ["apple"] "apple": 2


const total = cart.reduce((sum,item)=>{
    return sum+ item.price * item.count;
}, 0)


if(acc[crr]){
    acc[crr] +=1;
}else{
    acc[crr] = 1
}
