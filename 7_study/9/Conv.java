public class Conv {

    int a ;
    
    public conv (int a){
        this.a = a;

    }

    int func(){
        int b = 1;
        for( int i =1 ; i<a ; i++){
             b = a * i +b;
        }
        return a+b;
    }
   
    public static void main(String[] args) {
        
        Conv obj = new Conv();
        obj.a = 5;

        int b = obj.func();
        System.out.println(obj.a + b);

    }
}
