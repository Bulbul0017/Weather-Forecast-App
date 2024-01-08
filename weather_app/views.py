from django.shortcuts import render, redirect
from .models import Location

def home(request):
    return render(request, 'home.html')

def get_locations(request):
    locations = Location.objects.all()
    return render(request, 'home.html', {'locations': locations})

def add_location(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        Location.objects.create(name=name)
    return redirect('get_locations')
