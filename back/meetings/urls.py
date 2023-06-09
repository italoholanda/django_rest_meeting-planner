from django.urls import path
from .views import get_meetings, get_meeting, create_meeting, update_meeting, delete_meeting


urlpatterns = [
    path('', get_meetings, name="get_meetings"),
    path('<int:id>/', get_meeting, name="get_meeting"),
    path('create/', create_meeting, name="create_meeting"),
    path('update/', update_meeting, name="update_meeting"),
    path('delete/', delete_meeting, name="delete_meeting"),
]
