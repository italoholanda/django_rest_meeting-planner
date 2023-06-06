from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .test_view import TestView


class TestCreateRoom(TestView):

    def test_create_room_should_return_201_valid_room(self):
        data = {
            "name": "Test create room",
                    "floor": 12,
                    "room_number": 1
        }
        path = reverse("create_room")
        response = self.client.post(path, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_room_should_return_401_if_un_authorized(self):
        data = {
            "name": "Test create room",
                    "floor": 12,
                    "room_number": 1
        }
        path = reverse("create_room")
        un_authenticated_client = APIClient()
        response = un_authenticated_client.post(
            path, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
