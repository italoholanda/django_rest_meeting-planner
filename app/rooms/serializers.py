from .models import Room
from rest_framework import serializers, permissions
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope


class RoomSerializer(serializers.ModelSerializer):
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]

    class Meta:
        model = Room
        fields = ('id', 'name', 'floor', 'room_number')
