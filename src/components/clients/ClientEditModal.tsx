
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

type ClientEditModalProps = {
  open: boolean;
  onClose: () => void;
  client: any;
};

const ClientEditModal = ({ open, onClose, client }: ClientEditModalProps) => {
  const [formData, setFormData] = useState(client || {});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Cliente atualizado com sucesso!");
      onClose();
    }, 1000);
  };

  if (!client) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Cliente</DialogTitle>
          <DialogDescription>
            Atualize as informações do cliente abaixo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome/Razão Social *</Label>
                <Input 
                  id="name" 
                  value={formData.name || ''} 
                  onChange={handleChange} 
                  placeholder="Nome completo ou razão social" 
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nif">NIF/NUIT *</Label>
                <Input 
                  id="nif" 
                  value={formData.nif || ''} 
                  onChange={handleChange} 
                  placeholder="Número de identificação fiscal" 
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Endereço *</Label>
              <Input 
                id="address" 
                value={formData.address || ''} 
                onChange={handleChange} 
                placeholder="Endereço completo" 
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact">Contacto *</Label>
                <Input 
                  id="contact" 
                  value={formData.contact || ''} 
                  onChange={handleChange} 
                  placeholder="Número de telefone" 
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input 
                  id="email" 
                  value={formData.email || ''} 
                  onChange={handleChange} 
                  placeholder="exemplo@email.com" 
                  type="email" 
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contractType">Tipo de Contrato *</Label>
                <Select 
                  value={formData.contractType} 
                  onValueChange={(value) => handleSelectChange('contractType', value)}
                >
                  <SelectTrigger id="contractType">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Residencial">Residencial</SelectItem>
                    <SelectItem value="Comercial">Comercial</SelectItem>
                    <SelectItem value="Industrial">Industrial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => handleSelectChange('status', value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Pendente">Pendente</SelectItem>
                    <SelectItem value="Inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Data de Início *</Label>
              <Input 
                id="startDate" 
                value={formData.startDate || ''} 
                onChange={handleChange} 
                placeholder="DD/MM/AAAA" 
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              type="button" 
              onClick={onClose} 
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ClientEditModal;
