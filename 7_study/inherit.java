/*
자바의 다형성과 오버라이딩(인스턴스 메서드)
하이딩(정적메서드)의 차이를 묻는 문제
 */
public class Inherit {
    
    public static class Parent {
        public int x (int i){
            return i+2;
        }   
         public static String id(){ //정적메서드는 객체가 아니라 클래스 자체에 소속
            return "P"; //실제 알맹이가 아니라 참조변수의 겁데기 타입..
        }
    }
    public static class Child extends Parent{
        public int x (int i){
            return i+3;
        }
        public String x (String s){
            return s+ "R";
        }
        public static String id(){
            return "C";
        }
    }

    public static void main(String[]args){

        Parent ref = new Child();
        //부모의 탈을 쓴 자식,  실제 메모리에는 차일드 객체 생성
        //껍데기는 부모인데 알맹이는 자싲ㄱ
        System.out.println(ref.x(2)+ ref.id()); //5(알맹이)+ "P"(껍데기)
    }

}

/*
자바에서는 일반 메서드는 실제 생성된 객체(알맹이)를 기준으로 실행
이것을 동적바인딩 또는 오버라이딩 이라고 함
Parent ref 라 하더라도 실제 연결된 객체가 child이기때문에 자식 클래스에서 
재정의 오버라이딩한 x(int)가 호출
 */

/*⭐⭐⭐⭐⭐
일반메서드-> 실제 객체(알맹이)
static 메서드=> 참조변수타입(껍데기)
static은 객체 없이도 호출 -> 애초에 객체(알맹이)를 볼 이유가 없는 거야.
 */