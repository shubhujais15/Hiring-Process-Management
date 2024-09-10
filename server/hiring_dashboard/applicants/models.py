from django.db import models
from django.utils import timezone

class Applicant(models.Model):
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    status = models.CharField(max_length=50, choices=[
        ('in_review', 'In Review'),
        ('interview_scheduled', 'Interview Scheduled'),
        ('offer_stage', 'Offer Stage'),
        ('hired', 'Hired')
    ])
    application_date = models.DateField()
    interview_date = models.DateField(null=True, blank=True)
    offer_letter_date = models.DateField(null=True, blank=True)
    joining_date = models.DateField(null=True, blank=True)
    source = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} - {self.position}"
