public class Inter {

    @FunctionalInterface
    static interface F {
           int apply(int x) throws Exception;
        
    }
    public static int run(F f){
        try{
            return f.apply(3);

        }catch(Exception e){
            return 7;
        }
    }

    public static void main(String[]args){

        F f = (x)->{ 
            if(x>2){ //3을넣어서 강제 에러발생 
                throw new Exception();
            }
            return x *2; //함정...실행하지x
        };
        System.out.println(run(f)+ run((int n)-> n+9)); // 7+12
    }
}


//git remote -v


// git remote set-url origin https://github.com/rahyekim/react_green_clean.git

//git pull origin main