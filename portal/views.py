from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *


@api_view(['GET'])
def all_applications(requests):
    return Response({'msg': "all applications"}, status=status.HTTP_200_OK)


@api_view(['GET'])
def candidate_application(requests, candidate_id):
    return Response({'msg': "candidate_application"}, status=status.HTTP_200_OK)
