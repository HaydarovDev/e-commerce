from django.db import models


class WishlistItem(models.Model):
    product_id = models.IntegerField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Product {self.product_id}"
