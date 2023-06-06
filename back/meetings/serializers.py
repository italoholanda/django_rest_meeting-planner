from .models import Meeting
from rest_framework import serializers, permissions


class MeetingSerializer(serializers.ModelSerializer):
    permission_classes = [permissions.IsAuthenticated]

    class Meta:
        model = Meeting
        fields = ('id', 'title', 'duration', 'date',
                  'start_time', 'room', 'user_id')
