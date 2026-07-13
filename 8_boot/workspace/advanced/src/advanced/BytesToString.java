package advanced;
import java.io.UnsupportedEncodingException;

import java.util.Arrays;

/*
String: 문자열을 저장하고 조작할때 사용
StringBuilder : 효율적인 문자열 조작 기능이 필요할때
StringTokenizer: 구분자로 연결된 문자열을 분리할때 사용
문자열 리터럴은 자동으로 String 객체로 생성되지만
String 클래스의 다양한 생성자를 이용해서 직접 객체로 생성할수도 있다
프로그램을 개발하다보면 byte배열을 문자열로 변환하는 경우가 종종있다
예) 네트워크 통신으로 얻은 byte배열을 원래 문자열로 변환하는 경우
이때는 String생성자 중에서 아래 두가지를 사용해 String 객체로 생성할 수있다.
String str = new String(byte[] bytes);
String str = new String(byte[] bytes, String charsetName);
 */

public class BytesToString {
	
    public static void main(String[] args)  throws Exception {
        
        String data= "자바";

        //String=> byte[] : 인코딩
        byte[] arr1 = data.getBytes();  //기본인코딩셋팅 UTF-8
        System.out.println("arr1: "+ Arrays.toString(arr1)); //arr1 그냥출력하면 참조주소값 나옴...toString해줘야...

        //byte[]배열=> String : 디코딩
        String str1= new String(arr1);
        System.out.println("str1: "+ str1);

        //string-> byte배열(EUC-KR인코딩) 
        byte[] arr2= data.getBytes("EUC-KR");
        System.out.println("arrs:" +Arrays.toString(arr2));
        
        //byte배열 -> String(EUC-KR)  다시변환할때도 반드시같은방식으로...
        String str2= new String(arr2, "EUC-KR");
        System.out.println("str2:" +str2);

        //인코딩할 때 쓴 방식과 디코딩할 때 쓰는 방식은 반드시 같아야 한다. 안그럼꺠진다...


        System.out.println("-----StringBuilder():메서드 체이닝(method chaining)--------------------------------");
        String data2 = new StringBuilder().append("DEF").insert(0, "ABC")
        		.delete(3,4).toString();
        System.out.println(data2);
        
    }

}


/*
String은 수정 불가능(immutable): 새로운 "ABCDEF" 문자열 객체를 만드는 것
String s = "ABC";
s = s + "DEF";

StringBuilder는 문자열을 계속 수정할 수 있는 객체
 */