/*
핵심요약 
배열의 참조(주소값)반환
함수안에서 4칸짜리 배열을 만들고 숫자를 채워 넣은뒤
그 배열에 잇는 메모리 주소를 넘겨준다
 */
public class Array {
    
    static int[] MakeArray(){
        int[] tempArr = new int[4];

        for(int i=0 ; i<tempArr.length ; i++){
            tempArr[i] = i;
        }
        return tempArr;
    }
    public static void main(String[] args) {
        
        int[] intArr;
        intArr = MakeArray(); //메모리 주소넘겨줌...
        
        for(int i=0 ; i < intArr.length ; i++){
            System.out.println(intArr[i]);
        }
    }
}
