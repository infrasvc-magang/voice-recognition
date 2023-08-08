from multiprocessing import context
from turtle import title
from django.shortcuts import render,HttpResponse
from django.http import JsonResponse
import requests
import os
from bardapi import Bard
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
def awal(request):
    return HttpResponse('berhasil diinstall')

def home(request):
    context={
        'title':title
    }
    return render(request, 'template.html',context)

# def tampil(request):
#     context={
#         'title':title
#     }
#     return render(request, 'home.html',context)

def datagpt(request):
    os.environ["_BARD_API_KEY"] = "ZQjdFljLGNvwvYhDyiD7-WzqYLrjATqSH02RJO-XFqPhf3-o3pBzlnvMtdHe75d1S7Gf5w."  # Ganti dengan URL API yang sesuai
    text = "apa itu mobil"
    response = Bard().get_answer(text)['content']
    try:
        data = {'response': response}  # Menggunakan dictionary untuk memuat data
        return JsonResponse(data)
    except requests.exceptions.RequestException as e:
        return None


# def index(request):
#     return render(request, 'home.html')

@csrf_exempt
def postdata(request):
    if request.method == 'POST':
        data = request.POST.get('message', None)
        os.environ["_BARD_API_KEY"] = "ZQjdFljLGNvwvYhDyiD7-WzqYLrjATqSH02RJO-XFqPhf3-o3pBzlnvMtdHe75d1S7Gf5w."
        response = Bard().get_answer(data)['content']
        # response_message = f'You sent: {data}'
        
        response_data = {
            'response': response
        }
        return JsonResponse(response_data)
    
    return JsonResponse({'response': 'This endpoint only supports POST requests.'})