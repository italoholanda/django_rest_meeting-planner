from .models import Meeting, Room
from rest_framework import serializers, permissions
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope


class MeetingSerializer(serializers.ModelSerializer):
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    class Meta:
        model = Meeting
        fields = ('id', 'title', 'duration', 'date', 'start_time', 'room')


class RoomSerializer(serializers.ModelSerializer):
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    class Meta:
        model = Room
        fields = ('name', 'floor', 'room_number')
