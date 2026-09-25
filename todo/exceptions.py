
from functools import wraps
from django.http import JsonResponse


class TodoNotFoundException(Exception):
    pass


class TodoIdRequiredException(Exception):
    pass


class NotLoggedInException(Exception):
    pass


def exception_handler(view_function):

    @wraps(view_function)
    def wrapper(self, request, *args, **kwargs):
        try:
            return view_function(
                self,
                request,
                *args,
                **kwargs
            )

        except NotLoggedInException:
            return JsonResponse(
                {"error": "You are not logged in"},
                status=401
            )

        except TodoNotFoundException:
            return JsonResponse(
                {"error": "Todo not found"},
                status=404
            )

        except TodoIdRequiredException:
            return JsonResponse(
                {"error": "Todo ID is required"},
                status=400
            )

        except Exception:
            return JsonResponse(
                {"error": "Something went wrong"},
                status=500
            )

    return wrapper
