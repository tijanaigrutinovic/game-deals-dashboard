from django.db import models

class Deal(models.Model):
    title = models.CharField(max_length=255)
    store_id = models.CharField(max_length=255)
    original_price = models.DecimalField(max_digits=10, decimal_places=2)
    sale_price = models.DecimalField(max_digits=10, decimal_places=2)
    deal_rating = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True)  # Može biti prazan
    is_on_sale = models.BooleanField(default=False)
    deal_id = models.CharField(max_length=255, null=True, blank=True)  # Omogućeno da bude prazno
    thumb_url = models.URLField()

    def __str__(self):
        return self.title