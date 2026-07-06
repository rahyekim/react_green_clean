
// 상속 생성자실행순서 다형성(오버라이딩)에 관련된 문제 


class Parent{ //부모클래스

    static int total=0;  //static 모든객체가 공유하는 공용변수 
    
    int v =1; //부모클래스가 가진 인스턴스 변수 

    //부모의 생성자 (Child객체를 만들때 가장먼저 은밀히 실행)
    public Parent(){
        total += (++v) ; //전위전산자는 먼저 값을 1증가 시킨뒤 계산 
        show(); //함수호출
    }

    public void show(){ //부모의show 메서드  return없이 실행함수 
        total += total;
    }

}

//상속받은 클래스
class Child extends Parent{ //상속 받으면 부모의 능력치와 내 능력치 둘다 사용 
    int v = 10; //부모클래스와 이름만 같을 뿐 완전히 다른 변수 초기값 10 

    //자식의 생성자
    public Child(){
        v += 2 ; // 12
        total += v++; //후위전산자 현재값을 total에 더하고 나중에 v를 1증가 
        show();
    }
    //부모의 show()를 무시하고 덮어쓴 (오버라이딩) 자식의 메서드
    @Override
    public void show(){
        total += total*2; 
    }
}


public class Inherit {
    
    public static void main(String[] args){

        //차일드 객체 새로
        new Child(); //자식객체를 만들때는 부모의 생성자부터 먼저실행
        //모든과정이 끝난후 공용변수인 total의 최종값 출력
        System.out.println(Parent.total); //54 = 18 + 18*2
    }
}

/*

1) 부모 생성자 실행 (Parent)
new Child() 를 실행하면 자식을 만들기 전에 무조건 부모의 Parent의 생성자부터 들어감
부모가 가진 변수 v= 1 공용변수는 total 0
v 먼저 증가해서 부모의 v는 2 됨

부모생성자의 show() 얘 만남

지금코드는 부모생성자 안이짐나 사실 진짜 만드는 껍데기는 자식 객체잖아
그럼 부모의 show는 무시하고 덮어쓴 자식의 show()를 실행해야징ㅋㅋ
이를 통틀어 동적 바이딩이라고 함...


자식의 show 내부  total += total* 2
2 + (2 * 2) //6 

3) 자식생성자실행
부모셋팅끝-> child생성자
v= 10+2 =12
자식으로 내려온 total 6+ 6*2 = 18


*/





/*
[1단계] 객체 생성 및 기본 초기화
메모리에 부모 변수들과 자식 변수들이 자리를 잡습니다.

Parent.total = 0 (공용 변수)

부모의 v = 1

자식의 v = 0 (⚠️ 아직 자식 생성자가 실행 전이라 초기값 10이 할당되지 않고 기본값인 0인 상태입니다!)

[2단계] 부모 생성자(Parent()) 실행
total += (++v);

부모의 v가 1에서 2로 증가합니다 (++v).

total에 2를 더합니다. ➔ total = 2

show(); 호출 ➔ 🔥 함정 발동!

부모의 show()가 아니라 자식(Child)의 show()가 실행됩니다.

자식의 show() 내용: total += total * 2;

현재 total은 2이므로, 2 += (2 * 2) ➔ total = 6

[3단계] 자식 변수 인스턴스 초기화 및 자식 생성자(Child()) 실행
부모 생성자가 끝났으니 이제 자식 영역으로 넘어옵니다. 이때 자식의 v에 명시된 초기값 10이 드디어 들어옵니다! (v = 10)

v += 2; ➔ 자식의 v는 12가 됩니다.

total += v++;

후위 연산자이므로 현재의 v(12)를 먼저 total에 더합니다.

total = 6 + 12 ➔ total = 18

그 후 자식의 v는 13이 됩니다.

show(); 호출 ➔ 역시 자식의 show()가 실행됩니다.

total += total * 2;

현재 total은 18이므로, 18 += (18 * 2) ➔ 18 + 36 = total = 54
 */