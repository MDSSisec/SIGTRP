import React from "react";
import Popup from "./popUpGenerico";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface PopupNovoProjetoProps {
  open: boolean;
  onClose: () => void;
}

export default function PopupNovoProjeto({ open, onClose }: PopupNovoProjetoProps) {
  return (
    <Popup open={open} title="Novo Projeto" onClose={onClose}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nomeProjeto">Nome do Projeto</Label>
          <Input id="nomeProjeto" placeholder="Digite o nome do projeto" />
        </div>

         <div className="space-y-2">
          <Label htmlFor="resonsalvelExterno">Responsável Externo</Label>
          <Input id="resonsalvelExterno" placeholder="Digite o nome do responsável externo" />
        </div>


        <div className="space-y-2">
          <Label htmlFor="resonsalvelInterno">Responsável Interno</Label>
          <Input id="resonsalvelInterno" placeholder="Digite o nome do responsável interno" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tipoProjeto">Tipo de Projeto</Label>
          <select 
            id="tipoProjeto" 
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            defaultValue=""
          >
            <option value="" disabled>Selecione o tipo</option>
            <option value="Empreende">Empreende</option>
            <option value="Marketing">Marketing</option>
            <option value="Comercial">Comercial</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={() => {
            // Lógica para salvar
            console.log("Salvar projeto");
            onClose();
          }}>
            Criar Projeto
          </Button>
        </div>
      </div>
    </Popup>
  );
}