
import requests
from bs4 import BeautifulSoup


def scrape_quotes():

    #1.데이터를가져올 url
    url = "https://quotes.toscrape.com/"

    #2.웹페이지 접속하여 HTML 데이터가져오기
    res = requests.get(url)

    #3.요청 성공했는지 확인
    if(res.status_code == 200):
        print("웹페이지 성공적으로 불러옴\n")
        print("-"*50)
    #4.가져온 HTML텍스트를 BeautifulSoup 객체로 변환(파싱)
        soup = BeautifulSoup(res.text, 'html.parser')
    #5.html 요소찾기
        quotes = soup.find_all('div', class_='quote')

    #6.찾은 요소들을 반복문을 통해 하나씩 추출
        for i, quote in enumerate(quotes, 1):
            text= quote.find('span', class_='text').text
            author = quote.find('small', class_="author").text

        #결과출력
            print(f"{i}.{text} | {author}")

            print(f"  -{author}")

        print("-"*50)
        print("스크래핑이 완료")
    else:
        print(f"실패! 상태코드:{res.status_code}")

#코드실행
if __name__ == "__main__":
    scrape_quotes()

##크롤링: 탐색  스크래핑:추출