from django.test import TestCase, Client
from django.urls import reverse
from portfolio_api.models import Profile, Skill, Project, Education, Achievement, ContactMessage


class PortfolioApiTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_health_endpoint(self):
        response = self.client.get(reverse('health'))
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data.get('status'), 'ok')
        self.assertEqual(data.get('database', {}).get('status'), 'connected')

    def test_portfolio_endpoint(self):
        response = self.client.get(reverse('portfolio'))
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn('profile', data)
        self.assertIn('skills', data)
        self.assertIn('projects', data)
        self.assertIn('education', data)
        self.assertIn('achievements', data)
        self.assertEqual(data['profile']['name'], 'Anushka')
        self.assertGreaterEqual(len(data['projects']), 5)
        self.assertGreaterEqual(len(data['skills']), 9)

    def test_contact_endpoint_success(self):
        payload = {
            "name": "Prof. Sharma",
            "email": "sharma@college.edu",
            "message": "Excellent work on the 3-tier architecture portfolio project!"
        }
        response = self.client.post(
            reverse('contact'),
            data=payload,
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 201)
        data = response.json()
        self.assertTrue(data.get('success'))
        self.assertEqual(ContactMessage.objects.count(), 1)
        saved = ContactMessage.objects.first()
        self.assertEqual(saved.name, "Prof. Sharma")

    def test_contact_endpoint_validation_failure(self):
        payload = {
            "name": "",
            "email": "invalid-email",
            "message": "hi"
        }
        response = self.client.post(
            reverse('contact'),
            data=payload,
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)
        data = response.json()
        self.assertFalse(data.get('success'))
