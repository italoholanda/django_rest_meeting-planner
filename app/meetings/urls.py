from django.urls import path, include
from .views import meetings, rooms


urlpatterns = [
    path('', meetings),
    path('rooms/', rooms),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
