//interface는 설계도 
interface Number{
    //넘버라는 이름의 인터페이스 정의
    //구현부가 없는 추상메서드를 선언
    int sum(int[] a, boolean odd);
    //정수배열 a와 논리값odd를 매개변수로 받아서 int정수형을 반환해야하는 규칙을 정함 
}

//인터페이스에서 확장된 클래스
class ODDnumber implements Number{

    public int sum(int[] a, boolean odd){ //인터페이스 sum메서드의 구현부 작성 //publc이어야함
       
        int result = 0;
        for (int i=0 ; i < a.length ; i++){ //첫번째(인덱스0) 마지막요소a.length-1 까지반복
            if((odd && a[i] %2 !=0 ) || (!odd && a[i] % 2 == 0) ){
                result+=a[i];
            } //매개변수 odd가 true면서 홀수 [OR] odd가 false면서 짝수
        }
        return result;
    }
}
public class Inter {
    
    public static void main(String[] args) {

        int[] a = {1,2,3,4,5,6,7,8,9};

        ODDnumber odd = new ODDnumber();

        System.out.println(odd.sum(a,true) + "," + odd.sum(a, false)); 
        
        //홀수일때 25 짝수일때 20

   
}
        
    }
    
   
