from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import *


@api_view(['GET'])
def all_applications(requests):
    applications = Candidate.objects.all()
    serializer = ApplicationSerializer(applications, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def candidate_application(requests, candidate_id):
    application = Candidate.objects.get(id=candidate_id)
    serializer = ApplicationSerializer(application)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def accept_application(requests, candidate_id):
    try:
        applicant = Candidate.objects.get(id=candidate_id)
        applicant.status = "Accepted"
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
