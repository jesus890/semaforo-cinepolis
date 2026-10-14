import { apiRequest } from "../lib/api";
import { axiosInstance } from "../lib/axios";

export const GetEntidadesByAlertaTable = () =>
    apiRequest<any>(
        axiosInstance.get(`/api/Alertas`)
    );

export const GetEntidadesByAlertaTableEstado = (idEstado: any) =>
    apiRequest<any>(
        axiosInstance.get(`/api/Alertas/alertas-entidad`, {
            params: {
                idEstado,
            },
        })
    );

export const GetTotalesIncremento = (estado_id: any, municipio_id: any) =>
    apiRequest<any>(
        axiosInstance.get(`/api/Alertas/incremento-desaparecidos`)
    );