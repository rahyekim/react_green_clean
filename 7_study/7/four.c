
#include <stdio.h>

int main(){
    int c = 0;
    int i;
    for (i =1; i <= 2023 ; i++){
        if(i % 4 == 0 ){
            c++;

        }
    }

    printf("%d", c); // 505.75 = 505개.... 506은 2024니꽈...
    return 0;
}