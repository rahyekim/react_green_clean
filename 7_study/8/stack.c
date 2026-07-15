/*
point = 현재 스택 꼭대기의 인덱스
처음 = -1 (아무 데이터 없음)
push(넣기) = ++point 후 저장
pop(꺼내기) = point-- 하면서 꺼냄

즉 스택은 항상 point가 "마지막으로 들어간 데이터 위치"를 기억하는 구조
*/
#include <stdio.h>
#define MAX_SIZE 10  //스택 최대크기 10으로 정의

int isWhat[MAX_SIZE]; //int크기10짜리 스택배열

int point = -1;  //스택의 맨 위 인덱스를 저장하는 정수 변수

/* 
스택의 가장 위쪽top 인덱스를 가리키는 변수
배열이 비어있으므로 -1로시작 
*/

int isEmpty(){
    if(point == -1 ) return 1; //true
    //point가 -1이면 스택이 비어잇다는 뜻
    return 0; // 비어있지않으면 false 반환
}

int isFull(){
    if(point == 10 ) return 1;
    return 0;
}

/*
스택이 꽉 찾는지 확인 
참고: MAX_SIZE 가 10이므로 실제 최대 인덱스 9
엄밀히는 point ==9 또는 MAX_SIZE -1 이 정확한표현
*/
void into(int num){ //정수형num을받아 into스택에 넣겟다...
    if(isFull()) printf("Full"); //데이터 넣기전 빈자리가 있는지 먼저 검사
    else isWhat[++point] = num; 
    //스택에 빈자리가 있을때 실제로 데이터를 배열에 집어넣는부분
    //스택이 비어있을때 point-1 배열에는 -1인덱스가 실제로는 없음
    //첫 데이터를 넣으려면 0에 넣어야함... point가 -1이기 때문에 ++더하고
    //0으로 올린뒤 num을 저장하기 때문에
}

int take(){
    if(isEmpty()==1) printf("empty"); //스택 비어잇으면 empty출력
    else return isWhat[point--];
    //현재 point 위치의 값 반환하고, point를 1감소시킴(pop연산)
    return 0;
}

int main(int argc, char const *argv[]){

    int e; //선언만 = 사용하지않은 죽은 코드

    into(5); into(2); //현재 스택에 상태[5,2] 가장위에는 2가있음

    while(!isEmpty()){ //스택이 비어잇지 않는 동안 계속 반복
        printf("%d", take()); //가장위 2를꺼내고 출력 출력[5]

        into(4); into(1);  //[5,4,1]
        printf("%d", take()); 
        into(3); //[5,4,3]
        printf("%d", take()); //[5,4]
        printf("%d", take()); //[5]
        into(6);              //[5,6]
        printf("%d", take()); //[5]
        printf("%d", take()); //[]

    }

/*
int argc(Argument count): 프로그램이 실행될때 전달된 인수(명령어 덩어리)총개수
특징: 이값은 항상 1 이상.. 
추가값 안넣어도 프로그램 실행파일이름이 첫번째 인수로 하나 count됨 

char const *argv[]
전달된 인수의 실제 데이터(문자열)들을 담고 있는 배열 
argv[0] 프로그램을 실행한 명령어(프로그램이름 또는 경로)
argv[1] 사용자가 입력한 첫번쨰 추가 값
argv[2] 사용자가 입력한 두번쨰 추가 값
const 의 의미: 이 배열에 담긴 문자열을 프로그램코드 안에서 임의로 수정하지 않겠다(상수취급) 의미
*/

    return 0;

}
