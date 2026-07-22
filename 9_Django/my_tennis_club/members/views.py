#from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

'''
HttpResponse : 크롬이나 사파리는 파이썬 언어를 그대로 이해하지못함
우리가 쓴 텍스트나 데이터를 웹 브라우저가 알아들을 수 있게 해주는 도구
render는 html화면을 띄울때 사용
'''
#define 함수기능정의
def members(request):
    # return HttpResponse("hello world") #return 함수 일 마치고 결과물을 돌려줌
    template = loader.get_template('members.html') ## 1. 템플릿 불러오기
    return HttpResponse(template.render()) # 2. 렌더링해서 브라우저로 쏘기!

def main(request):
    template = loader.get_template('index.html')  ## 1. 템플릿 불러오기
    return HttpResponse(template.render())  # 2. 렌더링해서 브라우저로 쏘기!

def python(request):
    template = loader.get_template('python.html')  ## 1. 템플릿 불러오기
    context = {
        "greeting": 2,
    }
    return HttpResponse(template.render(context,request))  # 2. 렌더링해서 브라우저로 쏘기!

def ufunc(request):
    template = loader.get_template('ufunc.html')  ## 1. 템플릿 불러오기
    return HttpResponse(template.render())  # 2. 렌더링해서 브라우저로 쏘기!