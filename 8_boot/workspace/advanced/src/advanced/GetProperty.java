package advanced;

import java.util.Properties; //getProperty: 운영체제와 사용자 정보제공
import java.util.Set;

public class GetProperty {

	public static void main(String[] args) {
		
		String osName = System.getProperty("os.name");
		String userName = System.getProperty("user.name");
		String userHome = System.getProperty("user.home");

		System.out.println(osName);
		System.out.println(userHome);
		System.out.println(userName);

		System.out.println("----------------------------");
		System.out.println("key: value");
		System.out.println("----------------------------");
		
		Properties props = System.getProperties(); //모든 시스템 속성을 한 번에 
		Set keys = props.keySet(); //모든key들만 꺼냄

		for(Object Objkey : keys){  //foreach문
			String key = (String) Objkey; //형변환
			String value = System.getProperty(key); //하나의 시스템 속성(System Property) 값만
			System.out.printf("%-40s: %s\n", key, value);
		}


		//stringPropertyNames() : 문자열 키만 Set<String>으로 가져오기
		/*
		 * 요즘방식 ....
		 Properties props = System.getProperties();
		
		Set<String> keys = props.stringPropertyNames();
		
		for (String key : keys) {
		    String value = props.getProperty(key);
		    System.out.printf("%-40s : %s%n", key, value);
}
		 * */
	}
}
