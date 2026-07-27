package thread;

public class Calculator {

    //🌟계산기가 값을 기억해둘 공간... 외부에서 함부로 바꾸지 못하게 private
    private int memory;

    //숨겨둔 메모리값을 밖에서 읽어갈수있게 해주는 기능
    public int getMemory() {
        return memory; //현재기억하고 잇는 값을 돌려줌
    }

    /*✅동기화 메소드
    synchronized(자물쇠)가 적혀있음
    화장실 문 잠그는 것과 같다
    한명(스레드)이 이 기능을 사용하고 있으면 밖에서 기다려야함
     */
    public synchronized void setMemory(int memory) {

        this.memory = memory; //외부에서 받은 memory숫자를 계산기의 메모리에 저장

        try {
            Thread.sleep(2000); //현재 일하고 있는 스레드를 2초간 멈춤
            //2초동안 멈춰있는 사이에 다른 작업자가 끼어 들어서 값을 바꾸지 못하는지 확인하려고...
        } catch (InterruptedException e) {
        } // 잠자는 동안 누가 억지로 깨워서 에러가 나면 처리

        //2초가 지난뒤에🔓 (문 열림) 현재 일하고 있는 작업자 이름 저장된 값을 화면에 보여줌
        System.out.println(Thread.currentThread().getName() + ": " + this.memory);
    }

    /*동기화 블록
    첫번째 기능(setMemory)와 똑같이 동작하지만 자물쇠 채우는 방식이 다름
    (위에는 전체적으로 잠금, 얘는 부분적잠금)
     */
    public void setMemory2(int memory) {
        //메소드 전체를 잠그지 않고 내가 꼭 보호하고 싶은 중요한 부분만 자물쇠 채움
        synchronized (this) { //✅ (this) 이 계산기 자체를 열쇠로 삼아 문을 잠그겠다는 뜻..
            this.memory = memory; //값을 저장하고
        }
        try {
            Thread.sleep(2000); //2초동안 기다렸다가
        } catch (InterruptedException e) {
        }
        //결과를 화면에 보여줌
        System.out.println(Thread.currentThread().getName() + ": " + this.memory);

    }
}

/*
왜 스레드를 쓰면서 🔥synchronized 를 쓰냐면,,,
직원 A가 계산기(calculate)에 100을 입력하고 결과를 적으려는 찰나 (2초동안기다리는 중에)
직원 B가 와서 갑자기 50을 입력하면 ...ㄷㄷㄷㄷ..
이런일이 발생하지 않게 하기 위해서 내가 계산기를 쓰는 동안에 아무도 건드리지마...
자물쇠 채우는 기능 바로 synchronized 동기화
 */

/*
    public synchronized void setMemory(int memory) {

잠금 시작 🔒

memory 변경

2초 잠

잠금 해제 🔓


철수
 ↓
100 저장
 ↓
2초 기다림
 ↓
끝

그 다음

영희
 ↓
200 저장
 */

/*  setMemory2
0초

철수 들어옴

🔒
memory = 100
🔓

여기서 바로 문을 열어버립니다.

영희가 바로 들어옵니다.

🔒
memory = 200
🔓

철수는 아직 자고 있는데,
이미 memory가 200으로 바뀌어 버린 것

철수가 자는 동안 영희가 들어와서 값을 바꿀 수 있습니다.

synchronized 메소드 → 메소드가 끝날 때까지 다른 스레드는 못 들어온다.
synchronized 블록 → 블록이 끝나는 순간 잠금이 풀리므로,
 그 뒤의 코드(sleep 등)는 다른 스레드와 동시에 실행될 수 있다.
 */


