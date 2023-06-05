from django.test import TestCase
from rooms.models import Room


class TestModels(TestCase):
    def setUp(self):
        self.room = Room.objects.create(
            name="Example room",
            floor=1,
            room_number=1,
            user_id=1
        )

    def create_room(self):
        return

    def test_room_creation(self):
        self.assertTrue(isinstance(self.room, Room))
        self.assertEqual(self.room.name, "Example room")
        self.assertIsNotNone(self.room.id)
