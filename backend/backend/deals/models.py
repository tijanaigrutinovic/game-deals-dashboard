from django.db import models

class Deal(models.Model):
    title = models.CharField(max_length=255)
    store_id = models.CharField(max_length=255)
    store_name = models.CharField(max_length=255)  # Added store_name field
    original_price = models.DecimalField(max_digits=10, decimal_places=2)
    sale_price = models.DecimalField(max_digits=10, decimal_places=2)
    deal_rating = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True)  # Can be empty
    is_on_sale = models.BooleanField(default=False)
    deal_id = models.CharField(max_length=255, null=True, blank=True)  # Can be empty
    thumb_url = models.URLField()

    def __str__(self):
        return f"{self.title} ({self.store_name})"