
from functools import wraps

import json
import jwt
from ..models import BlacklistedToken
from django.conf import settings
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from ..serializers import RegisterSerializer, LoginSerializer


# =========================
# LOGIN REQUIRED
# =========================

def login_required(permission=None):

    def decorator(view_function):

        @wraps(view_function)
        def wrapper(self, request, *args, **kwargs):

            # =========================
            # CHECK AUTHORIZATION HEADER
            # =========================

            auth_header = request.headers.get("Authorization")
            print(auth_header)
            if not auth_header:
                return JsonResponse(
                    {
                        "error": "You are not logged in"
                    },
                    status=401
                )

            # =========================
            # CHECK BEARER TOKEN FORMAT
            # =========================

            parts = auth_header.split(" ")

            if len(parts) != 2 or parts[0] != "Bearer":
                return JsonResponse(
                    {
                        "error": "Invalid authorization header"
                    },
                    status=401
                )

            token = parts[1]
            if BlacklistedToken.objects.filter(token=token).exists():
                return JsonResponse(
        {"error": "You are not logged in"},
        status=401
    )

            # =========================
            # DECODE JWT
            # =========================

            try:
                payload = jwt.decode(
                    token,
                    settings.SECRET_KEY,
                    algorithms=["HS256"]
                )

            except jwt.ExpiredSignatureError:
                return JsonResponse(
                    {
                        "error": "Token has expired"
                    },
                    status=401
                )

            except jwt.InvalidTokenError:
                return JsonResponse(
                    {
                        "error": "Invalid token"
                    },
                    status=401
                )

            # =========================
            # GET USER
            # =========================

            try:
                user = User.objects.get(
                    id=payload["user_id"]
                )

            except User.DoesNotExist:
                return JsonResponse(
                    {
                        "error": "User not found"
                    },
                    status=401
                )

            # =========================
            # ATTACH USER TO REQUEST
            # =========================

            request.user = user

            # =========================
            # CHECK PERMISSION
            # =========================

            if permission and not user.has_perm(permission):
                return JsonResponse(
                    {
                        "error": "Permission denied"
                    },
                    status=403
                )

            # =========================
            # CALL VIEW
            # =========================

            return view_function(
                self,
                request,
                *args,
                **kwargs
            )

        return wrapper

    return decorator


# =========================
# LOGIN
# =========================

@method_decorator(csrf_exempt, name="dispatch")
class LoginView(View):

    def post(self, request):

        data = json.loads(request.body)

        serializer = LoginSerializer(data=data)

        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]

        token = jwt.encode(
            {"user_id": user.id},
            settings.SECRET_KEY,
            algorithm="HS256"
        )

        return JsonResponse({
            "token": token
        })


# =========================
# REGISTER
# =========================

@method_decorator(csrf_exempt, name="dispatch")
class RegisterView(View):

    def post(self, request):

        data = json.loads(request.body)

        serializer = RegisterSerializer(data=data)

        serializer.is_valid(raise_exception=True)

        user = serializer.save()

        return JsonResponse({
            "message": "User created successfully",
            "username": user.username
        }, status=201)


# =========================
# LOGOUT
# =========================

@method_decorator(csrf_exempt, name="dispatch")
class LogoutView(View):

    def post(self, request):

        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return JsonResponse(
                {"error": "You are not logged in"},
                status=401
            )

        parts = auth_header.split(" ")

        if len(parts) != 2 or parts[0] != "Bearer":
            return JsonResponse(
                {"error": "Invalid authorization header"},
                status=401
            )

        token = parts[1]

        BlacklistedToken.objects.get_or_create(
            token=token
        )

        return JsonResponse({
            "message": "Logout successful"
        })
