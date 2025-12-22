from rest_framework.viewsets import ModelViewSet
from .seralizers import ProductSerializer
from .models import Product


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all().order_by("-price")
    serializer_class = ProductSerializer
