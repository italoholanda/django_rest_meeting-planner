from django.urls import path
from .views import get_meetings, get_meeting, create_meeting, update_meeting, delete_meeting


urlpatterns = [
    path('', get_meetings),
    path('<int:id>/', get_meeting),
    path('create/', create_meeting),
    path('update/', update_meeting),
    path('delete/', delete_meeting),
]
