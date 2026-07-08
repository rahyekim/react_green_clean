#include <stdio.h>
//표준입출력 라이브러리
#include <stdlib.h>
//표준라이브러리
#include <string.h>
//문자열의 길이를 재거나 strlen, 복사 strcpy, 비교 strcmp하는 등 문자열을 다루는 함수들
#include <math.h>
//제곱근sqrt,거듭제곱 pow,삼각함수 등 복잡한 수학 계산 도움
#include <ctype.h>
//문자가 알파벳인지isalpha, 숫자인지 isdigit, 대문자로변환 toupper 하는 등 개별문자 검사하고변환
#include <time.h>
//
#include <stdint.h>
/*uint8_t 사용(C Fixed-width Integers)
u: Unsigned 부호가 없는 즉 마이너스 없이 0과 양수만 씀
int: Interger 정수
8: 8bits 8비트 딱 1바이트 크기
_t : type 자료형이라는 뜻의 관례적인 꼬리표
어떤 컴퓨터에서든 무조건 딱 8비트(1바이트) 크기만 차지하는 양수 0~255 

int나 char안쓰고 이걸쓰는 이유?
기존 c언어의 기본 자료형(int,long등)은 실행된느 컴퓨터 운영체제(32비트/64비트)에 따라 그 크기가
고무줄 처럼 변한다는 치명적인 단점
A컴퓨터에서는 int 쓰면 2바이트(상자크기)
B컴퓨터에서는 int 쓰면 4바이트(상자크기)
만약 A컴퓨터와 B컴퓨터가 통신을 하거나 데이터를 주고받아야한다
상자 크기가 달라서 깨지는 대참사가 일어남

uint8_t:  무조건 8비트  //음수포함
uint16_t: 무조건 16비트 //2바이트 양수만
uint32_t: 무조건 32비트 //4바이트 음수포함
*/

/*
1.C Macros(매크로정의)
#define을 사용하여 코드 내의 상수나 짧은 함수를 정의
컴파일 전에 코드를 치환해 줌
*/
#define MAX_BUFFER 100
#define PI 3.141592

//2. C organize code(함수 선언부 분리)
void processData(char* inputString);
void printCurrentTime();


int main(){
    system("chcp 65001");

    printf("===종합 c언어 예제====\n");

    //3.c
    printCurrentTime();

    //4.random number
    srand(time(NULL)); //현재시간을 시드로 사용하여 매번 다른 난수 발생
    int randonNum = rand() % 100 + 1; //1-100
    printf("[Math&Random] 랜덤숫자: %d \n", randonNum);

    //math.h
    printf("[Math&Random] 랜덤숫자의 제곱근: %.2f\n", sqrt(randonNum));
    printf("[Math&Random] 원주율(Macro)의 제곱 : %.2f\n", pow(PI,2));
   

    //처리할문자열
    char myString[MAX_BUFFER] = "hello c programming 2026! =====";

    //함수호출
    processData(myString);
    processData("test data");

    return 0;
}


//데이터처리함수
void processData(char* inputString){
    //static 변수: 함수가 끝나도 값이 유지
    static int callCount =0 ;
    callCount ++;
    printf("\n ---processData함수 %d번째 호출----\n", callCount);

    //7
    int len = strlen(inputString);
    printf("원본문자열 : %s (길이: %d)\n", inputString, len);

    //8 8비트정수
    uint8_t encryptionKey= 0x0F;

    printf("처리된 문자열: ");

    for (int i = 0 ; i < len ; i++){
        char currentChar = inputString[i];

        //9.ctype.h 알파멧인경우 대문자로 변환
        if(isalpha(currentChar)){
            currentChar = toupper(currentChar);
        }
        //10 xor '^'를 사용한 간단한 암호화 비트조작
        char encryptedChar = currentChar ^ encryptionKey;
        printf("%c", encryptedChar);
    }   
    printf("\n");
}

//시간출력함수
void printCurrentTime(){
    time_t currentTime ;
    time(&currentTime);
    printf("[Date]프로그램 실행시간: %s", ctime(&currentTime));

}

