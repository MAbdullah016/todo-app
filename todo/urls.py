
from django.urls import path

from .views.views import TodoView
from .views.auth import RegisterView, LoginView, LogoutView
from .views.profile import ProfileView




urlpatterns = [

    # Todo
    path("todo/", TodoView.as_view()),
    path("todo/<int:id>/", TodoView.as_view()),

    # Authentication
    path("register/", RegisterView.as_view()),
    path("login/", LoginView.as_view()),
    path("logout/", LogoutView.as_view()),
    
    # Profile
    path("profile/", ProfileView.as_view()),
]

