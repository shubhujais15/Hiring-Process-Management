from rest_framework import viewsets
from .models import Applicant
from .serializers import ApplicantSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view,action
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status

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

@api_view(['POST'])
def admin_login(request):
    # Get the admin credentials from the request
    username = request.data.get('username')
    password = request.data.get('password')

    # Check if the credentials match the default admin
    if username == 'admin@gmail.com' and password == 'admin123':
        return Response({'message': 'Login successful', 'status': 'success'}, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'Invalid credentials', 'status': 'failure'}, status=status.HTTP_401_UNAUTHORIZED)

@action(detail=True, methods=['patch'])
def update_applicant(self, request, pk=None):
    applicant = self.get_object()
    status = request.data.get('status')
    interview_date = request.data.get('interview_date')
    offer_letter_date = request.data.get('offer_letter_date')
    joining_date = request.data.get('joining_date')

    if status:
        applicant.status = status
    if interview_date:
        applicant.interview_date = interview_date
    if offer_letter_date:
        applicant.offer_letter_date = offer_letter_date
    if joining_date:
        applicant.joining_date = joining_date

    applicant.save()
    return Response({'status': 'Applicant updated successfully'}, status=status.HTTP_200_OK)
