import requests
import time
from django.core.management.base import BaseCommand
from deals.models import Deal
from requests.exceptions import RequestException

def fetch_data_with_retries(url, retries=3, delay=2):
    for _ in range(retries):
        try:
            response = requests.get(url)
            response.raise_for_status()  
            return response
        except RequestException as e:
            print(f"Greška pri preuzimanju podataka: {e}")
            time.sleep(delay)  
    return None 
    
class Command(BaseCommand):
    help = 'Fetch latest deals from Cheapshark API'

    def handle(self, *args, **options):
        stores_url = 'https://www.cheapshark.com/api/1.0/stores'
        stores_response = fetch_data_with_retries(stores_url)

        if not stores_response:
            print("Neuspešno preuzimanje prodavnica.")
            return

        store_data = stores_response.json()
        store_names = {store['storeID']: store['storeName'] for store in store_data}

        url = 'https://www.cheapshark.com/api/1.0/deals'
        response = fetch_data_with_retries(url)

        if not response:
            print("Neuspešno preuzimanje dealova.")
            return

        deals = response.json()[:16]  

        valid_store_ids = {'13', '23', '34', '33'}  

        for deal in deals:
            store_id = str(deal.get('storeID'))

            if store_id in valid_store_ids:
                store_name = store_names.get(store_id, 'Nepoznata prodavnica')  
                deal_id = deal.get('dealID', '')

                if not Deal.objects.filter(deal_id=deal_id).exists():
                    Deal.objects.create(
                        title=deal['title'],
                        store_id=store_id,
                        store_name=store_name,
                        original_price=deal['normalPrice'],
                        sale_price=deal['salePrice'],
                        deal_rating=deal.get('dealRating', 0.0),
                        is_on_sale=deal['isOnSale'] == '1',
                        deal_id=deal_id,
                        thumb_url=deal['thumb'],
                        steam_rating_text=deal.get('steamRatingText', ''),  
                        release_date=deal.get('releaseDate', ''),  
                        metacritic_link=deal.get('metacriticLink', '')
                    )
                    print(f"Deal dodan: {deal['title']} sa {store_name} (ID: {store_id})")
                    print(f"Steam rating text: {deal.get('steamRatingText', 'N/A')}")
                    print(f"Release date: {deal.get('releaseDate', 'N/A')}")
