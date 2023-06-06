from .models import Room
from rest_framework import serializers, permissions


class RoomSerializer(serializers.ModelSerializer):
    permission_classes = [permissions.IsAuthenticated]

    class Meta:
        model = Room
        fields = ('id', 'name', 'floor', 'room_number', 'user_id')
