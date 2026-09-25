
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from ..models import Todo
from ..serializers import TodoSerializer

from .auth import login_required
from ..exceptions import (
    exception_handler,
    TodoNotFoundException,
    TodoIdRequiredException,
)


class TodoView(APIView):

    @exception_handler
    @login_required("todo.view_todo")
    def get(self, request, id=None):

        if id is None:
            todos = Todo.objects.filter(user=request.user)
            serializer = TodoSerializer(todos, many=True)

            return Response(serializer.data)

        try:
            todo = Todo.objects.get(
                id=id,
                user=request.user
            )
        except Todo.DoesNotExist:
            raise TodoNotFoundException()

        return Response(TodoSerializer(todo).data)


    @exception_handler
    @login_required("todo.add_todo")
    def post(self, request):

        serializer = TodoSerializer(
            data=request.data,
            context={"request": request}
        )

        serializer.is_valid(raise_exception=True)

        todo = serializer.save(user=request.user)

        return Response(
            TodoSerializer(todo).data,
            status=status.HTTP_201_CREATED
        )


    @exception_handler
    @login_required("todo.change_todo")
    def put(self, request, id=None):

        if id is None:
            raise TodoIdRequiredException()

        try:
            todo = Todo.objects.get(
                id=id,
                user=request.user
            )
        except Todo.DoesNotExist:
            raise TodoNotFoundException()

        serializer = TodoSerializer(
            todo,
            data=request.data,
            context={"request": request}
        )

        serializer.is_valid(raise_exception=True)

        todo = serializer.save()

        return Response(TodoSerializer(todo).data)


    @exception_handler
    @login_required("todo.delete_todo")
    def delete(self, request, id=None):

        if id is None:
            raise TodoIdRequiredException()

        try:
            todo = Todo.objects.get(
                id=id,
                user=request.user
            )
        except Todo.DoesNotExist:
            raise TodoNotFoundException()

        todo.delete()

        return Response({
            "message": "Todo deleted successfully"
        })

