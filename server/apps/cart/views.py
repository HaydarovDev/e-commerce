from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CartItem
from .serializers import CartItemSerializer


class CartAPIView(APIView):

    def get(self, request):
        cart_items = CartItem.objects.all()
        serializer = CartItemSerializer(cart_items, many=True)
        return Response(serializer.data)

    def post(self, request):
        product_id = request.data.get("product_id")
        action = request.data.get("action", "increase")

        if not product_id:
            return Response(
                {"error": "product_id required"}, status=status.HTTP_400_BAD_REQUEST
            )

        cart_item, created = CartItem.objects.get_or_create(
            product_id=product_id, defaults={"quantity": 1}
        )

        if not created:
            if action == "increase":
                cart_item.quantity += 1
            elif action == "decrease":
                cart_item.quantity -= 1

            if cart_item.quantity <= 0:
                cart_item.delete()
                return Response(
                    {"message": "Product removed"}, status=status.HTTP_204_NO_CONTENT
                )

            cart_item.save()

        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request):
        product_id = request.data.get("product_id")

        if not product_id:
            return Response(
                {"error": "product_id required"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            CartItem.objects.get(product_id=product_id).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except CartItem.DoesNotExist:
            return Response(
                {"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND
            )
