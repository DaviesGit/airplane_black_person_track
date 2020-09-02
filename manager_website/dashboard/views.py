from django.shortcuts import render
from django.shortcuts import render_to_response
from django.template import Template, Context
from django.views.decorators.csrf import csrf_exempt
import json
from . import black_person_manager

# Create your views here.
from django.http import HttpResponse, JsonResponse


def all_html(request, path=''):
    return render_to_response('.' + request.path)


def index(request):
    return render_to_response("./dashboard/index.html")


@csrf_exempt
def update_data(request):
    request_type = request.POST['type']
    if 'add_person' == request_type:
        result = black_person_manager.add_person(json.loads(request.POST['person']))
        return JsonResponse(result)
    elif 'delete_person' == request_type:
        result = black_person_manager.delete_person(request.POST['id_card'])
        return JsonResponse(result)
    elif 'edit_person' == request_type:
        result = black_person_manager.edit_person(json.loads(request.POST['person']))
        return JsonResponse(result)
    elif 'get_person' == request_type:
        result = black_person_manager.get_person(request.POST['id_card'])
        return JsonResponse(result)
    elif 'get_all_person' == request_type:
        result = black_person_manager.get_all_person()
        return JsonResponse(result)
    else:
        return JsonResponse({
            'status': 1,
            'error': 'unknown command',
        })
