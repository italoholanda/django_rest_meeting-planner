from django.urls import path
from .views import get_meetings, create_meeting, update_meeting, delete_meeting


urlpatterns = [
    path('', get_meetings),
    path('create/', create_meeting),
    path('update/', update_meeting),
    path('delete/', delete_meeting),
]
