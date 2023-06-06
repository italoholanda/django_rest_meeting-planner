from django.urls import path
from .views import get_rooms, get_room, create_room, update_room, delete_room


urlpatterns = [
    path('', get_rooms, name="get_rooms"),
    path('<int:id>/', get_room, name="get_room"),
    path('create/', create_room, name="create_room"),
    path('update/', update_room, name="update_room"),
    path('delete/', delete_room, name="delete_room"),
]
