import java.util.Arrays;

enum OrderStatus {

    PAYMENT("P","결제대기", true),
    PREPARE("PR","상품준비중", true),
    SHIPPED("S","배송중", false),
    DELIVERED("D", "배송완료", false),
    CANCELED("C", "주문취소", false);

    private final String description;
    private final boolean cancellable;
    private final String code;

    private OrderStatus(String code, String description, boolean cancellable){
        this.code =code;
        this.description = description;
        this.cancellable = cancellable;
    }

    //getter
    public String getDescription(){
        return description;
    }
    public String getCode(){
        return code;
    }
    public boolean isCancellable(){
        return cancellable;
    }

    public static OrderStatus from(String code){
        
        return Arrays.stream(OrderStatus.values())
        .filter(status-> status.getCode().equals(code))
        .findFirst()
        .orElseThrow(()-> new IllegalArgumentException("알 수 없는 주문상태: " +code));

    }
}

public class Enum_13{

    public void cancelOrder(OrderStatus currenStatus){
        if(currenStatus.isCancellable()){
            System.out.println("✅주문이 취소되었습니다");
        }else{
            System.out.println("❌취소불가 현재상태:["
                +currenStatus.getDescription()+"] 입니다"
            );
        }
    }

    public static void main(String[] args){

        Enum_13 orderService = new Enum_13();

        System.out.println("==1.정적 팩토리 메서드 테스트");
        //DB에서 PR이라는 문자열 코드만 들어왔따고 가정
        String inputCode1 = "PR";
        OrderStatus status1 = OrderStatus.from(inputCode1); //static메서드호출!
        System.out.println("입력된 코드 '" + inputCode1+ "'는 ["+
            status1.getDescription() +"] 상태입니다."
        );

        System.out.println("\n=== 2. 비즈니스 로직 테스트 (취소 가능 여부) ===");
        orderService.cancelOrder(status1);
        
        OrderStatus status2= OrderStatus.from("S");
        orderService.cancelOrder(status2);

        try{
            OrderStatus.from("XTS");
        } catch(IllegalArgumentException e){
            System.out.println("Caught Expected Error: "+ e.getMessage());
        }
        
    }
}