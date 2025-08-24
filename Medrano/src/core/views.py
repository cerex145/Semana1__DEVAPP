from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Item

def item_list(request):
    items = Item.objects.all()
    return render(request, 'core/item_list.html', {'items': items})


@csrf_exempt
def delete_item(request, item_id):
    if request.method == 'POST':
        try:
            item = Item.objects.get(id=item_id)
            item.delete()
            return JsonResponse({'success': True})
        except Item.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Item not found'}, status=404)
    return JsonResponse({'success': False, 'error': 'Invalid request'}, status=400)