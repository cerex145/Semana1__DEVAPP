from django.shortcuts import render
import json
from django.http import JsonResponse, HttpResponseNotAllowed, HttpResponseBadRequest
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_protect
from .models import Item

def item_list(request):
    items = Item.objects.all()
    return render(request, 'core/item_list.html', {'items': items})

def serialize_item(obj: Item):
    return {
        "id": obj.id,
        "name": obj.name,
        "description": obj.description,
        "created_at": obj.created_at.isoformat(),
    }

@require_http_methods(["GET", "POST"])
@csrf_protect
def api_items(request):
    if request.method == "GET":
        items = [serialize_item(i) for i in Item.objects.order_by("-created_at")]
        return JsonResponse({"items": items})
    # POST
    try:
        data = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError:
        return HttpResponseBadRequest("Invalid JSON")

    name = (data.get("name") or "").strip()
    description = (data.get("description") or "").strip()
    if not name:
        return HttpResponseBadRequest("name is required")

    it = Item.objects.create(name=name, description=description)
    return JsonResponse(serialize_item(it), status=201)

@require_http_methods(["DELETE"])
@csrf_protect
def api_item_detail(request, item_id: int):
    try:
        it = Item.objects.get(pk=item_id)
    except Item.DoesNotExist:
        return JsonResponse({"detail": "Not found"}, status=404)
    it.delete()
    return JsonResponse({"deleted": item_id})