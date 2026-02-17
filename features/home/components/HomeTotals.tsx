import styles from "../styles/home.module.css"
import TotalCard from "@/components/shared/Totais/TotalCard/totalCard"
import { HomeTotal } from "../types/home.types"

/** Grid de totais da home */
export function HomeTotals({ totais }: { totais: HomeTotal[] }) {
  return (
    <div className={styles.gridTotals}>
      {totais.map((item) => (
        <TotalCard
          key={item.title}
          title={item.title}
          totalCad={item.total}
          icon={item.icon}
          description={item.description}
        />
      ))}
    </div>
  )
}
