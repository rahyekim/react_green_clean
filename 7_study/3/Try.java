public class Try {


    
    public static void main(String[]args){
         int sum = 0;

         try{
            func();

         }catch(NullPointerException e){
            sum = sum +1; // 1
         }catch(Exception e){
            sum = sum +20; //패스
         }finally{
            sum = sum+100;
         }
         System.out.println(sum);

    }
    
    static void func() throws Exception{  //상위개념한테 책임전가
    throw new NullPointerException(); //함수호출시 강제로 널포인터익셉션 실행
    }
}


