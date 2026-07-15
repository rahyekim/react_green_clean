package advanced;

import java.util.Calendar;
import java.util.TimeZone;

public class LA {

	public static void main(String[] args) {
		TimeZone tz = TimeZone.getTimeZone("America/Los_Angeles");
		Calendar now = Calendar.getInstance(tz);
		
		int amPm = now.get(Calendar.AM_PM);  //1or0
		String strAmPm = null;
		
		if(amPm == Calendar.AM) { //Calendar.AM= 0 
			strAmPm = "오전";
		}else {
			strAmPm = "오후"; //Calendar.PM = 1
		}
		int hour = now.get(Calendar.HOUR);
		int minute = now.get(Calendar.MINUTE);
		int second = now.get(Calendar.SECOND);
		
		System.out.print(strAmPm+ " ");
		System.out.print(hour+ "시 ");
		System.out.print(minute+ "분 ");
		System.out.print(second+ "초 ");
	}

}
