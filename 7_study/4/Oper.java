public class Oper {

    //함수 두개의 정수형 배열을 매개변수로 받아 비교 
    public static void check(int[] a, int[] b){
        if(a == b){ // == 객체(배열)의 안에 든 실제값 비교가 아니라 
                    // 객체가 저장된 메모리 주소값 비교 
        System.out.print("O");

        }else{
        System.out.print("x");

        }
    }    
    
    public static void main(String[] args) {
        int[] a = new int[]{1,2,3,4};
        int[] b = new int[]{1,2,3,4};
        int[] c = new int[]{1,2,3,4};

        check(a, b);
        check(a, c);
        check(b, c);  //xxx print라 인라인
    }
}
