from django.db import models
class Statu(models.Model):
    STATUS=[
        ("Connection Released","Connection Given"),
        ("DISCONNECTED", "Disconnected"),
        ("CONNECTING", "Connecting"),
        ("FAILED", "Failed"),
        ("UNKNOWN","Unknown"),
    ]
    Name=models.CharField(max_length=30,choices=STATUS)
    def __str__(self):
        return self.Name
class Applications(models.Model):
    GENDER_CHOICES = [
        ("Male", "Male"),
        ("Female", "Female"),
    ]

    OWNERSHIP_CHOICES = [
        ("INDIVIDUAL", "INDIVIDUAL"),
        ("JOINT", "JOINT"),
    ]

    GOVT_ID_CHOICES = [
        ("ADHAR", "AADHAR"),
        ("PAN", "PAN"),
        ("VOTER_ID", "VOTER_ID"),
        ("PASSPORT", "PASSPORT"),
    ]

    CATEGORY_CHOICES = [
        ("Residential", "Residential"),
        ("Commercial", "Commercial"),
    ]
    Applicant_Name=models.CharField(max_length=100)
    Gender=models.CharField(max_length=10,choices=GENDER_CHOICES)
    State=models.CharField(max_length=40)
    District=models.CharField(max_length=30)
    PinCode=models.IntegerField()
    GID=models.CharField(max_length=20,choices=GOVT_ID_CHOICES)
    Owner=models.CharField(max_length=40,choices=OWNERSHIP_CHOICES)
    TypeOfConnection=models.CharField(max_length=50,choices=CATEGORY_CHOICES)
    def __str__(self):
        return self.Applicant_Name
class Connection(models.Model):
    STATUS = [
        ("PENDING", "Pending"),
        ("ACTIVE", "Active"),
        ("DISCONNECTED", "Disconnected"),
        ("RELEASED", "Released"),
    ]
    connection_no = models.CharField(max_length=20, unique=True)
    connection_date = models.DateField()
    def __str__(self):
        return self.connection_no
    Applicant=models.ForeignKey(Applications,on_delete=models.CASCADE)
    Status=models.ForeignKey(Statu,on_delete=models.CASCADE)