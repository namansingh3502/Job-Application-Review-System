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
        max_length=10,
        unique=True
    )

    mail = models.EmailField(
        _("Mail id"),
        unique=True
    )

    status = models.CharField(
        _("Status"),
        choices=STATUS,
        max_length=8
    )

    class Meta:
        db_table = "candidate_details"
        verbose_name = _("candidate_detail")
        verbose_name_plural = _("candidate_details")
        unique_together = ('mail', 'phone')

    def __str__(self):
        return "%s %s" % (self.firstName, self.lastName)


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

    class Meta:
        db_table = "education_details"
        verbose_name = _("education_detail")
        verbose_name_plural = _("education_details")
        unique_together = ('candidate', 'certificate_degree_name')

    def __str__(self):
        return "%s %s" % (self.candidate, self.certificate_degree_name)


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
        max_length=12,
        choices=SKILL_LEVEL
    )

    class Meta:
        db_table = "skills_details"
        verbose_name = _("skill_detail")
        verbose_name_plural = _("skill_details")
        unique_together = ('candidate', 'skill')

    def __str__(self):
        return "%s %s" % (self.candidate, self.skill)

