
//이중포인ㅌ너와 포인터연산 묻는문제

#include <stdio.h>

void func(int** arr, int size){

    //main에서 넘겨준 pp를 여기서는arr 이 이름으로 받ㄷ음
    for(int i=0; i<size; i++){
        *(*arr + i) = (*(*arr+i) + i) % size;  ////p+i =
    /// 배열의 기존값에 현재 인덱스 번호를 더한뒤 5로 나눈 나머지를 다시 배열로
                        //*(*arr+i) = arr[i]             
    }

}

int main(){

    int arr[] = {3,1,4,1,5};
    int* p = arr; // 포인터p를 만들고 배열 arr시작주소(0번방의주소)가리키게 함 : 자동 변환 ✨ &arr[0]
    int** pp = &p; //이중포인터 pp 만들고, 포인터 p의 주소를 가리키게함
    int num = 6; 
    
    func(pp, 5);  //3 2 1 4 4
    num=arr[2];  
    printf("%d", num); //정답1 왜지...?ㅇㅅㅇ

    return 0;
}

/*

i=0 arr[0] = 3+0 % 5 //3
i=1 arr[1] 2%5 //2
i=2 arr[2] 4+2 //1


*/