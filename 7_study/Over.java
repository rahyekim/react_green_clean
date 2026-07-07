
class Base {
    int x= 3;
    int getX(){
        return x * 2;
    }
}
class Derivate extends Base{
    int x = 7;
    int getX(){
        return x*3;
    }
}
public class Over {
    
    public static void main(String[]args){

        Base a = new Derivate();// 알맹이는 자식 참조타입은 부모(다형성작용)
        Derivate b = new Derivate(); //알맹이도 자식 리모컨도 자식...(일반적인생성)

        System.out.println(a.getX()+ a.x + b.getX()+ b.x);

        /*
        21+3 + 21+7 
         */
    }
}





/*
메서드 오버라이딩 변수은닉
메서드는 실제 생성된 객체 알맹이를 따라가고
변수는 참조하는 타입(껍데기 / 리모컨)을 따라감...

🧠 메서드는 "객체"를 따라가고, 변수는 "참조 타입"을 따라간다. 😎

Java는 실행 시점(Runtime)에

"실제 객체가 Child네? 그럼😄 Child의 print()를 실행!"

이라고 판단합니다.

이걸😄 동적 바인딩(Dynamic Binding) 🚀

📄 변수는 컴파일할 때 타입만 보고 결정하기 때문(정적바인딩)
*/
