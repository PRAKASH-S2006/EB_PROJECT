from django.urls import path
from EB import views
from .views import Connect,EditApplication
urlpatterns = [
    path("",views.index,name="index"),
    path("login/Print",views.Printit,name="Print"),
    path("upload/",views.Upload,name="Upload"),
    path("Data/",Connect.as_view(),name="Applicant_Data"),
    path("application/<str:app_id>/",EditApplication.as_view(),name="get_application"),
    path("edit/<str:app_id>/", EditApplication.as_view()),
    path("connectionRequest/",views.connectionRequest,name="ConnectionRequest"),
    path("Login/",views.LoginH,name="EBLogin")
]