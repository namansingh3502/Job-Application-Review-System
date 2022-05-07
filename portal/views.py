from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.paginator import Paginator
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from .serializers import *
from .forms import *


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

    return Response({'msg': '%d application' % requests.data['status']}, status=status.HTTP_200_OK)


@api_view(['POST'])
def add_candidate(requests):
    data = requests.data['data']

    personal_detail_form = CandidateForm(data['personal'])

    if not personal_detail_form.is_valid():
        return Response({'msg': 'Error in personal details'}, status=HTTP_400_BAD_REQUEST)

    for skill in data['skill']:
        skill_details = {'skill': skill['name'], 'skill_level': skill['skill_level']['value']}
        form = SkillForm(skill_details)

        if not form.is_valid():
            return Response({'msg': 'Error in skill details'}, status=HTTP_400_BAD_REQUEST)

    for item in data['education']:
        education = {
            'institute_name': item['institute_name'],
            'certificate_degree_name': item['certificate_degree_name'],
            'major': item['major'],
            'percentage': item['percentage'],
            'starting_date': item['starting_date'][:10],
            'completion_date': item['completion_date'][:10],
        }
        form = EducationDetailForm(education)

        if not form.is_valid():
            return Response({'msg': 'Error in education details'}, status=HTTP_400_BAD_REQUEST)

    return Response({'msg': 'accepted application'}, status=status.HTTP_200_OK)
