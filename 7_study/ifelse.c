#include <stdio.h>

//재귀함수 수학의 팩토리얼(계승)을 계산하는 프로그래밍
// 7! 7x6x5x4x3x2x1

int f(int n){
    if(n <=1 ) return 1;  //종료조건 Base case 
    else return n * f(n-1); //재귀호출 Recursive Step
}

int main(){

    
    printf("%d", f(7)); //5040
    return 0;
}