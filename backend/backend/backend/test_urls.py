from django.urls import reverse
from django.test import TestCase

class URLTest(TestCase):
    def test_register_url(self):
        url = reverse('register')
        response = self.client.post(url, data={})
        self.assertNotEqual(response.status_code, 405)

    def test_login_url(self):
        url = reverse('login')
        response = self.client.post(url, data={})
        self.assertNotEqual(response.status_code, 405)

    def test_admin_url(self):
        url = reverse('admin:index')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 302)

    def test_deals_url(self):
        url = reverse('deal-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
