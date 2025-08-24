from django.urls import path
from . import views

urlpatterns = [
    path('', views.item_list, name='item_list'),
]

urlpatterns = [
    path('', views.item_list, name='item_list'),
    path('api/items/<int:item_id>/delete/', views.delete_item, name='delete_item'),
]