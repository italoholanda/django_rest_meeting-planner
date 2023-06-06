from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from meetings.models import Meeting
from rooms.models import Room
from .test_view import TestView
import json

class TestGetMeeting(TestView):
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

    def test_get_meeting_should_return_200_if_authenticated(self):
        path = reverse("get_meeting", args={self.meeting.id})
        response = self.client.get(path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_meeting_should_return_401_if_un_authenticated(self):
        path = reverse("get_meeting", args={self.meeting.id})
        un_authenticated_client = APIClient()
        response = un_authenticated_client.get(path)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_get_meeting_should_return_correct_meeting(self):
        path = reverse("get_meeting", args={self.meeting.id})
        response = self.client.get(path)
        response_data = json.loads(response.content)
        response_meeting_title = response_data[0]['title']
        self.assertEqual(response_meeting_title, self.meeting.title)
        
