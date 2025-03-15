import os
from django.http import FileResponse, HttpResponse
from django.conf import settings

def index(request):
    file_path = os.path.abspath(os.path.join(settings.BASE_DIR, "voting", "static", "index.html"))

    if not os.path.exists(file_path):
        return HttpResponse(f"index.html not found at {file_path}. Check your Next.js build output.", status=500)
    
    return FileResponse(open(file_path, "rb"), content_type="text/html")
