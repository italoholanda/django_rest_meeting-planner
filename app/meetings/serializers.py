from .models import Meeting, Room
from rest_framework import serializers


class MeetingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Meeting
        fields = ['title', 'duration', 'date', 'start_time']


class RoomSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Room
        fields = ['name', 'floor', 'room_number']
