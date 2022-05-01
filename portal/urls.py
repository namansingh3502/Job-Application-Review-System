from django.urls import path

from . import views

urlpatterns = [
    path('applications', views.all_applications, name="All-Applications"),
    path('<int:candidate_id>/application', views.candidate_application, name="Candidate-Application"),
]
