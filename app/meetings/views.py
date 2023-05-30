from .models import Meeting, Room
from .serializers import MeetingSerializer, RoomSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET'])
def get_meetings(request):
    objects = Meeting.objects.all()
    serializer = MeetingSerializer(objects, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_meeting(request):
    serializer = MeetingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_meeting(request):
    meeting_id = int(request.query_params.get('id'))
    try:
        meeting = Meeting.objects.get(pk=meeting_id)
        serializer = MeetingSerializer(meeting, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Meeting.DoesNotExist:
        return Response("Meeting not found", status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_meeting(request):
    meeting_id = request.query_params.get('id')
    meeting = Meeting.objects.filter(pk=int(meeting_id)).first()
    if meeting != None:
        meeting.delete()
        return Response(status=status.HTTP_200_OK)
    return Response("Meeting not found", status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
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

    elif request.method == 'PUT':
        room_id = int(request.query_params.get('id'))

        try:
            room = Room.objects.get(pk=room_id)
            serializer = RoomSerializer(room, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Room.DoesNotExist:
            return Response("Room not found", status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        room_id = request.query_params.get('id')
        room = Room.objects.filter(pk=int(room_id)).first()
        if room != None:
            room.delete()
            return Response(status=status.HTTP_200_OK)
        return Response("Meeting not found", status=status.HTTP_400_BAD_REQUEST)
