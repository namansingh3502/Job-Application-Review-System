from django.urls import path

from . import views

urlpatterns = [
    path('<int:candidate_id>/application', views.candidate_application, name="Candidate-Application"),
    path('application/update_status', views.update_status, name="Application-Status"),
    path('applications/<int:page>/<str:application_status>', views.all_applications, name="All-Applications"),
    path('add_candidate', views.add_candidate, name="Add-Candidate")
]
