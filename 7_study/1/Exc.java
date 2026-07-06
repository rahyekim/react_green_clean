// package 7_study;

/* 이 예제는 자바 예외 처리를 어떻게 하는지 보는 예제 */

public class Exc {
    //프로그램이 시작되는 메인 메서드
    public static void main( String[] args){
        
        int a=5, b=0; // 정수형변수 a에 5를 b에 0을 저장 

        try{
            System.out.println(a/b); //5/0 나눌수없음 에러터짐 
        }catch(ArithmeticException e){ 
            System.out.print("출력1: 수학적 계산 에러");
        }catch(ArrayIndexOutOfBoundsException e){
            System.out.print("출력2: 배열의 크기를 벗어났을때");
        }catch(NumberFormatException e){
            System.out.print("출력3: 문자를 숫자로 잘못바꿀때");
        }catch(Exception e){
            System.out.print("출력4");
        }finally{
            System.out.println("출력5:"); 
        }            
    }
}

//print: 인라인이라 출력1출력5 <한줄>

//println => 두줄 , 단, 글자 다찍고 난후에 줄바꿈(엔터)
// 출력1
// 출력5  