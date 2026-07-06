'''
Numerical Python
파이선에는 배열이 존재하지 않아서 list를 사용
그런데 array를 사용하려면 numpy를 사용
사용하는 이유는 최소 list보다 50배정도가 빠름
pip install numpy
'''

import numpy as np
from numpy.ma.core import append

arr=np.array([1,2,3,4,5])
print(arr)
print(type(arr))

#배열인덱싱
print(arr[0]) #첫번째요소 

#2차원 배열에 엑세스
two = np.array([[1,2,3,4,5],[6,7,8,9,10]])
print(two)
print('2nd element on 1st row:', two[0,1]) #2

#3차원 배열
three= np.array([[[1,2,3],[4,5,6]],[[7,8,9],[10,11,12]]])
print(three)
print(three[0,1,2]) #6

#negative Indexing 배열의 끝에서 부터 접근할때 음수 인덱싱 사용
append = np.array([[1,2,3,4,5],[6,7,8,9,10]])
print('last element from 2nd dim:', append[1,-1]) #10

#numpy 복사하고 보기 변동사항이 생겼을때 원본은 남겨놔야 함
arr = np.array([1,2,3,4,5])
x= arr.copy() #원본에 영향을 끼치지 않게 하기위해 복사본 만듦
arr[0] = 42
print(x)
print(arr)

