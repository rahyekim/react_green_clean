
import requests
from bs4 import BeautifulSoup

from http.client import responses

#1.정보를 가져올 타겟 url설정 (연습용 명언웹사이트)
url= 'http://quotes.toscrape.com/'

#2. 해당 웹페이지에 접속해서 전체html 데이터 가져오기

response = requests.get(url)

#정상적으로 접속되었는지 확인 200이면성공

if response.status_code == 200:
    print('웹페이지 접속 성공! 데이터를 분석합니다\n')
    #3.파이썬이 이해하기 쉽도록 HTML 데이터를 변환(파싱)
    soup = BeautifulSoup(response.text, 'html.parser')
    print("-----------------")
    print(response.text)
    print("-----------------")


    #4.우리가 원하는 특정 데이터만 찾아내기
    #이 사이트는 명언이 <span class='text'> 태그안에 들어있음
    quotes = soup.find_all( 'span', class_='text')
    print("-----------------")
    print(quotes)
    print("-----------------")
    for i, quote in enumerate(quotes[:5], 1):
        print(f"{i}.{quote.text}")
else: #⚠️ 위치주의
    print(f"웹페이지 접속실패: 에러코드{response.status_code}")

'''
크롤링: 어떤 웹페이지들이 있는지 찾아내고 지도(색인)을 만드는것
스크래핑: 내가원하는 알멩이(데이터)만 쏙쏙 뽑아옴 
'''
'''
1단계: 주소 주고 데이터 받아오기
2단계: 파싱(요리)하기
3단계: 원하는 거 뽑아오기

파싱전(res.text):"<html><body><div class='quote'><span class='text'>명언....(컴퓨터 입장에선 그냥 긴 단어 한 개)
파싱후(soup):
🌳최상위 부모: <html>
    🌿 자식: <body>
        🍁그 아래 자식: <div class="quote">
            🔍 막내 알맹이 <span class="text">
'''