'''
배열분할
분할은 하나의 배열을 여러개로 분할
array_split(): 분할할 배열과 분할 횟수를 전달
'''
'''
머신러닝에서 데이터 분석의 필수과정....
1)학습용과 테스트용으로 데이터를 나누기(Train/Test)
2)문제지와 정답지를 분리하기 위해서
3) 컴퓨터 메모리의 한계를 극복하기 위해서
데이터가 1억줄이 넘어가면 프로그램이....뻗어버림.....
'''

import numpy as np

arr = np.array([1,2,3,4,5,6])

new_arr = np.array_split(arr,3)
print(new_arr)

#2차원 배열 세 개의2차원 배열로 분할
arr = np.array([[1,2],[3,4],[5,6],[7,8],[9,10],[11,12]])
new_arr2= np.array_split(arr,3)
print(new_arr2)

arr = np.array([[1,2,3],[4,5,6],[7,8,9],[10,11,12],[13,14,15],[16,17,18]])
new_arr3 = np.array_split(arr,3, axis=1)
print(new_arr3)


'''
#배열 검색 : 특정값을 검색하고 해당값이 일치하는 인덱스를 리턴
배열을 검색하려면 where() 메서드를 사용
'''
arr = np.array([1,2,3,4,5,4,5,6])
x=np.where(arr==4)
print(x) #몇번째 위치하는지 인덱싱 번호가 나옴 [3,5]

#값이 홀수 인 인덱스 찾기
arr= np.array([10,14,93,41,8,7])
x= np.where(arr%2==1)
print(x)

#값이 짝수인 인덱스 찾기
arr= np.array([10,14,93,41,8,7])
y= np.where(arr%2==0)
print(y)

print("-"*40)
#search sort
arr= np.array([10,14,93,41,8,7])
z= np.searchsorted(arr,7)
print(z)



