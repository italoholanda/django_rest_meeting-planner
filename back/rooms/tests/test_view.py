from rest_framework.test import APIClient, APITestCase
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User


class TestView(APITestCase):
    def setUp(self):
        self.user = self.create_user()
        self.token = Token.objects.create(user=self.user)
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token}")

    def create_user(self):
        return User.objects.create_user(username="test", password="test")
