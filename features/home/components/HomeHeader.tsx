import styles from "../styles/home.module.css"
import {
  CONST_HOME_TITLES,
  CONST_HOME_SUBTITLES,
} from "@/constants/home"

/** Cabeçalho da página inicial */
export function HomeHeader() {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{CONST_HOME_TITLES.TITLE_BEM_VINDO}</h1>
      <p className={styles.subtitle}>{CONST_HOME_SUBTITLES.SUBTITLE_TITLE}</p>
    </div>
  )
}
