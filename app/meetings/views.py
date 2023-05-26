from .models import Meeting, Room
from .serializers import MeetingSerializer, RoomSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET'])
def meetings(request):
    if request.method == "GET":
        objects = Meeting.objects.all()
        serializer = MeetingSerializer(objects, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def rooms(request):
    if request.method == "GET":
        objects = Room.objects.all()
        serializer = RoomSerializer(objects, many=True)
        return Response(serializer.data)
