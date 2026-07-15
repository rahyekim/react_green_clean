package advanced;

import java.util.Arrays;
import java.util.Random;

public class MathExam {

	public static void main(String[] args) {
		double v1 = Math.ceil(5.1);
		System.out.println("올림"+v1);
		
		double v2 = Math.ceil(-5.1);
		System.out.println("올림"+v2);
		
		long v3= Math.max(3, 7);
		long v4 = Math.min(3, 7);
		System.out.println();
		
		System.out.println("max "+v3);
		System.out.println("min "+v4);
				
		//소수 이하의 두자리 얻기
		double value = 12.3456;
		double tmp1 = value * 100;
		long tmp2 = Math.round(tmp1);
		System.out.println("1234.56 반올림: "+tmp2);
		
		System.out.println("---------로또로또------------");
		
		int[] selectNum = new int[6]; 
		//선택 번호 6개가 저장될 배열 생성
		Random random = new Random(3); 
		
		System.out.print("선택번호:");
		
		for( int i=0 ; i < 6 ; i++) {
			selectNum[i]= random.nextInt(45)+1;
		
			System.out.print(selectNum[i]+ " ");
		}
		
		
		System.out.println();
		System.out.print("당첨번호:");
		//당첨번호
		int[] winningNum = new int[6];
		random = new Random(5);
		for (int i=0 ; i <6; i++) {
			winningNum[i] = random.nextInt(45)+1;
			System.out.print(winningNum[i]+" ");
		}
		System.out.println();
		
		//당첨여부(정렬하고 equals해야함)
		Arrays.sort(selectNum); 
		Arrays.sort(winningNum); 
		
		boolean result = Arrays.equals(selectNum, winningNum);
		System.out.println("당첨결과: " + result);
		if(result) {
			System.out.println("1등 당첨되었습니다");
		}else {
			System.out.println("꽝");
		}
		
		//정렬배열출력
		System.out.print("로또정렬배열: ");
		for(int i=0; i<6; i++) {
			System.out.print(selectNum[i]+ " ");
		}
		
		
				
				
		
	}

}
