from django.db import models
from django.utils.translation import gettext_lazy as _


class Candidate(models.Model):
    STATUS = (
        ('applied', 'applied'),
        ('accepted', 'accepted'),
        ('rejected', 'rejected')
    )

    GENDER = (
        ('Male', 'Male'),
        ('Female', 'Female')
    )

    firstName = models.CharField(
        _("First Name"),
        max_length=150,
    )

    lastName = models.CharField(
        _("Last Name"),
        max_length=150,
    )

    gender = models.CharField(
        _("Gender"),
        max_length=6,
        choices=GENDER
    )

    phone = models.CharField(
        _("Phone No."),
        max_length=10
    )

    mail = models.EmailField(
        _("Mail id")
    )

    status = models.CharField(
        _("Status"),
        choices=STATUS
    )


class EducationDetail(models.Model):
    candidate = models.ForeignKey(
        Candidate,
        on_delete=models.CASCADE,
        related_name="candidate_education"
    )

    certificate_degree_name = models.CharField(
        _("certificate_degree_name"),
        max_length=50
    )

    major = models.CharField(
        _("major"),
        max_length=50
    )

    institute_name = models.CharField(
        _("institute_name"),
        max_length=50
    )

    starting_date = models.DateField(
        _("starting_date"),
        blank=False
    )
    completion_date = models.DateField(
        _("completion_date")
    )
    percentage = models.SmallIntegerField(
        _("percentage")
    )


class Skills(models.Model):
    SKILL_LEVEL = (
        ('Beginner', 'Beginner'),
        ('Intermediate', 'intermediate'),
        ('Expert', 'Expert')
    )

    candidate = models.ForeignKey(
        Candidate,
        on_delete=models.CASCADE,
        related_name="candidate_skill"
    )
    skill = models.CharField(
        _('skill'),
        max_length=50,
    )
    skill_level = models.CharField(
        _("skill_level"),
        max_length=10,
        choices=SKILL_LEVEL
    )
