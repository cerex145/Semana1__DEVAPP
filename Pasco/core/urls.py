from django.urls import path
from . import views

urlpatterns = [
    path('', views.item_list, name='item_list'),

    # API JSON
    path('api/items/', views.api_items, name='api_items'),              # GET, POST
    path('api/items/<int:item_id>/', views.api_item_detail, name='api_item_detail'),  # DELETE (y opcionalmente GET one)
]
