from unicodedata import name 
from django.urls import path
from . import views

urlpatterns = [
    path('voice/',views.home,name='voice'),
    path('postdata/', views.postdata, name='postdata'),
    path('datagpt/', views.datagpt, name='datagpt'),
]