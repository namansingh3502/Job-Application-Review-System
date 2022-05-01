from django.urls import path

from . import views

urlpatterns = [
    path('applications', views.all_applications, name="All-Applications"),
    path('<int:candidate_id>/application', views.candidate_application, name="Candidate-Application"),
    path('<int:candidate_id>/application/accept', views.accept_application, name="Application-Accepted"),
    path('<int:candidate_id>/application/reject', views.reject_application, name="Application-Rejected"),
]
