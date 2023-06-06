from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from meetings.models import Meeting
from rooms.models import Room
from .test_view import TestView
import time


class TestUpdateMeeting(TestView):
    @property
    def room(self):
        return Room.objects.create(
            name="Test room",
            floor=12,
            room_number=1
        )

    @property
    def meeting(self):
        return Meeting.objects.create(
            title="Retrospective",
            duration=1,
            date="2023-06-04",
            start_time="09:00:00",
            room=self.room
        )

    def test_update_meeting_should_return_200_if_authenticated(self):
        meeting_data = {
            "title": "Should return 200",
            "duration": 1,
            "date": "2023-06-04",
            "start_time": "09:00:00",
            "room": self.room.id
        }
        path = reverse("update_meeting")
        full_path = f"{path}?id={self.meeting.id}"
        response = self.client.put(full_path, data=meeting_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_meeting_should_return_401_if_un_authenticated(self):
        meeting_data = {
            "title": "Should return 401",
            "duration": 1,
            "date": "2023-06-04",
            "start_time": "09:00:00",
            "room": self.room.id
        }
        path = reverse("update_meeting")
        un_authenticated_client = APIClient()
        full_path = f"{path}?id={self.meeting.id}"
        response = un_authenticated_client.put(
            full_path, data=meeting_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_meeting_should_update_meeting_correctly(self):
        meeting_data = {
            "title": "Updated Correctly",
            "duration": 1,
            "date": "2023-06-04",
            "start_time": "09:00:00",
            "room": self.room.id
        }
        path = reverse("update_meeting")
        full_path = f"{path}?id={self.meeting.id}"
        self.client.put(full_path, data=meeting_data, format="json")
        saved_meeting = Meeting.objects.filter(
            title=meeting_data["title"]).first()
        self.assertIsNotNone(saved_meeting)
