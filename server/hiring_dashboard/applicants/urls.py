from django.urls import path, include
from rest_framework.routers import DefaultRouter
from applicants.views import ApplicantViewSet,admin_login

router = DefaultRouter()
router.register(r'applicants', ApplicantViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin-login/', admin_login, name='admin_login'),
]
