
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
  Timeline, 
  TimelineItem, 
  TimelineConnector, 
  TimelineHeader, 
  TimelineIcon, 
  TimelineTitle, 
  TimelineBody,
  TimelineDescription
} from '@/components/ui/timeline';
import { UserCog, Edit, ClipboardCheck, UserCheck, FileText } from 'lucide-react';

type ClientHistoryModalProps = {
  open: boolean;
  onClose: () => void;
  client: any;
};

const ClientHistoryModal = ({ open, onClose, client }: ClientHistoryModalProps) => {
  if (!client) return null;

  const history = [
    {
      date: '25/10/2023 14:30',
      type: 'edit',
      title: 'Informações Atualizadas',
      description: 'Endereço e contacto atualizados por Maria Oliveira',
      icon: Edit,
    },
    {
      date: '15/07/2023 10:15',
      type: 'ticket',
      title: 'Ticket Criado #TK-1235',
      description: 'Ticket para "Falta de água" aberto',
      icon: FileText,
    },
    {
      date: '30/05/2023 09:45',
      type: 'status',
      title: 'Status Alterado',
      description: 'Status alterado de "Pendente" para "Ativo" por Carlos Santos',
      icon: ClipboardCheck,
    },
    {
      date: '15/03/2022 11:20',
      type: 'create',
      title: 'Cliente Criado',
      description: 'Novo cliente registrado por Pedro Lima',
      icon: UserCheck,
    },
  ];

  const getIconColor = (type: string) => {
    const colors = {
      'edit': 'text-blue-600 bg-blue-100',
      'ticket': 'text-purple-600 bg-purple-100',
      'status': 'text-green-600 bg-green-100',
      'create': 'text-orange-600 bg-orange-100',
    };
    return colors[type as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <UserCog className="h-5 w-5" />
            Histórico do Cliente
          </DialogTitle>
          <DialogDescription>
            Histórico completo de atividades relacionadas a {client.name}.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 pr-4 h-[400px]">
          <Timeline className="py-4">
            {history.map((item, index) => (
              <TimelineItem key={index}>
                {index < history.length - 1 && <TimelineConnector />}
                <TimelineHeader>
                  <TimelineIcon className={getIconColor(item.type)}>
                    <item.icon className="h-4 w-4" />
                  </TimelineIcon>
                  <TimelineTitle>{item.title}</TimelineTitle>
                </TimelineHeader>
                <TimelineBody>
                  <TimelineDescription>{item.description}</TimelineDescription>
                  <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                </TimelineBody>
              </TimelineItem>
            ))}
          </Timeline>
        </ScrollArea>
        <div className="flex justify-end gap-2 pt-4">
          <Button onClick={onClose}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClientHistoryModal;
