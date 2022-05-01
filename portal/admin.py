from django.contrib import admin
from .models import *


@admin.register(Candidate)
class Candidate(admin.ModelAdmin):
    list_display = ('firstName', 'lastName', 'status')

    list_filter = ('status',)

    fieldsets = (
        ('Application Status ', {
            'fields': ('status',)
        }),
        ('Candidate Details', {
            'fields': (
                'firstName',
                'lastName',
                'gender',
                'phone',
                'mail',
            )
        })
    )


@admin.register(EducationDetail)
class CandidateEducationDetails(admin.ModelAdmin):

    list_display = ('candidate',)

    fieldsets = (('Education Details', {
        'fields': (
            'candidate',
            'certificate_degree_name',
            'institute_name',
            'major',
            'starting_date',
            'completion_date',
            'percentage'
        )
    }),)


@admin.register(Skills)
class CandidateSkill(admin.ModelAdmin):

    list_display = ('candidate',)

    fieldsets = (('Skills', {
        'fields': (
            'candidate',
            'skill',
            'skill_level'
        )
    }),)
