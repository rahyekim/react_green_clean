#from django.shortcuts import render
from multiprocessing import context
from scipy import constants, optimize, sparse, spatial, interpolate, stats

import numpy as np
from django.http import HttpResponse
from django.template import loader

from typing import List, Union
import logging

# #define 함수기능정의
'''
HttpResponse : 크롬이나 사파리는 파이썬 언어를 그대로 이해하지못함
우리가 쓴 텍스트나 데이터를 웹 브라우저가 알아들을 수 있게 해주는 도구
render는 html화면을 띄울때 사용

# logging :
 프로그램이 돌아가는 상황이나 에러를 뒤에서 몰래 기록장(로그)에
 적어두기 위한 도구 
 
# from typing import List, Union
 변수나 함수가 어떤 형태의 데이터(리스트? 숫자?)를 쓰는지
 코드에 명확히 적어두기위한 힌트 도구
'''
# 장고의 기본.. ✨ 로깅 시스템 ✨ 사용
logger = logging.getLogger(__name__)

# 현재 이 파이썬 파일의 이름을 제목으로 삼아서,
# 에러나 상황을 기록할 기록장(logger)

'''
클래스는 관련된 데이터의 기능(함수)를 하나로 묶어놓은
설계도 또는 전문가 상자 라고 생각하면됨..
'''
class SpeedAnalyser:
    '''
    __init__ : 이 전문가 상자를 처음 사용할 때 (객체만들때)
    무조건 1순위로 실행되는 초기화 함수..
    '''
    def __init__(self,speeds:List[Union[int,float]]):
        self.speeds = speeds

    #평균 구하는 함수 -> 결과물: 소수점이 있는 실수(float) 뱉어낸다고적은것
    def calculate_mean(self)->float:
        if not self.speeds:
            #멈추는 대신 0,0 을 돌려주고 기록장에 데이터가없음 경고메모 날림
            logger.warning("분석할 속도 데이터가 없음")
            return 0,0
        try: #데이터가 있으면 아래 계산 코드 try
            return float(np.mean(self.speeds)) #결과물:실수
        except Exception as e: #알수없는 이유로 에러터지면 이곳으로..
            logger.error(f"평균 계산중 오류 발생:{e}") #상세한이유 알랴줌
            raise
        #에러를 조용히 덮지 않고,여기문제생겻어 라고 시스템 전체에 알림(실행중단)

def mode(request): #웹사이트 접속시 실행될 화면 컨트롤러(뷰)
    #분석할 데이터 원본
    raw_speed_data = [99, 86, 87, 88, 111, 86, 103, 87, 94, 78, 77, 85, 86]

    #분석기 객체를 생성하고 평균계산
    anaylzer = SpeedAnalyser(raw_speed_data)
    average_speed = anaylzer.calculate_mean()

    #템플릿에 전달할 데이터
    context = {
        'speed_data': raw_speed_data,
        'data_count': len(raw_speed_data),
        'average_speed': round(average_speed,2),
    }
    template = loader.get_template('mode.html')  ## 1. 템플릿 불러오기
    return HttpResponse(template.render(context, request))

def scipy(request):
    #1.상수
    pi_value = constants.pi
    speed_of_light = constants.c #빛의속도

    #2.최적화 방정식의 해(root)를 찾는 것
    #  Root Finding (방정식의 해 찾기)
    # 함수의 결과값이 0이 되는 지점(root)을 찾는 기능
    # equation 함수는 x² - 4 = 0 형태의 방정식을 표현
    # optimize.root를 이용해 방정식의 해를 계산

    def equation(x):
        return x**2 -4
    root_result = optimize.root(equation, 0).x[0]

    #3.희소행렬 Sparse Data
    # 대부분의 값이 0인 행렬을 효율적으로 저장하는 방법
    # dense_matrix는 일반적인 2차원 배열 형태
    # sparse.csr_matrix는 0이 아닌 값만 저장하는 압축 방식

    dense_matrix = np.array([[0,0,0],[0,5,0],[2,0,0]])
    sparse_matrix = sparse.csr_matrix(dense_matrix)
    sparse_str = str(sparse_matrix).replace('\n', '<br>')
    # 0이 아닌 값(5, 2)만 저장하여
    # 메모리 사용량을 줄이고 큰 데이터 처리에 효율적


    #4.Spatial Data 공간데이터
    # 두 점(point) 사이의 거리를 계산하는 기능
    # point1과 point2는 3차원 공간의 좌표(x, y, z)
    # euclidean distance는 피타고라스 정리를 기반으로 직선 거리를 계산

    point1 = (1,2,3)
    point2 = (4,5,6)
    distance = spatial.distance.euclidean(point1, point2)

    #5.보간법 Interpolation
    # 알려진 데이터 사이의 값을 추정하는 방법
    # x_known, y_known은 기존 데이터
    # interp1d를 이용해 x=2일 때의 y값을 예측
    x_known = np.array([1,3,5])
    y_known = np.array([10,30,50])
    interp_func = interpolate.interp1d(x_known, y_known)
    interp_result = float(interp_func(2))

    #6.통계검정
    # 두 그룹의 평균 차이가 통계적으로 의미가 있는지 확인
    # t-test는 두 집단의 평균을 비교하는 대표적인 통계 검정 방법
    group_a = [10.5, 11.2, 10.8]
    group_b = [11.5, 12.5, 13.5]
    t_stat, p_value = stats.ttest_ind(group_a, group_b)

    # 결과:
    # t_stat : 두 그룹 평균 차이를 나타내는 통계량
    # p_value : 우연히 이런 차이가 발생할 확률
    #
    # 일반적으로 p_value < 0.05이면
    # 두 그룹의 평균 차이가 통계적으로 유의하다고 판단

    context={
        'pi_value': pi_value, #원주율(π) 값
        'speed_of_light': speed_of_light, #빛의 속도 값
        'root_result': round(root_result,2), # 방정식의 해(root) 결과값
        'sparse_str': sparse_str, #희소행렬(sparse matrix)을 문자열로 변환한 값
                                # HTML 출력용 데이터
        'distance': round(distance,2),  # 두 공간 좌표 사이의 유클리드 거리
        'interp_result': interp_result, # 보간 결과값
        't_stat': t_stat, # t-검정 통계량
        'p_value': round(p_value,4),   # t-검정 p-value
    }
    template = loader.get_template('scipy.html')  ## 1. 템플릿 불러오기
    return HttpResponse(template.render(context, request))


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

    arr1 = np.array([10, 11, 12, 13, 14, 15])
    arr2 = np.array([20, 21, 22, 23, 24, 25])


    # for문과 zip을 이용한 덧셈계산
    for i ,j in zip(x,y):
        z.append(i + j)

    # 배열덧셈
    newarr = np.add(arr1, arr2)

    # power
    powarr = np.power(arr1, arr2)






    #html화면에 넘겨줄 데이터 패킹
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
        'arr1':arr1.tolist(),
        'arr2':arr2.tolist(),
        'newarr': newarr.tolist(),
        'powarr': powarr.tolist(),


    }
    template = loader.get_template('ufunc.html')
    return HttpResponse(template.render(context,request))