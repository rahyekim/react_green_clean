#include <stdio.h>

/*
10진수의 특성(나머지와 몫)을 활용하여
숫자를 맨 뒤에서부터 하나씩 떼어내 새로운 숫자를 조립하는 원리
%10하면 마지막자리 버림...  

number % 10 => 마지막 자리 추출
number / 10 => 마지막 자리 제거
*/

int main(){
    int number =1234;

    int div =10;

    int result = 0;

    while(number>0){
        result = result * div; 
        //기존결과값에 10곱해서 자리수를 한칸왼쪾으로 밀어줌  2->20
        
        result = result + number % div ; // result += nubmer끝자리(마지막자리추출)
        
        number = number/ div; // 마지막자리 제거...
    }
    
    printf("%d", result); //4321

    return 0;
}

