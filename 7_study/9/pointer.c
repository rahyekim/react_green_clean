#include <stdio.h> 

int main(){

    int a[4]= {0,2,4,8};
    int b[3] = {}; //비워두어서 3칸짜리 모두 0으로 초기화 // 2 0
    int i = 1; 
    int sum = 0;
    int *p1 ; //정수형포인터변수 


    for(i; i<4; i++){
        p1 = a +1;  //2
        b[i-1] = *p1 - a[i-1];  //b[0] = 2 - a[0]  //
        sum = sum+b[i-1]+a[i]; // 2 + 2

    }
    printf("%d",sum); // 4 + 2 + 12  //14
    return 0;
}