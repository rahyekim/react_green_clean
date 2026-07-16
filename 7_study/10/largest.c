#include <stdio.h>

/*
주어진숫자(13195)의 가장 큰 
소인수(소수이면서 && 어떤 수를 나누어떨어지게 하는 소수)를 구하는 알고리즘

1) isPrime() 소수 판독기
2) main() 또는 getLargestPrimeFactor() 실제 큰 소인수 찾기 담당
*/

int isPrime(int number){ //어떤 숫자가 소수인지 판별 
    int i;
    for( i=2; i<number; i++){
         //1과 자기자신을 제외한 숫자로 나누어보기위함
         if(number % i == 0) return 0; //약수가 존재..->소수아님 
    }
    return 1; //소수일경우 참(1) 반환
}

int main(){
    int number = 13195, max_div=0, i;

    for(i=2; i<number;i++){
        if(isPrime(i)==1 && number % i ==0 ) max_div = i;

    }
    printf("%d", max_div); //덮어씀..가장큰마지막숫자가...
}

