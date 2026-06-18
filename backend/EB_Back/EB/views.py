from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import ListView
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json
import pandas as pd
from django.db.models import Count
from django.db.models.functions import TruncMonth
from .models import Applications,Connection,Statu
from django.contrib.auth import authenticate, login
def index(request):
    return render(request,"hello.html")
def Printit(request):
    return render(request,"Print.html")
def Upload(request):

    df = pd.read_csv("EB_Back/EB_Applicants_5000_with_connections.csv")

    for i, row in df.iterrows():

        app, created = Applications.objects.get_or_create(
            Applicant_Name=row["Applicant_Name"],
            Gender=row["Gender"],
            State=row["State"],
            District=row["District"],
            PinCode=row["PinCode"],
            GID=row["GID"],
            Owner=row["Owner"],
            TypeOfConnection=row["TypeOfConnection"]
        )

        sta, created = Statu.objects.get_or_create(
            Name=row["Status"]
        )

        Connection.objects.get_or_create(
            connection_no=row["connection_no"],
            defaults={
                "Applicant": app,
                "Status": sta,
                "connection_date": pd.to_datetime(
                    row["connection_date"]
                ).date()
            }
        )

        print(row["Applicant_Name"])

    return HttpResponse("Uploading Completed")
class Connect(ListView):
    model=Connection
    context_object_name="Connect"
    paginate_by=100
    def get_queryset(self):
        S_et=super().get_queryset()
        Search=self.request.GET.get("search")
        if Search:
            S_et=S_et.filter(Applicant__Applicant_Name__icontains=Search)
        return S_et
    def get_context_data(self,**kwrgs):
        context=super().get_context_data(**kwrgs)
        context["Search"]=self.request.GET.get("search")
        return context
    def render_to_response(self,context):
        EBData=[
            {
                "Con_Num":con.connection_no,
                "Name":con.Applicant.Applicant_Name,
                "gender":con.Applicant.Gender,
                "State":con.Applicant.State,
                "District":con.Applicant.District,
                "ApprovalDate":con.connection_date,
                "TypeOfConnectionTaken":con.Applicant.TypeOfConnection,
                "TypeOfOwnerShip":con.Applicant.Owner
            }
            for con in context["Connect"]
        ]
        paginate=Paginator(EBData,self.paginate_by)
        Pgno=self.request.GET.get('page')
        pg_obj=paginate.get_page(Pgno)
        response={
            "data":pg_obj.object_list,
            "search":context["Search"],
            "total_pages":paginate.num_pages,
            "current_page":pg_obj.number
        }
        return JsonResponse(response)
@method_decorator(csrf_exempt, name='dispatch')
class EditApplication(View):
    def get(self, request, app_id):
        try:
            con = Connection.objects.get(connection_no=app_id)

            app = con.Applicant

            return JsonResponse({
                "Applicant_Name": app.Applicant_Name,
                "Gender": app.Gender,
                "State": app.State,
                "District": app.District,
                "PinCode": app.PinCode,
                "GID": app.GID,
                "Owner": app.Owner,
                "TypeOfConnection": app.TypeOfConnection
            })

        except Connection.DoesNotExist:
            return JsonResponse(
                {"message": "Not Found"},
                status=404
            )
    def post(self, request, app_id):
        try:
            con = Connection.objects.get(connection_no=app_id)
            app=con.Applicant
            data = json.loads(request.body)

            app.Applicant_Name = data.get("Applicant_Name", app.Applicant_Name)
            app.Gender = data.get("Gender", app.Gender)
            app.State = data.get("State", app.State)
            app.District = data.get("District", app.District)
            app.PinCode = data.get("PinCode", app.PinCode)
            app.GID = data.get("GID", app.GID)
            app.Owner = data.get("Owner", app.Owner)
            app.TypeOfConnection = data.get(
                "TypeOfConnection",
                app.TypeOfConnection
            )

            app.save()

            return JsonResponse({
                "message": "Application Updated Successfully"
            })

        except Applications.DoesNotExist:
            return JsonResponse(
                {"message": "Application Not Found"},
                status=404
            )
def connectionRequest(request):
    connection_RQ=request.GET.get("type")
    if connection_RQ=="month":
        data=Connection.objects.annotate(month=TruncMonth("connection_date")
        ).values("month").annotate(total_RQ=Count("id"))
        labels=[i["month"].strftime("%B %Y") for i in data]
    elif connection_RQ=="status":
        data=Connection.objects.values("Applicant__TypeOfConnection").annotate(total_RQ=Count("id"))
        labels=[i["Applicant__TypeOfConnection"] for i in data]
    else:
        return JsonResponse({
            "error":"Invalid Type",
        },
        status=400)
    total_Request=[
        i["total_RQ"] for i in data
    ]
    return JsonResponse({
        "label":labels,
        "total_RQ":total_Request
    })
def ConnectioVisualization(request):
    connection_RQ=request.GET.get("type")
    if connection_RQ=="month":
        data=Connection.objects.values("connection_date__year","connection_date__month").annotate(total_RQ=Count("id"))
        labels=[f"{x['connection_date__year']}-{x['connection_date__month']}" for x in data]
    elif connection_RQ=="connection_type":
        data=Connection.objects.values("Applicant__TypeOfConnection").annotate(total_RQ=Count("id"))
        labels=[x["Applicant__TypeOfConnection"] for x in data]
    total_Request=[
        i["total_RQ"] for i in data
    ]
    context={
        "labels":labels,
        "TotalRequests":total_Request
    }
    return render(request,"visulization.html",context)
@csrf_exempt
def LoginH(request):
    if request.method=="POST":
        data=json.loads(request.body)
        username=data.get("username")
        password=data.get("password")
        if username and password:
            User=authenticate(request,
            username=username,
            password=password)
            if User is not None:
                login(request,User)
                return JsonResponse({"User":username},status=200)
            else:
                return JsonResponse({"message":"Error no User Present"},status=400)
        else:
            return JsonResponse({"message":"Give The Credentials"},status=400)
    else:
        return JsonResponse({"message":"Not Allowed"},status=405)
