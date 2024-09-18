from django.urls import path
from .views import applicants_list_create, applicant_detail, admin_login, welcome

urlpatterns = [
    path('', welcome, name='welcome'),
    path('applicants/', applicants_list_create, name='applicants_list_create'),
    path('applicants/<int:pk>/', applicant_detail, name='applicant_detail'),
    path('admin-login/', admin_login, name='admin_login')
]
