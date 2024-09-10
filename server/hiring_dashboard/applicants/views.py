from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Applicant
from .serializers import ApplicantSerializer

# List and Create Applicants
@api_view(['GET', 'POST'])
def applicants_list_create(request):
    if request.method == 'GET':
        applicants = Applicant.objects.all()
        serializer = ApplicantSerializer(applicants, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ApplicantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Retrieve, Update, and Delete a Specific Applicant
@api_view(['GET', 'PATCH', 'DELETE'])
def applicant_detail(request, pk):
    try:
        applicant = Applicant.objects.get(pk=pk)
    except Applicant.DoesNotExist:
        return Response({'error': 'Applicant not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ApplicantSerializer(applicant)
        return Response(serializer.data)
    
    elif request.method == 'PATCH':
        serializer = ApplicantSerializer(applicant, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'Applicant updated successfully', 'data': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        applicant.delete()
        return Response({'status': 'Applicant deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

# Admin Login
@api_view(['POST'])
def admin_login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if username == 'admin@gmail.com' and password == 'admin123':
        return Response({'message': 'Login successful', 'status': 'success'}, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'Invalid credentials', 'status': 'failure'}, status=status.HTTP_401_UNAUTHORIZED)
