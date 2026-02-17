export { ProjectsContent } from "./list/ProjectsList"
export { ProjectEditContent } from "./edit/projectEdit"
export { DEFAULT_FORM_SECTION, PROJECT_FORM_SECTIONS } from "./forms"
export type { ProjectFormSectionProps } from "./forms"
export {
  getStatusStyle,
  mapModeloCronogramaToForm,
  statusToStepIndex,
  STATUS_PROJETO_LIST,
  STATUS_PROJETO_STEPS,
} from "./services/project.service"
export type { ProjectModelData, StatusProjeto, CronogramaDataMapped } from "./services/project.service"
