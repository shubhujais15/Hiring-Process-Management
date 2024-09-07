from rest_framework import viewsets
from .models import Applicant
from .serializers import ApplicantSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view,action
from rest_framework import serializers

class ApplicantViewSet(viewsets.ModelViewSet):
    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializer


class ApplicantSerializer(serializers.ModelSerializer):
    time_to_interview = serializers.ReadOnlyField()
    time_to_offer = serializers.ReadOnlyField()
    time_to_joining = serializers.ReadOnlyField()

    class Meta:
        model = Applicant
        fields = [
            'id', 'name', 'position', 'status', 'application_date', 
            'interview_date', 'offer_letter_date', 'joining_date', 
            'source', 'time_to_interview', 'time_to_offer', 'time_to_joining'
        ]


@action(detail=True, methods=['put'])
def reschedule(self, request, pk=None):
        applicant = self.get_object()
        interview_date = request.data.get('interview_date')

        if interview_date:
            applicant.interview_date = interview_date
            applicant.save()
            return Response({'status': 'Interview date updated'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid interview date'}, status=status.HTTP_400_BAD_REQUEST)

    # Cancel interview - setting status to 'Cancelled'
@action(detail=True, methods=['patch'])
def cancel(self, request, pk=None):
    applicant = self.get_object()
    applicant.status = 'Cancelled'
    applicant.save()
    return Response({'status': 'Interview canceled'}, status=status.HTTP_200_OK)

