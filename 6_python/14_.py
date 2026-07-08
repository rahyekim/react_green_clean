#배열에서 요소를 반복한다는건 순회
import numpy as np

arr = np.array([1,2,4])
#한번에 부를때 for forEach

for x in arr:
    print(x)

#3차원 배열을 부를때
arr = np.array([[1,2,3],[4,5,6]])

for a in arr:
    print(a)  #[1,2,3] [4,5,6]

print("----------------------------")

# 2차원배열의 스칼라 값 출력은ㅇ 중첩으로 해야함
arr = np.array([[1,2,7],[4,5,6]])
for a in arr:
    for b in a:
        print(b)

print("----------------------------")

#스칼라 요소에 대한 불편함을 해소하기 위해 nditer를 사용함
arr = np.array([[1,2,3],[4,5,6]])

for x in np.nditer(arr):
    print(x)

print("----------------------------")


#서로다른 데이터 유형을 가진 배열 순회  //  아래는 데이터형식을 변경하여 순회

arr = np.array([1,2,4])

# 2.nditer를 사용한 배열 순회 및 데이터타입변환

for x in np.nditer(arr, flags=['buffered'], op_dtypes=['S']):
    print(x)

'''
op_dtypes=['S'] 순회하면서 배열의 원소들을 어떤 데이터 타입으로 취급할지를 지정
'S' : 바이트 문자열을 의미 원래정수였떤 (1,2,4) 데이터를 순회하는 동안만 문자열로 캐스팅
Numpy는 기본적으로 메모리 효율성을 위해 순회 중 데이터 타입을 강제로 바꾸는것을 허용하지 않음
원본배열은 정수형인데 순회할때만 문자열로 바꾸려면
변환된 문자열 데이터를 잠시 저정해 둘 임시 메모리 공간 
flags=['buffered']는 Numpy에게 변환된 데이터를 담을 버퍼 메모리 공간 을 사용해도 좋다 ????
'''
print("----------------------------")

arr = np.array([1,2,3,4,5,6])
for x in np.nditer(arr[::2]):
    print(x)
print("----------------------------")

arr = np.array([[1, 2, 3] , [4, 5, 6]])
for x in np.nditer(arr[:, ::2]):
    print(x)


print("----------------------------")

#nd열거형을 사용할 경우
arr = np.array([[1, 2, 3, 4] , [ 5, 6,7, 8]])

for i, x in np.ndenumerate(arr):
    print(i, x) #차원에 대한 키와 value 같이나옴
