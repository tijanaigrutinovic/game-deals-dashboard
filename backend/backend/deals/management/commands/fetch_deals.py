import requests
from django.core.management.base import BaseCommand
from deals.models import Deal

class Command(BaseCommand):
    help = 'Fetch latest deals from Cheapshark API'

    def handle(self, *args, **options):
        # Dobijamo imena prodavnica sa API-ja
        stores_url = 'https://www.cheapshark.com/api/1.0/stores'
        stores_response = requests.get(stores_url)
        
        if stores_response.status_code == 200:
            store_data = stores_response.json()
            store_names = {store['storeID']: store['storeName'] for store in store_data}
        else:
            print(f"Greška pri dobijanju prodavnica: {stores_response.status_code}")
            return

        # Dobijamo dealove sa API-ja
        url = 'https://www.cheapshark.com/api/1.0/deals'
        response = requests.get(url)
        
        if response.status_code == 200:
            deals = response.json()

            # Filtriramo samo dealove sa Steam, GOG, i Humble Store (store ID-ovi: 1, 2, 3)
            valid_store_ids = ['2', '7', '11']  # Steam, GOG, Humble Store ID-ovi
            for deal in deals:
                store_id = str(deal.get('storeID'))
                
                # Obradjujemo samo dealove sa validnih prodavnica
                if store_id in valid_store_ids:
                    store_name = store_names.get(store_id, 'Nepoznata prodavnica')  # Uzima ime prodavnice
                    deal_id = deal.get('dealID', '') 
                    deal_rating = deal.get('dealRating', 0.0)  

                    # Spremamo deal u bazu podataka
                    Deal.objects.create(
                        title=deal['title'],
                        store_id=store_id,
                        store_name=store_name,  # Dodajemo ime prodavnice
                        original_price=deal['normalPrice'],
                        sale_price=deal['salePrice'],
                        deal_rating=deal_rating,
                        is_on_sale=deal['isOnSale'] == '1',  
                        deal_id=deal_id,
                        thumb_url=deal['thumb'],
                    )
                    print(f"Deal dodan: {deal['title']} sa {store_name} id {store_id}")
        else:
            print(f"Greška pri dobijanju dealova: {response.status_code}")
