from rest_framework import serializers
from .models import Usuario, Tarefas

class UsuarioSerializers(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class TarefasSerializers(serializers.ModelSerializer):
    nome = serializers.CharField(source='id_usuario.nome', read_only=True)
    class Meta:
        model = Tarefas
        fields = ['id', 'descricao', 'nomeSala', 'prioridade', 'status', 'dataCadastro', 'id_usuario', 'nome']