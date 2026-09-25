
from django.http import JsonResponse
from django.views import View

from .auth import login_required

# =========================
# PROFILE
# =========================

class ProfileView(View):

    @login_required()
    def get(self, request):

        return JsonResponse({
            "message": "You are logged in",
            "user_id": request.user.id,
            "username": request.user.username,
            "email": request.user.email
        })

