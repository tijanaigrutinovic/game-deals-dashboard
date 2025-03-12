import requests
from django.core.management.base import BaseCommand
from deals.models import Deal

class Command(BaseCommand):
    help = 'Fetch latest deals from Cheapshark API'

    def handle(self, *args, **options):
        url = 'https://www.cheapshark.com/api/1.0/deals'
        response = requests.get(url)
        
        if response.status_code == 200:
            deals = response.json()

            for deal in deals:
                print(deal)

                deal_id = deal.get('dealID', '') 
                deal_rating = deal.get('dealRating', 0.0)  

                Deal.objects.create(
                    title=deal['title'],
                    store_id=deal['storeID'],
                    original_price=deal['normalPrice'],
                    sale_price=deal['salePrice'],
                    deal_rating=deal_rating,
                    is_on_sale=deal['isOnSale'] == '1',  
                    deal_id=deal_id,
                    thumb_url=deal['thumb'],
                )
        else:
            print(f"Failed to fetch deals: {response.status_code}")