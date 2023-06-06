from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from rooms.models import Room
from .test_view import TestView
import json

class TestGetRoom(TestView):
    @property
    def room(self):
        return Room.objects.create(
            name="Test room",
            floor=12,
            room_number=1
        )

    

    def test_get_room_should_return_200_if_authenticated(self):
        path = reverse("get_room", args={self.room.id})
        response = self.client.get(path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_room_should_return_401_if_un_authenticated(self):
        path = reverse("get_room", args={self.room.id})
        un_authenticated_client = APIClient()
        response = un_authenticated_client.get(path)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_get_room_should_return_correct_room(self):
        path = reverse("get_room", args={self.room.id})
        response = self.client.get(path)
        response_data = json.loads(response.content)
        response_room_name = response_data[0]['name']
        self.assertEqual(response_room_name, self.room.name)
        
