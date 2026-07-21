
from django.contrib import admin
from django.urls import include, path

'''
admin : 장고가 기본으로 제공하는 관리자 전용
path : 웹 주소(URL) 와 그 주소로 갔을때 보여줄 화면을 연결해 주는 표지판
'''

urlpatterns =[
    path("", include('members.urls')), #사이트 첫 화면(루트) 접속은 members 앱의 URL 설정한테 맡길게!"
    path("admin/", admin.site.urls),
]  #장고가 기본으로 주는 강력한 관리자 페이지는 /admin/으로 접속해!

'''
1. 가상환경 생성 및 Django 설치
python -m venv myworld
pip install Django

2. 프로젝트만들기: 장고관리자에게 프로젝트 시작해줘!
django-admin startproject my_tennis_club

3. 프로젝트 폴더로 이동 & 앱(App) 만들기
cd my_tennis_club
python manage.py startapp members

4. 개발 서버 실행하기
python manage.py runserver
'''