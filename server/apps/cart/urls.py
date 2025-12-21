from django.urls import path
from . import views

urlpatterns = [
    path("cart/", views.cart_list, name="cart-list"),
    path("cart/<int:pk>/", views.cart_item_delete, name="cart-delete"),
]
