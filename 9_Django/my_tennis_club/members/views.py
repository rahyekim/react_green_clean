#from django.shortcuts import render
import numpy as np
from django.http import HttpResponse
from django.template import loader


'''
HttpResponse : 크롬이나 사파리는 파이썬 언어를 그대로 이해하지못함
우리가 쓴 텍스트나 데이터를 웹 브라우저가 알아들을 수 있게 해주는 도구
render는 html화면을 띄울때 사용
'''
#define 함수기능정의
def members(request):
    # return HttpResponse("hello world") 
    # #return 함수 일 마치고 결과물을 돌려줌
    template = loader.get_template('members.html') ## 1. 템플릿 불러오기
    return HttpResponse(template.render()) # 2. 렌더링해서 브라우저로 쏘기!

def main(request):
    template = loader.get_template('index.html')  ## 1. 템플릿 불러오기
    return HttpResponse(template.render())  # 2. 렌더링해서 브라우저로 쏘기!

def python(request):
    template = loader.get_template('python.html')  
    context = {
        "greeting": 2,
    }
    return HttpResponse(template.render(context,request))

#평범 일반함수
def custom_add(x,y):
    return x+y
#평범함수를 ufunc으로 upgrade  #np.frompyfunc(함수,입력개수,출력개수) ->각 원소끼리 custom_add 실행
my_ufunc_add = np.frompyfunc(custom_add,2,1)

def ufunc(request):
    #1.파이썬 기본 리스트 준비
    x= [1,2,3,4]
    y= [4,5,6,7]
    z=[]

    a = [1, 2, 3, 4]
    b = [4, 5, 6, 7]
    c = np.add(a, b) #같은 더하기여도 더빠름..

    d = [1, 2, 3, 4]
    e = [5, 6, 7, 8]
    f = my_ufunc_add(d,e)

    #2.for문과 zip을 이용한 덧셈계산
    for i ,j in zip(x,y):
        z.append(i + j)
    #3. html화면에 넘겨줄 데이터 패킹
    context = {
        'list_x':x,
        'list_y':y,
        'result_z':z,
        'list_a': a,
        'list_b':b,
        'result_c':c.tolist(),
        'list_d': d,
        'list_e': e,
        'result_f':f.tolist(),
    }
    template = loader.get_template('ufunc.html')
    return HttpResponse(template.render(context,request))