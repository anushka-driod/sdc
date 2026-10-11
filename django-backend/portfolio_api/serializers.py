from rest_framework import serializers
from .models import Profile, Skill, Project, Education, Achievement, ContactMessage


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    tech_list = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ['id', 'title', 'short_description', 'technologies', 'tech_list', 'github_url', 'demo_url', 'featured', 'order']

    def get_tech_list(self, obj):
        if not obj.technologies:
            return []
        return [t.strip() for t in obj.technologies.split(',') if t.strip()]


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = '__all__'


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_name(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters.")
        return value.strip()

    def validate_message(self, value):
        if len(value.strip()) < 5:
            raise serializers.ValidationError("Message must be at least 5 characters.")
        return value.strip()
