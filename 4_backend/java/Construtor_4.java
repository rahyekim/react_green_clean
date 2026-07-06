public class Construtor_4 {
    
    //속성 선언
    int x;
    int modelYear;
    String modelName;
    String lunch;
    String lunchAfter;

    //생성자 자바에 생성자는 클래스명과 동일하게 사용

    public Construtor_4(int y, int year, String name, String lunch, String lunchAfter){
        x = y;
        modelYear = year;
        modelName = name;
        this.lunch = lunch; //변수 쉐도잉 발생 변수명이랑 매개변수 이름같을때->앞에 this라는키워드 붙여준다 
        this.lunchAfter = lunchAfter;
        

    }

    public static void main(String[] args){
        Construtor_4 obj = new Construtor_4(10, 1919, "volvo", "짜장면", "케이크");
        System.out.println(obj.x);
        System.out.println(obj.modelYear+ " "+obj.modelName);
        System.out.println(obj.lunch+" 먹고 "+ obj.lunchAfter);
    }

}
