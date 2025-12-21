from django.db import models


class CartItem(models.Model):
    product_id = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Product {self.product_id} - Qty: {self.quantity}"
