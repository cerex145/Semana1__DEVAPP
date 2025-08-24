from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Item

def item_list(request):
    items = list(Item.objects.values())
    return JsonResponse({'items': items})

@csrf_exempt
def item_create(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        item = Item.objects.create(name=data['name'], description=data.get('description', ''))
        return JsonResponse({'id': item.id, 'name': item.name, 'description': item.description}, status=201)
    return JsonResponse({'error': 'Solo se acepta el método POST'}, status=400)

@csrf_exempt
def item_delete(request, pk):
    if request.method == 'DELETE':
        try:
            item = Item.objects.get(pk=pk)
            item.delete()
            return JsonResponse({'message': 'Item eliminado correctamente'}, status=204)
        except Item.DoesNotExist:
            return JsonResponse({'error': 'Item no encontrado'}, status=404)
    return JsonResponse({'error': 'Solo se acepta el método DELETE'}, status=400)

def index(request):
    return render(request, 'core/index.html')
