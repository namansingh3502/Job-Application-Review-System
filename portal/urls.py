from django.urls import path

from . import views

urlpatterns = [
    path('<int:candidate_id>/application', views.candidate_application, name="Candidate-Application"),
    path('<int:candidate_id>/application/update_status', views.update_status, name="Application-Accepted"),
    path('applications/<int:page>/<str:application_status>', views.all_applications, name="All-Applications"),
]
