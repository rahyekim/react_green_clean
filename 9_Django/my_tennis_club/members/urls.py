from django.urls import path
from . import views

urlpatterns = [
    path('members/', views.members, name='members'),
    #   실제 URL 주소 ,   실행할 함수,   Django 내부에서 부르는 이름
]
