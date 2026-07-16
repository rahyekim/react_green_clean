#include <stdio.h>


struct js{
    char name[12]; 
    int os, db, sum, totalSum;

};

int main(){

    struct js st[3] = {
        {"data1", 95, 88},
        {"data2", 84, 91},
        {"data3", 86, 75}
    };

    struct js *p; 

    p= &st[0];
    (p+1)-> sum = (p+1)->os + (p+2)-> db ; //84 +75

    (p+1)-> totalSum = (p+1)-> sum + p -> os + p ->db ; // 159+ 95+88


    printf("%d", (p+1)->totalSum);

    return 0;
}