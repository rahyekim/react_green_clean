public class Calc {
    
    //재귀적으로 문자열을 처리하는 문제
    public static String calcul(String str, int index, boolean[] seen){

        //종료조건 인덱스가 0보다 작아지면 (문자열의 처음을 지나치면) 빈문자열을 반환
        if(index <0 ) return "";
        //현재 인덱스에 해당하는 문자를 문자열에서 하나 가져와 변수 c에 저장
        char c = str.charAt(index);
        //재귀호출 현재 문자를 처리하기 전에 인덱스 1을 줄임
        //이전문자열을 먼저처리하도록 하기에 실제검사는 문자열 맨앞 인덱스0부터시작
        String result = calcul(str, index-1, seen);
        //처음 등장한 문자라면 :seen에서 false라면 
        if(!seen[c]){
            seen[c] = true; //이 문자는 등장했다고 true로 표시
            return c+ result; //현재문자 c를 여태까지 만들어진 결과의 앞에 붙여서 리턴 
        }
        //만약 이미 당장했던 문자라서 seen[c]가 true라면 현재문자무시 기존 결과 그대로 리턴
        return result;

    }
    public static void main(String[] args) {
        
        String str = "abscabcd";     
        
        //분석할 원본 문자열을 "" 선언하고 초기화 
        /*
        문자의 중복여부를 체크하기 위해서 크기가 256(ASCII코드크기) 인 boolean배열을 
        생성 기본값은 모두 false로 초기화 
         */
        boolean [] seen = new boolean[256];

        System.out.println(calcul(str, str.length()-1, seen) ); //dcsba
        //calcul(str, 7, seen);
    }
}

/**
 * 위 재귀함수는 호출과 반환 순서, 중복문자 제거 및 문자열 뒤집기
 a b s c a b c d
 0 1 2 3 4 5 6 7

 */