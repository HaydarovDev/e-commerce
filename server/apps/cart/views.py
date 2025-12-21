from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import CartItem
from .serializers import CartItemSerializer


@api_view(["GET", "POST"])
def cart_list(request):
    if request.method == "GET":
        items = CartItem.objects.all()
        serializer = CartItemSerializer(items, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = CartItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def cart_item_delete(request, pk):
    try:
        item = CartItem.objects.get(pk=pk)
    except CartItem.DoesNotExist:
        return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

    item.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
