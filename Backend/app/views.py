from .serializers import TarefasSerializers, UsuarioSerializers
from rest_framework import viewsets
from .models import Usuario, Tarefas

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()   # ✅ agora é um QuerySet
    serializer_class = UsuarioSerializers

class TarefasViewSet(viewsets.ModelViewSet):
    queryset = Tarefas.objects.all()   # ✅ idem
    serializer_class = TarefasSerializers
