
'''
난수란 매번 다른 숫자를 의미하는 것이 아니라
논리적으로 예측할 수 없는 것을 의미...
'''

from numpy import random

# x= random.randint(1,100)
# print(x)
# y=random.randint(1,100)
# print(y)
# z=random.randint(1,100)
# print(z)

#???? 부동소수점... 소수점 위치를 움직여 표현하는 실수 저장 방식... 유효 숫자 + 지수(exponent)로 나눠저장
# float
# double
# 2진수 표현 한계 때문에 오차 발생 가능
# 정수는 정확하게 저장, 실수(float/double)는 근사값으로 저장

#임의의 부동소수점 생성 random모듈의 rand()메서드는 0과 1사이의 임의의 실수값
x = random.rand(3)
print(x)

#랜덤배열 생성
x= random.randint(100, size=(5))  #최대값, 배열크기
print(x)

#랜덤배열 2차원 생성
x= random.randint(100, size=(3,5)) #3열5행
print(x)

#실수로 할때는 rand
x = random.rand(5,3)
print(x)

# choice() 메서드를 사용하면 값 배열을 기반으로 난수를 생성
x= random.choice([1,2,3,4,5,6])
print(x)

x = random.choice([3,5,7,9], size=(3,5))
print(x)