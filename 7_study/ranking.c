
#include <stdio.h>

int main(){

    int result[5]; // int result[5]= {0} 빈공간 다섯개짜리 배열

    int arr[5]= {77,32,10,99,50};

    for(int i =0 ; i<5 ; i++){
        //반복문 나를 선택하는 과정
        result[i] = 1; // 비교전 나는 무조건 1등 전제..나보다큰애나오면 +1..2등..3등..

        for(int j=0 ; j<5 ; j++){
        //j를 0~4까지 돌리면서 배열안의 모든점수불러와 나와 비교
            if(arr[i] < arr[j] ){ //내점수i 상대방 j
        //만약 나보다 점수가 높은사람이 있다면
                result[i]++; //내등수 1증가 

            }
        }
    }

    for (int k=0 ; k < 5 ; k++){
        printf("%d", result[k]);
    }
   

    return 0;
}