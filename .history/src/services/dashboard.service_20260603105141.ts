import { apiRequest } from "../lib/api";
import { axiosInstance } from "../lib/axios";

export const GetEntidadesByAlertaTable = (estado_id: any, municipio_id: any) =>
    apiRequest<any>(
        axiosInstance.get(`/api/Alertas`)
    );