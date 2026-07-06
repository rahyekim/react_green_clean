
#파이썬의 4대 컬렉션
'''
list tuple dictionary set

파이썬은 array가 없다
대신 리스트를 사용한다 
numpy는 리스트보다 최소 50배 빠르다


'''

mylist = '''

리스트는 하나의 변수에 여러 항목을 저장하는데 사용된다.
대괄호를 사용
순서가 지정 
변경가능하며 중복된 값 허용

'''

print(mylist)


thislist=["a","b","c"]
print(thislist)

print(thislist[0])

#negative indexing 
print(thislist[-1])

thislist=[1,2,3,4,5,6,7] 

print(thislist[:4]) #라스트 인덱스 미포함 

