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

export const GetTotalesIncremento = (idEstado: any) =>
    apiRequest<any>(
        axiosInstance.get(`/api/Alertas/incremento-desaparecidos`, {
            params: {
                idEstado,
            },
        })
    );

export const GetTableCumplimiento = (estado: any) =>
    apiRequest<any>(
        axiosInstance.get(`/api/Fichas/estadistica-rnpdno-alerta`, {
            params: {
                estado,
            },
        })
    );

export const GetTableAutoridades = (estado: any) =>
    apiRequest<any>(
        axiosInstance.get(`/api/Fichas/estadistica-rnpdno-alerta`, {
            params: {
                estado,
            },
        })
    );