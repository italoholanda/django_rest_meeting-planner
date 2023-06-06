from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from rooms.models import Room
from rooms.models import Room
from .test_view import TestView


class TestDeleteRoom(TestView):

    def create_room(self):
        return Room.objects.create(
            name="Spring room",
            floor=12,
            room_number=1
        )

    def test_delete_room_should_return_401_if_un_authenticated(self):
        room = self.create_room()
        path = reverse("delete_room")
        un_authenticated_client = APIClient()
        response = un_authenticated_client.delete(f"{path}?id={room.id}")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_room_should_return_200_if_authenticated(self):
        room = self.create_room()
        path = reverse("delete_room")
        response = self.client.delete(f"{path}?id={room.id}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_room_should_delete_correct_room(self):
        room = self.create_room()
        path = reverse("delete_room")
        self.client.delete(f"{path}?id={room.id}")

        def find_room():
            Room.objects.get(pk=room.id)

        self.assertRaises(Room.DoesNotExist, find_room)
