from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
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
