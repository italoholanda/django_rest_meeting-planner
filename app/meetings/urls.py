from django.urls import path, include
from .views import get_meetings, create_meeting, update_meeting, delete_meeting, rooms


urlpatterns = [
    path('', get_meetings),
    path('create/', create_meeting),
    path('update/', update_meeting),
    path('delete/', delete_meeting),
    path('rooms/', rooms),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
