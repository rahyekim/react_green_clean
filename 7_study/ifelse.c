
#include <stdio.h>

/*
삼항연산자 : 조건식 ? 참일때 값 : 거짓일때 값
비트 시프트 연산자 : << 
숫자를 2진수로 바꾼뒤 왼쪽으로 칸을 미는 연산 
*/

int main(){
    
    int v1 =0, v2=35, v3= 29;

    if(v1> v2 ? v2 : v1){
        v2 = v2 << 2;
    }else{
        v3= v3 << 2;
    }

    printf("%d", v2+v3);


    return 0;
}