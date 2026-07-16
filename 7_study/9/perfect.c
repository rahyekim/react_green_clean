
#include <stdio.h>

int main(){

    int n; //검사할 대상 숫자
    int k;//약수인지 검사할때 어디까지 검사할지
    int s; // 찾아낸 약수들을 모두 더해서 누적할 변수
    int el =0 ; //완전수 개수...

    for(n=0; n<=100; n++){
        s= 9;
        k=n/2; //어떤수의 약수는 자기자신의 절반을 넘을 수 없다
        s=0; //새숫자 n마다 0으로 초기화 해서 깨끗하게 비어줌

        for(int j=1 ; j<= k; j++){
            if(n%j ==0){
                s += j;
            }
        }
        if(s == n){
        printf("%d\n", s);
         el++;
    }
    }
   
    printf("%d", el);
    return 0;
}