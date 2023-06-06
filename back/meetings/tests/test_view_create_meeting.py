from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .test_view import TestView
from rooms.models import Room


class TestCreateMeeting(TestView):

    def test_create_meeting_should_return_400_if_invalid_room(self):
        data = {
            "title": "Retrospective",
            "duration": 1,
            "date": "2023-06-04",
            "start_time": "09:00:00",
            "room": 1
        }
        path = reverse("create_meeting")
        response = self.client.post(path, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_meeting_should_return_201_valid_room(self):
        new_room = Room.objects.create(
            name="Test room",
            floor=12,
            room_number=1
        )
        meeting_data = {
            "title": "Retrospective",
            "duration": 1,
            "date": "2023-06-04",
            "start_time": "09:00:00",
            "room": new_room.id
        }
        path = reverse("create_meeting")
        response = self.client.post(path, data=meeting_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_meeting_should_return_401_if_un_authorized(self):
        new_room = Room.objects.create(
            name="Test room 2",
            floor=12,
            room_number=1
        )
        meeting_data = {
            "title": "Retrospective",
            "duration": 1,
            "date": "2023-06-04",
            "start_time": "09:00:00",
            "room": new_room.id
        }
        path = reverse("create_meeting")
        un_authenticated_client = APIClient()
        response = un_authenticated_client.post(
            path, data=meeting_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
