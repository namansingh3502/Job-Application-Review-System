from django.forms import ModelForm
from .models import *


class CandidateForm(ModelForm):
    class Meta:
        model = Candidate
        exclude = ['status']


class SkillForm(ModelForm):
    class Meta:
        model = Skills
        exclude = ['candidate']


class EducationDetailForm(ModelForm):
    class Meta:
        model = EducationDetail
        exclude = ['candidate']
