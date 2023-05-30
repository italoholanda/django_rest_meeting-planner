from django.db import models
from datetime import time

from rooms.models import Room


class Meeting(models.Model):
    title = models.CharField(max_length=200)
    date = models.DateField()
    start_time = models.TimeField(default=time(9))
    duration = models.IntegerField(default=1)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)

    @property
    def _datestr(self):
        return f"{self.date.isoformat()}"

    def __str__(self):
        return f"{self._datestr} - {self.title}"
