from django.db import models
from django.utils.translation import gettext_lazy as _

class Usuario(models.Model):
    nome = models.CharField(_("Nome usuário"), max_length=255 , null= False)
    email = models.CharField(_("Email usuário"), max_length=255 , null= False)


class Tarefas(models.Model):
    Prioridade_Choiches = [
        ('B' , 'Baixa'),
        ('M' , 'Media'),
        ('A' , 'Alta'),
    ]
    
    Status_Choiches = [
        ('AF' , 'A fazer'),
        ('F' , 'Fazendo'),
        ('P' , 'Pronto'),
    ]
    descricao = models.TextField(_("Sobre as tarefas"))
    nomeSala = models.CharField(_("Nome da sua sala"),max_length=255, null= False)
    prioridade = models.CharField(_("Prioridade da tarefa"), max_length=5, choices=Prioridade_Choiches , null= False , default='B')
    status = models.CharField(_("Status da tarefa"), max_length=7, choices=Status_Choiches , null= False , default='AF')
    dataCadastro = models.DateField(_("Data inicial da tarefa"), null=False)
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name="usuario")

