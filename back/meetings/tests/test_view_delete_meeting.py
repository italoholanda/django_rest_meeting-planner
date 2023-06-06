from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from meetings.models import Meeting
from rooms.models import Room
from .test_view import TestView


class TestDeleteMeeting(TestView):
    @property
    def room(self):
        return Room.objects.create(
            name="Test room delete",
            floor=12,
            room_number=1
        )

    def create_meeting(self):
        return Meeting.objects.create(
            title="Planning",
            duration=1,
            date="2023-06-04",
            start_time="09:00:00",
            room=self.room
        )

    def test_delete_meeting_should_return_401_if_un_authenticated(self):
        meeting = self.create_meeting()
        path = reverse("delete_meeting")
        un_authenticated_client = APIClient()
        response = un_authenticated_client.delete(f"{path}?id={meeting.id}")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_meeting_should_return_200_if_authenticated(self):
        meeting = self.create_meeting()
        path = reverse("delete_meeting")
        response = self.client.delete(f"{path}?id={meeting.id}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_meeting_should_delete_correct_meeting(self):
        meeting = self.create_meeting()
        path = reverse("delete_meeting")
        self.client.delete(f"{path}?id={meeting.id}")

        def find_meeting():
            Meeting.objects.get(pk=meeting.id)

        self.assertRaises(Meeting.DoesNotExist, find_meeting)
