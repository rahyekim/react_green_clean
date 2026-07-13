
'''
가중치(확률)가 부여된 무작위 추출을 수행하는 코드
'''

from numpy import random

x= random.choice([3,5,7,9], p=[0.1,0.3,0.6,0.0], size=100) #p는 확률 #100개
print(x)
print("-"*50)

x= random.choice([3,5,7,9], p=[0.1,0.3,0.6,0.0], size=(3,5))
print(x)
print("-"*50)