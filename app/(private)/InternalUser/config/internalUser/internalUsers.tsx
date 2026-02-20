"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Pencil, Trash2, KeyRound } from "lucide-react"
import OpenPopUpButton from "@/components/shared/Buttons/openPopUpButton"
import Popup from "@/components/shared/PopUps/Generico/popUpGenerico"
import FiltroGenerico, { type FiltroConfig } from "@/components/shared/GenericFilter/genericFilter"
import {
  DataTable,
  type TableColumn,
} from "@/components/shared/Tables/GenericTable/genericTable"
import {
  PERFIL_USUARIO_OPTIONS,
  STATUS_USUARIO_OPTIONS,
} from "@/constants/user"
import type { PerfilUsuario, StatusUsuario, Usuario } from "@/types/user"
import { getUsuarioStatusStyle } from "@/services/user.service"
import { filterUsuarios } from "@/lib/utils"
import dadosIniciaisJson from "@/lib/exempleData/internalUser.json"

const dadosIniciais = dadosIniciaisJson as Usuario[]

import styles from "./internalUsers.module.css"

const columns: TableColumn<Usuario>[] = [
  { id: "nome", label: "Nome", align: "left" },
  {
    id: "status",
    label: "Status",
    align: "center",
    render: (row) => (
      <span className={getUsuarioStatusStyle(row.status)}>
        {row.status}
      </span>
    ),
  },
  { id: "perfil", label: "Perfil", align: "center" },
  {
    id: "acoes",
    label: "Ações",
    align: "center",
    render: (row) => (
      <div className={styles.actions}>
        <button
          type="button"
          className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300 text-amber-600 hover:text-amber-800"
          aria-label="Redefinir Senha"
          title="Redefinir Senha"
          onClick={() => alert(`Solicitação de redefinição de senha para: ${row.nome}`)}
        >
          <KeyRound size={16} />
        </button>
        <Link
          href={`/InternalUser/config/internalUser/${row.id}`}
          className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300 inline-flex items-center justify-center"
          aria-label="Editar"
        >
          <Pencil size={16} />
        </Link>
        <button
          type="button"
          className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300 text-red-600 hover:text-red-800"
          aria-label="Excluir"
        >
          <Trash2 size={16} />
        </button>
      </div>
    ),
  },
]

const filtrosUsuarios: FiltroConfig[] = [
  { name: "nome", placeholder: "Buscar por nome...", type: "text" },
  {
    name: "status",
    type: "select",
    options: [{ label: "Todos", value: "" }, ...STATUS_USUARIO_OPTIONS],
  },
  {
    name: "perfil",
    type: "select",
    options: [{ label: "Todos", value: "" }, ...PERFIL_USUARIO_OPTIONS],
  },
]

export function InternalUsersContent() {
  const [filtrosValores, setFiltrosValores] = useState<Record<string, string>>({})
  const [usuarios, setUsuarios] = useState<Usuario[]>(dadosIniciais)
  const [popupAberto, setPopupAberto] = useState(false)
  const [form, setForm] = useState({
    nome: "",
    email: "",
    status: "Ativo" as StatusUsuario,
    perfil: "Usuário" as PerfilUsuario,
  })

  const usuariosFiltrados = useMemo(
    () => filterUsuarios(usuarios, filtrosValores),
    [filtrosValores, usuarios]
  )

  const abrirPopup = () => {
    setForm({ nome: "", email: "", status: "Ativo", perfil: "Usuário" })
    setPopupAberto(true)
  }

  const fecharPopup = () => setPopupAberto(false)

  const handleSalvarUsuario = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nome.trim() || !form.email.trim()) return
    const novoId = Math.max(0, ...usuarios.map((u) => u.id)) + 1
    setUsuarios((prev) => [
      ...prev,
      { id: novoId, nome: form.nome.trim(), email: form.email.trim(), status: form.status, perfil: form.perfil },
    ])
    fecharPopup()
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Usuários Internos</h1>
        <OpenPopUpButton title="+ Adicionar usuário" onClick={abrirPopup} />
      </div>

      <Popup open={popupAberto} title="Cadastrar usuário" onClose={fecharPopup}>
        <form onSubmit={handleSalvarUsuario} className={styles.form}>
          <div>
            <label className={styles.label}>Nome</label>
            <input
              type="text"
              value={form.nome}
              onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
              className={styles.input}
              placeholder="Nome completo"
              required
            />
          </div>

          <div>
            <label className={styles.label}>E-mail</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className={styles.input}
              placeholder="email@exemplo.com"
              required
            />
          </div>

          <div>
            <label className={styles.label}>Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as StatusUsuario }))}
              className={styles.select}
            >
              {STATUS_USUARIO_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={styles.label}>Perfil</label>
            <select
              value={form.perfil}
              onChange={(e) => setForm((f) => ({ ...f, perfil: e.target.value as PerfilUsuario }))}
              className={styles.select}
            >
              {PERFIL_USUARIO_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className={styles.formActions}>
            <button type="button" onClick={fecharPopup} className={styles.cancelButton}>
              Cancelar
            </button>
            <button type="submit" className={styles.saveButton}>
              Salvar
            </button>
          </div>
        </form>
      </Popup>

      <FiltroGenerico
        filtros={filtrosUsuarios}
        valores={filtrosValores}
        onChange={(name, value) =>
          setFiltrosValores((prev) => ({ ...prev, [name]: value }))
        }
        onLimpar={() => setFiltrosValores({})}
      />

      <DataTable<Usuario>
        columns={columns}
        data={usuariosFiltrados}
        getRowKey={(row) => row.id}
      />
    </div>
  )
}
