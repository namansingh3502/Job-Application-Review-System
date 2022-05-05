from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.paginator import Paginator

from .serializers import *


@api_view(['GET'])
def all_applications(requests, page, application_status):

    if application_status != 'All':
        applications = Candidate.objects.filter(status=application_status).all()
    else:
        applications = Candidate.objects.all()

    paginator = Paginator(applications.order_by("pk"), 20)
    page_obj = paginator.get_page(0)
    serializer = BasicCandidateDetailSerializer(page_obj, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def candidate_application(requests, candidate_id):
    application = Candidate.objects.get(id=candidate_id)
    serializer = ApplicationSerializer(application)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def update_status(requests, candidate_id):
    try:
        applicant = Candidate.objects.get(id=candidate_id)
        applicant.status = requests.data['status']
        applicant.save()
    except Candidate.DoesNotExist:
        return Response({'msg': 'candidate does not exist'}, status=status.HTTP_404_NOT_FOUND)

    return Response({'msg': 'accepted application'}, status=status.HTTP_200_OK)


@api_view(['GET'])
def reject_application(requests, candidate_id):
    try:
        applicant = Candidate.objects.get(id=candidate_id)
        applicant.status = "Rejected"
        applicant.save()
    except Candidate.DoesNotExist:
        return Response({'msg': 'candidate does not exist'}, status=status.HTTP_404_NOT_FOUND)

    return Response({'msg': 'accepted application'}, status=status.HTTP_200_OK)
