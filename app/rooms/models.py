from django.db import models

class Room(models.Model):
    name = models.CharField(max_length=50)
    floor = models.IntegerField()
    room_number = models.IntegerField()
    user_id = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.name} - room {self.room_number}, floor: {self.floor}"
