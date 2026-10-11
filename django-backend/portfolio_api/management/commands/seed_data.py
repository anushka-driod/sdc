from django.core.management.base import BaseCommand
from portfolio_api.models import Profile, Skill, Project, Education, Achievement
from portfolio_api.data import PROFILE_DATA, SKILLS_DATA, PROJECTS_DATA, EDUCATION_DATA, ACHIEVEMENTS_DATA


class Command(BaseCommand):
    help = "Seed database with initial portfolio data for Anushka"

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE("Seeding Anushka's portfolio database..."))

        # Profile
        Profile.objects.all().delete()
        Profile.objects.create(**PROFILE_DATA)
        self.stdout.write(self.style.SUCCESS("[OK] Seeded profile information"))

        # Skills
        Skill.objects.all().delete()
        for s in SKILLS_DATA:
            Skill.objects.create(**s)
        self.stdout.write(self.style.SUCCESS(f"[OK] Seeded {len(SKILLS_DATA)} skills"))

        # Projects
        Project.objects.all().delete()
        for p in PROJECTS_DATA:
            Project.objects.create(**p)
        self.stdout.write(self.style.SUCCESS(f"[OK] Seeded {len(PROJECTS_DATA)} projects"))

        # Education
        Education.objects.all().delete()
        for e in EDUCATION_DATA:
            Education.objects.create(**e)
        self.stdout.write(self.style.SUCCESS(f"[OK] Seeded {len(EDUCATION_DATA)} education records"))

        # Achievements
        Achievement.objects.all().delete()
        for a in ACHIEVEMENTS_DATA:
            Achievement.objects.create(**a)
        self.stdout.write(self.style.SUCCESS(f"[OK] Seeded {len(ACHIEVEMENTS_DATA)} achievements"))

        self.stdout.write(self.style.SUCCESS("All portfolio data successfully seeded into SQLite!"))
