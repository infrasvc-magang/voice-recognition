from django.shortcuts import render
from . import bardapi
from . import input
def my_view(request):
    data_from_api = bardapi.main
    data_from_input = input.input
    if data_from_api:
        return render(request, 'index.html', {'data': data_from_api,'text':data_from_input})
    else:
        return render(request, 'home.html')
