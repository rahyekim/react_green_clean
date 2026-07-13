#include <stdio.h>

/*
완전수를 찾고 그 합을 구하는 프로그램 
[1,2,3 //6] 
*/

//완전수 판별기 
int test(int n){
    int i, sum=0;

    for(i=1; i<=n / 2 ; i++){ //i를 1부터 n의절반이 될때까지 
                            //어떤수의 약수중 자기 자신을 제외한 가장 큰약수는
                            //자기 자신의 절반을 넘을 수 없다    
        if(n % i == 0 ){  //i가 n의 약수라면 그약수 i를 더하여 누적
            sum += i;
        }
    }
    if(n == sum) return 1; //같다면 완전수이므로 1(true)반환

    return 0; // 같지 않다면 완전수가 아니므로 0 false 반환 
}

int main(){

    int i;
    int sum=0;
    
    for (i=2; i<=100 ;i++){ //1은 완전수가 아님 
        if(test(i))
        sum+=i;
    }
    printf("%d", sum);  //6 28 밖에 없음... 34  

    return 0;
}