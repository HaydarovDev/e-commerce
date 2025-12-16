from django.db import models

class Product (models.Model):
    title = models.CharField(max_length=200)
    desc = models.TextField()
    price = models.IntegerField()
    count = models.PositiveIntegerField()
    image = models.ImageField(upload_to="products/", null=True, blank=True)

    def __str__(self):
        return self.title