from django.contrib import admin
from django.urls import path, include
from .views import RegisterView, LoginView

urlpatterns = [
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    
    path('admin/', admin.site.urls),
    path('', include('deals.urls')), 
]
