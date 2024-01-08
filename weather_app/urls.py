from django.urls import path
from .views import home, get_locations, add_location

urlpatterns = [
    path('', home, name='home'),
    path('get_locations/', get_locations, name='get_locations'),
    path('add_location/', add_location, name='add_location'),
]
