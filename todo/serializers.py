from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from .models import Todo


# =========================
# TODO SERIALIZER
# =========================

class TodoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Todo
        fields = ["id", "name"]

    def validate_name(self, value):

        value = value.strip()

        if not value:
            raise serializers.ValidationError("empty_name")

        if value.isdigit():
            raise serializers.ValidationError("only_numbers")

        if len(value) < 2:
            raise serializers.ValidationError("too_short")

        if len(value) > 100:
            raise serializers.ValidationError("too_long")

        user = self.context["request"].user

        todos = Todo.objects.filter(
            user=user,
            name__iexact=value
        )

        if self.instance:
            todos = todos.exclude(
                id=self.instance.id
            )

        if todos.exists():
            raise serializers.ValidationError("duplicate_name")

        return value


# =========================
# REGISTER SERIALIZER
# =========================

class RegisterSerializer(serializers.Serializer):

    username = serializers.CharField()
    email = serializers.EmailField(required=False)
    password = serializers.CharField(write_only=True)

    def validate_username(self, value):

        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError(
                "Username already exists"
            )

        return value

    def create(self, validated_data):

        return User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email"),
            password=validated_data["password"]
        )


# =========================
# LOGIN SERIALIZER
# =========================

class LoginSerializer(serializers.Serializer):

    username = serializers.CharField()
    password = serializers.CharField(
        write_only=True
    )

    def validate(self, data):

        user = authenticate(
            username=data["username"],
            password=data["password"]
        )

        if user is None:
            raise serializers.ValidationError(
                "Invalid username or password"
            )

        data["user"] = user

        return data