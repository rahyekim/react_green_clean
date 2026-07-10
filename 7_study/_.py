

import requests
from bs4 import BeautifulSoup

def screape():
    
    url = "https://quotes.toscrape.com/"

    res= requests.get(url)

    if (res.status_code == 200):
        print("웹페이지 성공")
        
        soup = BeautifulSoup(res.text, 'html.parser')
        
        quotes = soup.find_all( "div",class_="quote")

        for i, quote in enumerate(quotes, 1):
            text= quote.find("span", class_="text").text
            author=quote.find("small", class_="author").text
            
            print(f"{i}.{text} | {author}")
            print(f"  -{author}")
        print("스크래핑완료")
    else:
        print(f"실패: {res.status.code}")

if __name__ == "__main__":
    screape()
    
            

        
