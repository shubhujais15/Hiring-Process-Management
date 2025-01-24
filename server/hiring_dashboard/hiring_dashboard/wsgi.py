import os
import sys

from django.core.wsgi import get_wsgi_application

try:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hiring_dashboard.settings')
    application = get_wsgi_application()
except Exception as e:
    sys.stderr.write(f"WSGI error: {e}\n")
    raise
