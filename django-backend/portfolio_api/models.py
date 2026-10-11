from django.db import models


class Profile(models.Model):
    name = models.CharField(max_length=100, default="Anushka")
    greeting = models.CharField(max_length=150, default="Hi, I'm Anushka.")
    role = models.CharField(max_length=200, default="BTech AIML Student | Developer | Builder")
    short_intro = models.TextField(
        default="BTech Artificial Intelligence and Machine Learning student passionate about building practical software, intelligent systems, and modern web applications that solve real-world problems."
    )
    about_text = models.TextField(
        default="I am an enthusiastic BTech Artificial Intelligence and Machine Learning student with a strong foundation in programming, algorithms, and full-stack web engineering. Driven by curiosity and practical problem-solving, I enjoy taking concepts from theory to working applications, bridging clean architecture with intuitive user experiences."
    )
    email = models.EmailField(default="anushka.aiml.dev@gmail.com")
    github_url = models.URLField(blank=True, default="https://github.com/anushka-aiml")
    linkedin_url = models.URLField(blank=True, default="https://linkedin.com/in/anushka-aiml")
    initial = models.CharField(max_length=5, default="A")
    college = models.CharField(max_length=200, default="Skill Development College / University (Placeholder)")
    degree = models.CharField(max_length=200, default="BTech in Artificial Intelligence & Machine Learning")
    location = models.CharField(max_length=100, default="India")
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - Profile"


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('Languages', 'Programming Languages'),
        ('Frontend', 'Frontend Development'),
        ('Backend', 'Backend & APIs'),
        ('Databases', 'Databases'),
        ('AI/ML', 'AI & Machine Learning'),
        ('Mobile/Cloud', 'Mobile & Cloud'),
        ('Tools', 'Tools & Workflow'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Languages')
    proficiency = models.CharField(max_length=50, default="Intermediate")
    icon = models.CharField(max_length=50, default="code")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return f"{self.name} ({self.category})"


class Project(models.Model):
    title = models.CharField(max_length=200)
    short_description = models.TextField()
    technologies = models.CharField(max_length=300, help_text="Comma-separated tech tags")
    github_url = models.URLField(blank=True, default="")
    demo_url = models.URLField(blank=True, default="")
    featured = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'title']

    def __str__(self):
        return self.title


class Education(models.Model):
    title = models.CharField(max_length=200)
    institution = models.CharField(max_length=250)
    period = models.CharField(max_length=100)
    details = models.TextField(blank=True)
    score = models.CharField(max_length=100, blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.title} - {self.institution}"


class Achievement(models.Model):
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100, default="Certification")
    organization = models.CharField(max_length=200)
    year = models.CharField(max_length=50)
    description = models.TextField()
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.title} ({self.year})"


class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Message from {self.name} <{self.email}> at {self.created_at}"
