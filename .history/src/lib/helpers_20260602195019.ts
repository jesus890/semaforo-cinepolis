import { format } from "date-fns";
import { es } from "date-fns/locale";

export function FormatDate(fecha: string) {
  if (!fecha) return "";
  const date = new Date(fecha);
  return format(date, "dd/MM/yyyy", { locale: es });
}