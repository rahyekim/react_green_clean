
from django.contrib import admin
from django.urls import include, path

'''
admin : 장고가 기본으로 제공하는 관리자 전용
path : 웹 주소(URL) 와 그 주소로 갔을때 보여줄 화면을 연결해 주는 표지판
'''

urlpatterns =[
    path("", include('members.urls')),
    path("admin/", admin.site.urls),
]

