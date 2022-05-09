import json

from django.test import TestCase
from .models import *


class PortalTesting(TestCase):
    Add_Candidate = '/api/add_candidate'
    Update_Status = '/api/application/update_status'

    CandidateDetail = json.dumps({
        'personal': {'firstName': 'Naman', 'lastName': 'Singh', 'phone': '1234567890', 'email': 'example@example.com',
                     'gender': {'value': 'Male', 'label': 'Male'}},
        'skill': [{'skill': 'Skill1', 'skill_level': {'value': 'Beginner', 'label': 'Beginner'}}], 'education': [
            {'institute_name': 'College 1', 'certificate_degree_name': 'Degree 1', 'major': 'Major 1',
             'percentage': '76', 'starting_date': '2022-05-09T18:30:00.000Z',
             'completion_date': '2022-05-19T18:30:00.000Z'}]})

    def test_add_candidate(self):
        response = self.client.post(
            self.Add_Candidate,
            data={"data": self.CandidateDetail},
            content_type='application/json')

        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(
            str(response.content, encoding='utf8'),
            {
                'msg': 'Candidate added.'
            }
        )

    def test_create_new_candidate_with_existed_candidate(self):
        self.client.post(
            self.Add_Candidate,
            data={"data": self.CandidateDetail},
            content_type='application/json')
        response = self.client.post(
            self.Add_Candidate,
            data={"data": self.CandidateDetail},
            content_type='application/json')

        self.assertEqual(response.status_code, 400)
        self.assertJSONEqual(
            str(response.content, encoding='utf8'),
            {
                'msg': 'Phone or Email already registered.'
            }
        )

    def create_dummy_candidate(self, phone, email):
        Candidate.objects.create(firstName='Naman',
                                 lastName='Singh',
                                 phone=phone,
                                 email=email,
                                 gender='Male')

    def test_status_update_accepted_success(self):
        self.create_dummy_candidate(phone=1234567890, email='example@example.com')

        response = self.client.post(
            self.Update_Status,
            data={"status": "Accepted", "user": 1},
            content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(
            str(response.content, encoding='utf8'),
            {
                'msg': 'Application Accepted.'
            }
        )

    def test_status_update_rejected_success(self):
        self.create_dummy_candidate(phone=1234567890, email='example@example.com')

        response = self.client.post(
            self.Update_Status,
            data={"status": "Rejected", "user": 1},
            content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(
            str(response.content, encoding='utf8'),
            {
                'msg': 'Application Rejected.'
            }
        )

    def test_status_update_non_existing_candidate(self):
        self.create_dummy_candidate(phone=1234567890, email='example@example.com')
        self.create_dummy_candidate(phone=1234567891, email='example1@example.com')
        self.create_dummy_candidate(phone=1234567892, email='example2@example.com')

        response = self.client.post(
            self.Update_Status,
            data={"status": "Rejected", "user": 4},
            content_type='application/json')
        self.assertEqual(response.status_code, 404)
        self.assertJSONEqual(
            str(response.content, encoding='utf8'),
            {
                'msg': 'Candidate does not exist.'
            }
        )
