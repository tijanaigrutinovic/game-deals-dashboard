from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from deals.models import Deal

class RegisterTestCase(APITestCase):
    def test_register_success(self):
        url = reverse('register')
        data = {
            "username": "testuser",
            "password": "testpassword",
            "repeat_password": "testpassword"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username="testuser").exists())

    def test_register_password_mismatch(self):
        url = reverse('register')
        data = {
            "username": "testuser",
            "password": "testpassword",
            "repeat_password": "wrongpassword"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Passwords must match.", response.data["non_field_errors"])

class LoginTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpassword")

    def test_login_success(self):
        url = reverse('login')
        data = {
            "username": "testuser",
            "password": "testpassword"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_login_invalid_credentials(self):
        url = reverse('login')
        data = {
            "username": "testuser",
            "password": "wrongpassword"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data, {"error": "Invalid credentials"})

class DealTestCase(APITestCase):
    def setUp(self):
        self.deal = Deal.objects.create(
        title="Test Deal",
        store_id="1",
        store_name="Steam",
        original_price=19.99,
        sale_price=9.99,
        deal_rating=4.5,
        is_on_sale=True,
        deal_id="test-deal-123",
        thumb_url="https://example.com/image.jpg",
        steam_rating_text="Very Positive",
        release_date=2023,
        metacritic_link="https://www.metacritic.com/game/test-deal"
    )

    def test_get_deals(self):
        url = reverse('deal-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["title"], "Test Deal")
