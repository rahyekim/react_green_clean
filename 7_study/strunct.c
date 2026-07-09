#include <stdio.h>

/*
🍁 은행계좌 시뮬레이션
함수에 있는 내 통장의 데이터를 다른 함수들이 조작할때 복사본을 넘겨주는 것이아니라
메모리주소를 넘겨주어 원본 데이터를 직접 수정하게 만듦

*/
//typedef 이용해서 BankAccount account; 바로 사용할 수 있게

typedef struct{   //BackAccount 설계도 
    int accountNum; double bal; //계좌번호, 잔액
}BankAccount; 

double sim_pow(double base, int year){ //거듭제곱 계산기(이자율계산)
    int i ;
    double r = 1.0;
    for( i=0 ; i < year; i++){
        r = r * base;
    }
    return r;  
}
//BankAccount *account 구조체의 주소를 받는다
//BankAccount 구조체를 가리키는 주소를 저장하는 변수 account
//주소를 넘겨야 원본이 바뀜
//= "BankAccount 구조체의 주소를 저장하는 포인터 변수 account"
void initAccount(BankAccount *account, int x , double y){ //계좌 초기화
    account -> accountNum = x;   //통장의 주소를 ㄹ받아서 계좌번호는 x에 잔액은 y에
    account -> bal = y;
}
void xxx(BankAccount *account , double *request){
    if( *request > 0 && *request < account -> bal){
        //요청금액이 0보다 크고 계좌잔액보다 작으면 출금
        account -> bal = account ->bal - *request;
    }else{ 
        account -> bal = account -> bal + *request;
    }
}

void yyy(BankAccount *account){
    account-> bal = account-> bal * sim_pow(1.1,3);
}  //현재잔액에 3년치 복리이자10%적용


int main () {

    BankAccount myAccount;
    //내통장 만들고 메모리 주소를 넘겨 초기화
    initAccount(&myAccount, 998112234, 2200.0); //계좌번호,잔액

    double amount = 100.0 ; //100원요청 
    //100은 0보다 크고 잔액보다 작아서 출금실행... 잔액:2200 -100

    xxx(&myAccount, &amount);
    yyy(&myAccount);
    // sim_pow(1.1,3) 1.1*1.1*1.1 = 1.331
    // 잔액 2100 * 1.331

    printf("%d and %.2f", myAccount.accountNum, myAccount.bal);

    return 0;   //998112234 and 2795.10

}

/*
account->bal == (*account).bal


//BankAccount *account 구조체의 주소를 받는다
//BankAccount 구조체를 가리키는 주소를 저장하는 변수 account
//주소를 넘겨야 원본이 바뀜
//= "BankAccount 구조체의 주소를 저장하는 포인터 변수 account"
*/