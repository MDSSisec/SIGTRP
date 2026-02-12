import React, { useState } from "react";
import { LucideIcon, Info } from "lucide-react";
import styles from "./totalCard.module.css";

type TotalCardProps = {
  title: string;
  totalCad: number | string;
  icon: LucideIcon;
  description: string;
};

export default function TotalCard({
  title,
  totalCad,
  icon: Icon,
  description,
}: TotalCardProps) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <Icon size={28} className={styles.mainIcon} />
          <h3 className={styles.title}>{title}</h3>
        </div>

        {/* Info */}
        <div className={styles.infoWrapper}>
          <Info
            size={18}
            className={styles.infoIcon}
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
          />

          {showInfo && (
            <div className={styles.tooltip}>
              {description}
            </div>
          )}
        </div>
      </div>

      {/* Total */}
      <div>
        <span className={styles.total}>{totalCad}</span>
      </div>
    </div>
  );
}
