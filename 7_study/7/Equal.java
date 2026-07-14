public class Equal {


    public static void main(String[] args) {
        
        String str1= "Programming";
        String str2= "Programming";
        String str3= new String("Programming");

        System.out.println(str1==str2); //true  ==은 메모리주소비교
        System.out.println(str1==str3); //False 
        System.out.println(str1.equals(str3)); //true equals는 값비교
        System.out.print(str2.equals(str3)); //true
        
    }
    
}
