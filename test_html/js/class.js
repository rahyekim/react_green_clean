//⭐⭐⭐⭐

class Character { //[클래스] 설계도 실체가없으며 메모리차지X
    
    //[생성자] 캐릭터가 태어날 때 이름과 직업을 받아와서 세팅
    constructor(name, job, age){ //생성자 초기 데이터세팅...
        this.name = name;   // new를 누르는 순간 자동실행함수
        this.job = job;
        this.age = age;
    }
    //캐릭터의 기능(메서드)
    attack(){
        console.log(`${this.name}이(가) 공격합니다!`)
    }
}
//객체(인스턴스)
// 메모리에 실재 조작가능 실제 데이터와 기능수행
//[객체] new 키워드를 사용해 설계도로부터 실제 객체들을 찍어냅니다
const user1 = new Character( "Tom", "warrior",20);
const user2 = new Character( "jake", "wizard", 30);

console.log(user1.name);
user2.attack()

//// [자식 클래스] Character를 상속(extends)받은 전사 설계도

class Warrior extends Character{

    constructor(name, age ,shieldSize){
        //⭐⭐ 매우 중요: 부모(Character)의 생성자를 먼저 호출해서 이름과 직업 나이 세팅
        super(name, "전사", age);  // 부모순서(name -> job -> age) 맞춰서 값 전달
        this.shieldSize = shieldSize; // 전사만의 고유 데이터 세팅
    }

    //전사만의 메서드 추가 
    shieldDefend(){
        console.log(`${this.name}이(가) ${this.shieldSize}짜리 방패로 방어!`);
    }
    //부모메서드 재정의 오버라이딩
    attack(){
        console.log(`${this.name}이(가) 강력하게 공격합니다.`);
    }

}

// 실제 객체 생성
const warrior1= new Warrior("mike", "대형", 30);

console.log(warrior1.name);
console.log(warrior1.job);
warrior1.attack();
warrior1.shieldDefend();
console.log(warrior1.shieldSize);

///////////////////////////////////////////////

class Car {
    
    constructor(name, year){ //생성자
        this.carName = name;  // 속성 = 인수;
        this.carYear = year;
    }
    age(){
        const date = new Date();
        return date.getFullYear() - this.carYear;
    }
}

const myCar = new Car("audi", 2026);

const yourCar = new Car("bmw", 2020);

document.getElementById("cls").innerHTML = 

myCar.carName + " "+ yourCar.carYear +"<br>"+
"내자동차는 " + myCar.age() + "살이고" + 
"<br> 니 차는 " + yourCar.age() + "살이다";


class Char {

    constructor(brand){
        this.charName = brand
        
    }

    present(){
        return 'i have a '+ this.charName;
    }
    
}

class Bike extends Char{

    constructor(brand, mod){
        super(brand);
        this.model = mod;
    }
    show() {
        return `차브랜드명(상속) : ${this.present()} 와 모델: ${this.model}`
    }
}

let vehicle = new Bike('ford', 'cls500')

document.getElementById("inherit").innerHTML = vehicle.show();






