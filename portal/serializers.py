from rest_framework import serializers
from .models import *


class SkillDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Skills
        fields = [
            'skill',
            'skill_level'
        ]


class EducationDetailSerizer(serializers.ModelSerializer):

    class Meta:
        model = EducationDetail
        fields = [
            'certificate_degree_name',
            'major',
            'institute_name',
            'starting_date',
            'completion_date',
            'percentage',
        ]


class CandidateDetailSerializer(serializers.ModelSerializer):

    fullName = serializers.SerializerMethodField('get_full_name')
    resume = serializers.SerializerMethodField('get_resume')

    class Meta:
        model = Candidate
        fields = [
            'id',
            'fullName',
            'gender',
            'phone',
            'email',
            'status',
            'resume'
        ]

    def get_full_name(self, candidate):
        return "%s %s" % (candidate.firstName, candidate.lastName)

    def get_resume(self, candidate):

        try:
            return candidate.candidate_resume.url
        except Candidate.RelatedObjectDoesNotExist:
            print("err")

        return "%s %s" % (candidate.firstName, candidate.lastName)


class ApplicationSerializer(serializers.Serializer):

    candidate_details = serializers.SerializerMethodField('get_candidate_details')
    education_details = serializers.SerializerMethodField('get_education_details')
    skill_details = serializers.SerializerMethodField('get_skill_details')

    class Meta:
        fields = [
            'candidate_detail',
            'education_details',
            'skill_details'
        ]

    def get_candidate_details(self, candidate):
        serializer = CandidateDetailSerializer(candidate)
        return serializer.data

    def get_education_details(self, candidate):
        serializer = EducationDetailSerizer(candidate.candidate_education, many=True)
        return serializer.data

    def get_skill_details(self, candidate):
        serializer = SkillDetailSerializer(candidate.candidate_skill, many=True)
        return serializer.data


class BasicCandidateDetailSerializer(serializers.ModelSerializer):

    fullName = serializers.SerializerMethodField('get_full_name')

    class Meta:
        model = Candidate
        fields = [
            'id',
            'fullName',
            'gender',
            'phone',
            'email',
            'status'
        ]

    def get_full_name(self, candidate):
        return "%s %s" % (candidate.firstName, candidate.lastName)