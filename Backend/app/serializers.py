from rest_framework import serializers
from .models import Usuario, Tarefas

class UsuarioSerializers(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class TarefasSerializers(serializers.ModelSerializer):
    class Meta:
        model = Tarefas
        fields = '__all__'