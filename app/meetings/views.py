from .models import Meeting, Room
from .serializers import MeetingSerializer, RoomSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET', 'POST'])
def meetings(request):
    if request.method == "GET":
        objects = Meeting.objects.all()
        serializer = MeetingSerializer(objects, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = MeetingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def rooms(request):
    if request.method == "GET":
        objects = Room.objects.all()
        serializer = RoomSerializer(objects, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
