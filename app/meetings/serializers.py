from .models import Meeting, Room
from rest_framework import serializers


class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = ('id', 'title', 'duration', 'date', 'start_time', 'room')


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('name', 'floor', 'room_number')
