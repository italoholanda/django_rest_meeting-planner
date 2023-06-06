from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from rooms.models import Room
from .test_view import TestView


class TestUpdateRoom(TestView):
    @property
    def room(self):
        return Room.objects.create(
            name="Test room",
            floor=12,
            room_number=1
        )

    def test_update_room_should_return_200_if_authenticated(self):
        room_data = {
            "name": "Test create room",
                    "floor": 12,
                    "room_number": 1
        }
        path = reverse("update_room")
        full_path = f"{path}?id={self.room.id}"
        response = self.client.put(full_path, data=room_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_room_should_return_401_if_un_authenticated(self):
        room_data = {
            "name": "Test create room",
                    "floor": 12,
                    "room_number": 1
        }
        path = reverse("update_room")
        un_authenticated_client = APIClient()
        full_path = f"{path}?id={self.room.id}"
        response = un_authenticated_client.put(
            full_path, data=room_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_room_should_update_room_correctly(self):
        room_data = {
            "name": "Test create room",
                    "floor": 12,
                    "room_number": 1
        }
        path = reverse("update_room")
        full_path = f"{path}?id={self.room.id}"
        self.client.put(full_path, data=room_data, format="json")
        saved_room = Room.objects.filter(name=room_data["name"]).first()
        self.assertIsNotNone(saved_room)
