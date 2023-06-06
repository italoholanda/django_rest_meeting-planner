from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .test_view import TestView


class TestGetRooms(TestView):

    def test_get_rooms_should_return_200_if_authenticated(self):
        path = reverse("get_rooms")
        response = self.client.get(path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_rooms_should_return_401_if_un_authenticated(self):
        path = reverse("get_rooms")
        un_authenticated_client = APIClient()
        response = un_authenticated_client.get(path)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
