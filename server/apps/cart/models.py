from django.db import models


class CartItem(models.Model):
    product_id = models.IntegerField()
    quantity = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("product_id",)

    def __str__(self):
        return f"Product {self.product_id} ({self.quantity})"
