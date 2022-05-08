from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.paginator import Paginator

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
def update_status(requests):
    data = requests.data

    try:
        applicant = Candidate.objects.get(id=data['user'])
        applicant.status = data['status']
        applicant.save()
    except Candidate.DoesNotExist:
        return Response({'msg': 'Candidate does not exist.'}, status=status.HTTP_404_NOT_FOUND)

    return Response({'msg': 'Application %s.' % data['status']}, status=status.HTTP_200_OK)


@api_view(['POST'])
def add_candidate(requests):
    data = requests.data['data']

    # setting select field values in correct form
    data['personal']['gender'] = data['personal']['gender']['value']

    for skill in data['skill']:
        skill['skill_level'] = skill['skill_level']['value']

    for education in data['education']:
        education['starting_date'] = education['starting_date'][:10]
        education['completion_date'] = education['completion_date'][:10]

    # form verification
    try:
        candidate = Candidate.objects.get(phone=data['personal']['phone'])
        candidate = Candidate.objects.get(email=data['personal']['email'])
        return Response({'msg': "Phone or Email already registered."}, status=400)
    except Candidate.DoesNotExist:
        print('')

    personal_detail_form = CandidateForm(data['personal'])

    if not personal_detail_form.is_valid():
        return Response({'msg': 'Error in personal details'}, status=HTTP_400_BAD_REQUEST)

    for skill in data['skill']:
        form = SkillForm(skill)

        if not form.is_valid():
            return Response({'msg': 'Error in skill details'}, status=HTTP_400_BAD_REQUEST)

    for education in data['education']:

        form = EducationDetailForm(education)

        if not form.is_valid():
            return Response({'msg': 'Error in education details'}, status=HTTP_400_BAD_REQUEST)

    # save data
    candidate = personal_detail_form.save()

    for skill in data['skill']:
        skill_detail = SkillForm(skill).save(commit=False)
        skill_detail.candidate_id = candidate.id
        skill_detail.save()

    for education in data['education']:
        education_detail = EducationDetailForm(education).save(commit=False)
        education_detail.candidate_id = candidate.id
        education_detail.save()

    return Response({'msg': 'Candidate added.'}, status=status.HTTP_200_OK)
