import React from "react";

type ItemDespesa = {
  numero: string;
  descricao: string;
  codigoElemento: string;
  unidade: string;
  quantidade: number;
  valorUnitario: number;
  fonteRecurso: string;
};

const dados: ItemDespesa[] = [
  {
    numero: "1.1",
    descricao: "Etapa 1.1 - Execução do Curso de Corte e Costura para Mulheres",
    codigoElemento: "44.90.52",
    unidade: "unidade",
    quantidade: 15,
    valorUnitario: 1200,
    fonteRecurso: "Repasse do MDS",
  },
  {
    numero: "1.1",
    descricao: "Compra de máquinas de costura domésticas",
    codigoElemento: "44.90.52",
    unidade: "unidade",
    quantidade: 30,
    valorUnitario: 200,
    fonteRecurso: "Repasse do MDS",
  },
  {
    numero: "1.2",
    descricao: "Compra de kits de tecidos e aviamentos",
    codigoElemento: "44.90.52",
    unidade: "unidade",
    quantidade: 30,
    valorUnitario: 200,
    fonteRecurso: "Repasse do MDS",
  },
  {
    numero: "1.3",
    descricao: "Pagamento de instrutora para ministrar o curso",
    codigoElemento: "33.90.36",
    unidade: "hora/aula",
    quantidade: 120,
    valorUnitario: 80,
    fonteRecurso: "Repasse do MDS",
  },
  {
    numero: "1.4",
    descricao:
      "Aquisição de materiais auxiliares de costura (tesouras, réguas, agulhas, linhas, etc)",
    codigoElemento: "44.90.52",
    unidade: "pacote",
    quantidade: 30,
    valorUnitario: 150,
    fonteRecurso: "Repasse do MDS",
  },
];

const formatarMoeda = (valor: number) =>
  valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

export default function TabelaMeta() {
  const totalGeral = dados.reduce(
    (acc, item) => acc + item.quantidade * item.valorUnitario,
    0
  );

  return (
    <div className="p-6">
      <div className="bg-gray-100 p-3 rounded-t-lg font-semibold text-lg">
        Meta 1 - Etapa / Produto
      </div>

      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Nº</th>
            <th className="border p-2 text-left">
              Itens de despesa para realizar a etapa
            </th>
            <th className="border p-2">Código do Elemento de despesa</th>
            <th className="border p-2">Unidade</th>
            <th className="border p-2">Quantidade</th>
            <th className="border p-2">Valor Unitário (R$)</th>
            <th className="border p-2">Total (R$)</th>
            <th className="border p-2">Fonte do recurso</th>
          </tr>
        </thead>

        <tbody>
          {dados.map((item, index) => {
            const total = item.quantidade * item.valorUnitario;

            return (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border p-2 text-center">{item.numero}</td>
                <td className="border p-2">{item.descricao}</td>
                <td className="border p-2 text-center">
                  {item.codigoElemento}
                </td>
                <td className="border p-2 text-center">{item.unidade}</td>
                <td className="border p-2 text-center">{item.quantidade}</td>
                <td className="border p-2 text-right">
                  {formatarMoeda(item.valorUnitario)}
                </td>
                <td className="border p-2 text-right">
                  {formatarMoeda(total)}
                </td>
                <td className="border p-2 text-center">
                  {item.fonteRecurso}
                </td>
              </tr>
            );
          })}
        </tbody>

        <tfoot>
          <tr className="bg-gray-100 font-semibold">
            <td colSpan={6} className="border p-2 text-right">
              Total da Meta 1
            </td>
            <td className="border p-2 text-right">
              {formatarMoeda(totalGeral)}
            </td>
            <td className="border p-2"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
