from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import WishlistItem
from .serializers import WishlistItemSerializer


class WishlistItemViewSet(viewsets.ModelViewSet):
    queryset = WishlistItem.objects.all()
    serializer_class = WishlistItemSerializer
    permission_classes = (AllowAny,)
