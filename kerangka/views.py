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

# def index(request):
#     return render(request, 'home.html')

def datagpt(request):
    os.environ["_BARD_API_KEY"] = "ZQjdFljLGNvwvYhDyiD7-WzqYLrjATqSH02RJO-XFqPhf3-o3pBzlnvMtdHe75d1S7Gf5w."  # Ganti dengan URL API yang sesuai
    text = "apa itu mobil"
    response = Bard().get_answer(text)['content']
    try:
        data = {'response': response}  # Menggunakan dictionary untuk memuat data
        return JsonResponse(data)
    except requests.exceptions.RequestException as e:
        return None

@csrf_exempt
def postdata(request):
    if request.method == 'POST':
        data = request.POST.get('message', None)
        
        # Set the CORS header to allow requests from 'http://127.0.0.1:3000'
        response = JsonResponse({'response': 'This endpoint only supports POST requests.'})
        response["Access-Control-Allow-Origin"] = "http://127.0.0.1:3000"
        response["Access-Control-Allow-Methods"] = "POST"

        os.environ["_BARD_API_KEY"] = "aAipaXz47IJ044hCfFE6Eb9o8n56TGKahozqLt9vt6Wpnvf2_CXNWwUtKW3M2s-yUyE3FQ."
        
        # Try to get an answer from BARD
        try:
            response_data = Bard().get_answer(data)['content']

            # Limit response to three sentences
            sentences = response_data.split(". ")  # split by dot and space
            sentences = [s + ". " for s in sentences]  # add dot and space back
            response_data = "".join(sentences[:3])

            response = JsonResponse({'response': response_data})

            # Set the CORS header to allow requests from 'http://127.0.0.1:3000'
            response["Access-Control-Allow-Origin"] = "http://127.0.0.1:3000"
            response["Access-Control-Allow-Methods"] = "POST"

            return response
        
        # Catch any exception and return an error message
        except Exception as e:
            data = {'response': "Terjadi kesalahan pada server, periksa kembali token anda"}
            error_message = f"Gagal menerima jawaban dari BARD karena {e}"
            return JsonResponse({'error': error_message})

    return JsonResponse({'response': 'This endpoint only supports POST requests.'})