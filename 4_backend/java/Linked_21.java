import java.util.LinkedList;

public class Linked_21 {
    

    public static void main (String [] args){
        
        LinkedList<Integer> nums = new LinkedList<>();  

        nums.add(1);
        nums.add(2);
        nums.add(3);
        nums.add(4);
        nums.addFirst(0);
        nums.addLast(5);
        nums.getFirst();
        nums.getLast();

        System.out.println(nums);
        System.out.println(nums.get(0));
        System.out.println(nums.getFirst());
        System.out.println(nums.getLast());


        //객체만 들어오는곳!! int기본타입안돼=> 🌱 int의 래퍼 클래스(Wrapper Class)=> Integer 🌱
        //래퍼클래스는 컬렉션객체 // 객체만 가능
        /*
        byte    Byte
        short   Short
        int     Integer
        long    Long
        float   Float
        double  Double
        boolean Boolean
        char    Character
        기본데이터타입(원시값)을 객체형태로 다룰 수 있게 감싸주는 클래스가 래퍼 클래스 
        
         */

    }
}
