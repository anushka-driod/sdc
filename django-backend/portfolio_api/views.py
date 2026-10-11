from datetime import datetime
from django.db import connection
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Profile, Skill, Project, Education, Achievement, ContactMessage
from .serializers import (
    ProfileSerializer,
    SkillSerializer,
    ProjectSerializer,
    EducationSerializer,
    AchievementSerializer,
    ContactMessageSerializer
)
from .data import PROFILE_DATA, SKILLS_DATA, PROJECTS_DATA, EDUCATION_DATA, ACHIEVEMENTS_DATA


def ensure_seed_data():
    """Ensure database has baseline data loaded from data.py"""
    if not Profile.objects.exists():
        Profile.objects.create(**PROFILE_DATA)

    if not Skill.objects.exists():
        for s in SKILLS_DATA:
            Skill.objects.create(**s)

    if not Project.objects.exists():
        for p in PROJECTS_DATA:
            Project.objects.create(**p)

    if not Education.objects.exists():
        for e in EDUCATION_DATA:
            Education.objects.create(**e)

    if not Achievement.objects.exists():
        for a in ACHIEVEMENTS_DATA:
            Achievement.objects.create(**a)


class HealthView(APIView):
    """
    GET /api/health/
    Health-check endpoint verifying Django and SQLite database connectivity.
    """
    def get(self, request):
        db_status = "connected"
        try:
            connection.ensure_connection()
        except Exception as e:
            db_status = f"error: {str(e)}"

        return Response({
            "status": "ok",
            "service": "django-portfolio-api",
            "framework": "Django 5.2 + Django REST Framework",
            "database": {
                "engine": "django.db.backends.sqlite3",
                "status": db_status
            },
            "timestamp": datetime.utcnow().isoformat() + "Z"
        }, status=status.HTTP_200_OK)


class PortfolioView(APIView):
    """
    GET /api/portfolio/
    Returns full portfolio dataset: profile, skills, projects, education, achievements.
    """
    def get(self, request):
        ensure_seed_data()

        profile = Profile.objects.first()
        skills = Skill.objects.all()
        projects = Project.objects.all()
        education = Education.objects.all()
        achievements = Achievement.objects.all()

        # Group skills by category for convenience in frontend
        skills_serialized = SkillSerializer(skills, many=True).data
        skills_by_category = {}
        for s in skills_serialized:
            cat = s.get("category", "General")
            if cat not in skills_by_category:
                skills_by_category[cat] = []
            skills_by_category[cat].append(s)

        return Response({
            "profile": ProfileSerializer(profile).data if profile else PROFILE_DATA,
            "skills": skills_serialized,
            "skills_by_category": skills_by_category,
            "projects": ProjectSerializer(projects, many=True).data,
            "education": EducationSerializer(education, many=True).data,
            "achievements": AchievementSerializer(achievements, many=True).data,
        }, status=status.HTTP_200_OK)


class ContactView(APIView):
    """
    POST /api/contact/
    Receives validated contact submissions from the Node.js API Gateway,
    persists them into the SQLite database, and returns confirmation.
    """
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            contact_instance = serializer.save()
            return Response({
                "success": True,
                "message": "Thank you! Your message has been saved in the database.",
                "data": {
                    "id": contact_instance.id,
                    "name": contact_instance.name,
                    "email": contact_instance.email,
                    "created_at": contact_instance.created_at.isoformat()
                }
            }, status=status.HTTP_201_CREATED)
        return Response({
            "success": False,
            "error": "Validation failed",
            "details": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
