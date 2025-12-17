from django.contrib import admin
from .models import WishlistItem


@admin.register(WishlistItem)
class WishlistItemAdmin(admin.ModelAdmin):
    list_display = ("id", "product_id", "created_at")  # faqat mavjud fieldlar
    list_filter = ("created_at",)  # wishlist va user yo‘q
