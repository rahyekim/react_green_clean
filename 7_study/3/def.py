
#입력된 데이터의 자료형 타입이 무엇인지 판별하고 그에 따른 값을 리턴

def func(value):
    if type(value)== type(100):
        return 100 #입력값이 정수형이면 무조건 100return
    elif type(value) == type(""):
        return len(value) # 입력값이 문자열이면 문자열길이 반환
    else: #정수도아냐문자열도아냐 그외모든자료형
        return 20
    
a='100.0'
b=100.0
c=(100,200)

print(func(a)+func(c)+func(b))  #5+20+20