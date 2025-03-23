
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { MessageSquare, User, ClipboardList, Clock, AlertCircle } from 'lucide-react';

type TicketDetailsModalProps = {
  open: boolean;
  onClose: () => void;
  ticket: any;
};

const TicketDetailsModal = ({ open, onClose, ticket }: TicketDetailsModalProps) => {
  const [activeTab, setActiveTab] = React.useState('details');
  const [comment, setComment] = React.useState('');
  const [status, setStatus] = React.useState(ticket?.status || '');
  const [assignee, setAssignee] = React.useState(ticket?.assignee?.name || '');

  if (!ticket) return null;

  const ticketStatusMap = {
    'Aberto': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'Em andamento': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Resolvido': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Fechado': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  };

  const ticketPriorityMap = {
    'Baixa': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Média': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'Alta': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'Crítica': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;
    toast.success('Comentário adicionado com sucesso!');
    setComment('');
  };

  const handleUpdateStatus = () => {
    toast.success(`Status atualizado para ${status}!`);
  };

  const handleAssign = () => {
    toast.success(`Ticket atribuído para ${assignee}!`);
  };

  const comments = [
    {
      id: 1,
      user: {
        name: 'Maria Oliveira',
        avatar: '',
        initials: 'MO',
      },
      text: 'Equipe foi enviada para verificar o problema. Estimativa de resolução em 3 horas.',
      date: '28/11/2023 15:45',
    },
    {
      id: 2,
      user: {
        name: 'Carlos Santos',
        avatar: '',
        initials: 'CS',
      },
      text: 'Verificado vazamento na conexão principal. Será necessário substituir uma peça.',
      date: '28/11/2023 17:20',
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            Ticket #{ticket.id}
          </DialogTitle>
          <DialogDescription>
            {ticket.title}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="details">Detalhes</TabsTrigger>
            <TabsTrigger value="comments">Comentários</TabsTrigger>
            <TabsTrigger value="actions">Ações</TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 pr-4 h-[400px]">
            <TabsContent value="details" className="mt-0 space-y-4">
              <div className="flex flex-col space-y-1.5">
                <h3 className="text-lg font-semibold">{ticket.title}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={ticketPriorityMap[ticket.priority]}>
                    {ticket.priority}
                  </Badge>
                  <Badge variant="outline" className={ticketStatusMap[ticket.status]}>
                    {ticket.status}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="text-sm text-muted-foreground">Cliente</div>
                  <div className="font-medium flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {ticket.client.name}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-sm text-muted-foreground">Categoria</div>
                  <div className="font-medium">{ticket.category}</div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-sm text-muted-foreground">Data de Criação</div>
                  <div className="font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {formatDate(ticket.created)}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-sm text-muted-foreground">Atendente</div>
                  <div className="font-medium">
                    {ticket.assignee ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          {ticket.assignee.avatar ? (
                            <AvatarImage src={ticket.assignee.avatar} alt={ticket.assignee.name} />
                          ) : null}
                          <AvatarFallback className="bg-mvura-100 text-mvura-700 text-xs">
                            {ticket.assignee.initials}
                          </AvatarFallback>
                        </Avatar>
                        {ticket.assignee.name}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Não atribuído</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <h4 className="text-sm font-medium">Descrição</h4>
                <p className="text-sm">
                  Foi relatado um vazamento de água significativo na rua principal próximo ao Mercado Central. 
                  A água está escorrendo pela calçada e causando transtornos aos pedestres e comerciantes da região.
                </p>
              </div>

              {ticket.status === 'Resolvido' && (
                <div className="space-y-2 mt-4">
                  <h4 className="text-sm font-medium">Resolução</h4>
                  <p className="text-sm">
                    Equipe técnica identificou e reparou o vazamento na tubulação principal. 
                    Foi necessária a substituição de uma válvula danificada. 
                    Serviço concluído em 28/11/2023 às 19:30.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="comments" className="mt-0 space-y-4">
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-muted/40 p-3 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="h-8 w-8">
                        {comment.user.avatar ? (
                          <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                        ) : null}
                        <AvatarFallback className="bg-mvura-100 text-mvura-700">
                          {comment.user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">{comment.user.name}</div>
                        <div className="text-xs text-muted-foreground">{comment.date}</div>
                      </div>
                    </div>
                    <p className="text-sm">{comment.text}</p>
                  </div>
                ))}

                <div className="pt-4">
                  <div className="space-y-3">
                    <Label htmlFor="comment">Adicionar comentário</Label>
                    <Textarea 
                      id="comment" 
                      placeholder="Escreva um comentário..." 
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <Button onClick={handleAddComment} disabled={!comment.trim()}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Comentar
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="actions" className="mt-0 space-y-6">
              <div className="space-y-3">
                <Label htmlFor="status">Atualizar Status</Label>
                <div className="flex items-center gap-2">
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger id="status" className="w-full">
                      <SelectValue placeholder="Selecione o novo status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Aberto">Aberto</SelectItem>
                      <SelectItem value="Em andamento">Em andamento</SelectItem>
                      <SelectItem value="Resolvido">Resolvido</SelectItem>
                      <SelectItem value="Fechado">Fechado</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleUpdateStatus} disabled={status === ticket.status}>Atualizar</Button>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="assignee">Atribuir Para</Label>
                <div className="flex items-center gap-2">
                  <Select value={assignee} onValueChange={setAssignee}>
                    <SelectTrigger id="assignee" className="w-full">
                      <SelectValue placeholder="Selecione um atendente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Maria Oliveira">Maria Oliveira</SelectItem>
                      <SelectItem value="Carlos Santos">Carlos Santos</SelectItem>
                      <SelectItem value="Pedro Lima">Pedro Lima</SelectItem>
                      <SelectItem value="Luísa Fernandes">Luísa Fernandes</SelectItem>
                      <SelectItem value="Rafael Mendes">Rafael Mendes</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleAssign} disabled={assignee === (ticket.assignee?.name || '')}>Atribuir</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <Label className="text-red-500">Ações Críticas</Label>
                </div>
                <div className="flex gap-2">
                  {ticket.status !== 'Fechado' ? (
                    <Button variant="destructive" className="w-full">
                      Fechar Ticket
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full">
                      Reabrir Ticket
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={onClose}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TicketDetailsModal;
