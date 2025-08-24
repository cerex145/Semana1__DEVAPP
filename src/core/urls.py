from django.urls import path
from . import views

urlpatterns = [
    path('items/', views.item_list, name='item_list'),
    path('items/create/', views.item_create, name='item_create'),
    path('items/delete/<int:pk>/', views.item_delete, name='item_delete'),
    path('', views.index, name='index'),
]
