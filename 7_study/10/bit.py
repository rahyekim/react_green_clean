
'''
비트 우측 이동(right shift)연산자>> 와
>> 한칸이동 나누기2
>> 두칸이동 나누기4
반복문 for의 동작원리 문제
'''
a = 100;
result = 0;

for i in range(1,3): # i = 1,2
    result = a>> i #변수 a(100)의 비트를 오른쪽으로 i칸 밀어
    result = result +1
    print(result)

    #   1 1 0 0 1 0 0  ->  0110010 = 50  result=51
                    #   0011001 => 25 result=26