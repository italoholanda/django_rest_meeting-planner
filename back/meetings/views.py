from .models import Meeting
from .serializers import MeetingSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET'])
def get_meetings(request):
    user_id = request.user.id
    objects = Meeting.objects.filter(user_id=user_id)
    serializer = MeetingSerializer(objects, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_meeting(request):
    user_id = request.user.id
    data = {**request.data, 'user_id': user_id}
    serializer = MeetingSerializer(data=data)
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
