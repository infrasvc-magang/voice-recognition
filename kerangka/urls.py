from unicodedata import name 
from django.urls import path
from . import voice
from . import views

urlpatterns = [
    path('voice/',views.home,name='voice'),
    # path('home',views.home,name='home'),
    path('voiceget/', voice.my_view, name='voiceget'),
    # path('view/', models.view, name='view'),
]