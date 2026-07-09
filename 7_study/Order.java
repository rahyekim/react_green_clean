
class Parent{
    int x, y;

    public Parent(int x, int y){ //(1)
        this.x =x;
        this.y= y;

    }

    int getT(){ //(2)🍁

        return x * y;
    }
}


class Child extends Parent{

    int x;

    public Child(int x){ //(3)
        super(x+1,x);
        this.x=x;
    }
    int getT(int n){ //(4)
        return super.getT() + n;
    }

}
public class Order {
    
    public static void main(String[] args) { //5

        Parent parent = new Child(3); //6
        System.out.println(parent.getT());//7
        
    }
}
/*
Child클래스의 객체를 만들되 그것을 바라보는 리모컨은 Parent로 하겟다
업캐스팅(Upcasting) : 숫자3을들고 child의 생성자로 이동
 */

/*
5 : ⭐jvm 이 실행되면 가장먼저찾는곳: main메서드 
6 : 객체 생성 명령 🌿

3 : 자식 생성자 진입과 부모호출 제어건이 🌿차일드 생성자로 넘어왔지만 
    자식이 태어나려면 반드시 🌳부모가 먼저 존재해야한다는 규칙 
    따라서 자식의 변수 this.x =x 셋팅하기전에 super(x+1,x)를 먼저만나 제어권을 강제로
    부모생성자인 1번으로 토스해줌(🌳생성자 체이닝)
1 : 🌳 부모생성자 실행 및 완성 -> 부모의 뼈대를 완성하고 자식객체 생성 마무리
7 : 메서드 호출 명령
2 : 오버로딩에 의한 부모 메서드 선택 , 결국🍁괄호가 비어있는 원본 메서드를 
    부모영역에 있는 x*y을 실행... 
    결곽가 반환되고 프로그램 종료... 4*3 ..12

 */