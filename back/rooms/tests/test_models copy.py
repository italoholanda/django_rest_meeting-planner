from datetime import datetime
from django.test import TestCase
from meetings.models import Meeting
from rooms.models import Room


class TestModels(TestCase):
    def setUp(self):
        self.meeting = Meeting.objects.create(
            title="Example meeting",
            date=datetime.now(),
            start_time=datetime.now().strftime("%H:%M:%S"),
            duration=1,
            user_id=1,
            room=self.create_room()
        )

    def create_room(self):
        return Room.objects.create(
            name="Name",
            floor=1,
            room_number=1,
            user_id=1
        )

    def test_meeting_creation(self):
        self.assertTrue(isinstance(self.meeting, Meeting))
        self.assertEqual(self.meeting.title, "Example meeting")
        self.assertIsNotNone(self.meeting.id)
