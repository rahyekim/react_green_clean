/*
| or 하나라도 참이면 참
&& AND 모두참이어야 참
! NOT 참 거짓 반대로뒤집기 
^ XOR 배타적 논리합 양쪽의 결과가 다를때만 참 ( 참참->거짓)

 */

public class Nest {

    public static void main(String[] args) {
        
        int a=3, b=4, c=3, d=5;
        
        if((a==2 | a==c) & !(c>d) & (1==b ^ c!=d)){ 
            a=b+c;
            //두번째 조건문으로 내부검사 
        }
        if( 7 == b ^ c != a){ //false ^ false 
            System.out.println();
        }else{
            a = c+d;
            if()
        }
    }
    
}
