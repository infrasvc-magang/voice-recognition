from multiprocessing import context
from turtle import title
from django.shortcuts import render,HttpResponse

# Create your views here.
def awal(request):
    return HttpResponse('berhasil diinstall')

def home(request):
    context={
        'title':title
    }
    return render(request, 'template.html',context)
