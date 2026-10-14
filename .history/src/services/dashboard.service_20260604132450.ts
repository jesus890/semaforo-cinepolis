import { apiRequest } from "../lib/api";
import { axiosInstance } from "../lib/axios";

export const GetEntidadesByAlertaTable = () =>
    apiRequest<any>(
        axiosInstance.get(`/api/Alertas`)
    );

export const GetEntidadesByAlertaTableEstado = (estado_id: any) =>
    apiRequest<any>(
        axiosInstance.get(`/api/Alertas`)
    );

export const GetTotalesIncremento = (estado_id: any, municipio_id: any) =>
    apiRequest<any>(
        axiosInstance.get(`/api/Alertas/incremento-desaparecidos`)
    );