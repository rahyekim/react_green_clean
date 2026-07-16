public class Big {
    
    public static void main(String[] args) {
        int a= 0;

        for(int i =1 ; i<999 ; i++){
            if(i%3==0 && i%2 !=0){
                a = i;
            }
        }
              
        System.out.println(a);
        //조건을 만족할때 마다 변수 a에 값을 계속 덮어씀...
            //결국 마지막에 제일 큰 숫자가 나온다....
    }
}
