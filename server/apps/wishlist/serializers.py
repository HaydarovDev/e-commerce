from rest_framework import serializers
from .models import WishlistItem


class WishlistItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = WishlistItem
        fields = ("id", "product_id", "created_at")
        read_only_fields = ("id", "created_at")
