#include <stdio.h>
/*
배열사이에 새로운 문자 c를 끼워 넣고 원래 있던 문자들을 뒤로 한칸 씩 밀어내는
배열중간 삽입 알고리즘 문제

ASCII
컴퓨터와 통신장비가 영문 알파벳, 숫자, 기호 이해할 수 있도록 
숫자로 변환하는 표준화된 부호체계
*/

char Data[5] = {'B', 'A', 'D', 'E'} ;// 마지막 5번째 칸에는 자동으로 빈값(Null, \0)

/* ASCII
A=65
B=66
D=68
E=69
*/

char c;

int main(){

    int i, temp, temp2;

    c='C'; //아스키 67
    printf("%d\n", Data[3]-Data[1]); //E-A  69-65=4

    //아래에 반복문 
    for(i=0 ; i<5; ++i){
        if(Data[i]>c) break;
        //배열을 앞에서부터 검사해서 c(67)보다 더큰 문자가 있는지 찾음 
        // {B A D E} D가 C보다 큼 => i의값 2로 고정 
    }
    temp= Data[i]; //임시보관소에 D를 넣어줌 
    Data[i] =c;  //그 빈자리에 C넣어줌 
    i++; // i를 3으로 증가시킴 

    //새로운문자삽입준비  나머지뒤로 밀어내기
    for(;i<5; ++i){ //시작이 없음 ㅋㅋ
        temp2 = Data[i]; //i가 3일때 원래있던 'E'를 잠시보관소에 저장
        Data[i]= temp; //빈자리에 D(temp)를 넣어줌 
        temp = temp2;  //배열이완성?

    }
    //완성된 내용을 처음부터 끝까지 문자형식으로 출력
    for(i=0;i<5; i++){
        printf("%c\t", Data[i]);
    }


    return 0;
}