from .serializers import RoomSerializer
from .models import Room
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET'])
def get_rooms(request):
    user_id=request.user.id
    objects = Room.objects.filter(user_id=user_id)
    serializer = RoomSerializer(objects, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_room(request, id):
    user_id = request.user.id
    objects = Room.objects.filter(pk=id, user_id=user_id)
    serializer = RoomSerializer(objects, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_room(request):
    user_id=request.user.id
    data = {**request.data, 'user_id': user_id}
    serializer = RoomSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_room(request):
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


@api_view(['DELETE'])
def delete_room(request):
    room_id = request.query_params.get('id')
    room = Room.objects.filter(pk=int(room_id)).first()
    if room != None:
        room.delete()
        return Response(status=status.HTTP_200_OK)
    return Response("Meeting not found", status=status.HTTP_400_BAD_REQUEST)
