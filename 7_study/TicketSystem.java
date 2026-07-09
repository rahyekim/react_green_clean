// 공유 자원: 티켓 예매 시스템
class TicketSystem {
    private int availableTickets = 10;

    // synchronized 키워드를 사용하여 한 번에 하나의 스레드만 접근 가능하도록 보장
    public synchronized void reserveTicket(String userName) {
        if (availableTickets > 0) {
            System.out.println(userName + "님이 예매를 시도합니다. (남은 티켓: " + availableTickets + ")");
            availableTickets--;
            System.out.println(userName + "님 예매 성공! (현재 남은 티켓: " + availableTickets + ")");
        } else {
            System.out.println(userName + "님 예매 실패: 티켓이 매진되었습니다.");
        }
    }
}

// 스레드 작업 정의
class UserThread extends Thread {
    private TicketSystem ticketSystem;
    private String userName;

    public UserThread(TicketSystem ticketSystem, String userName) {
        this.ticketSystem = ticketSystem;
        this.userName = userName;
    }

    @Override
    public void run() {
        ticketSystem.reserveTicket(userName);
    }
}

// 메인 실행 클래스
public class TicketReservationMain {
    public static void main(String[] args) {
        TicketSystem system = new TicketSystem();

        // 15명의 사용자가 동시에 10장의 티켓 예매 시도
        for (int i = 1; i <= 15; i++) {
            Thread user = new UserThread(system, "사용자-" + i);
            user.start();
        }
    }
}