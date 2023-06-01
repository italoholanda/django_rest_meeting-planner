from django.urls import path
from .views import get_rooms, get_room, create_room, update_room, delete_room


urlpatterns = [
    path('', get_rooms),
    path('<int:id>/', get_room),
    path('create/', create_room),
    path('update/', update_room),
    path('delete/', delete_room),
]
