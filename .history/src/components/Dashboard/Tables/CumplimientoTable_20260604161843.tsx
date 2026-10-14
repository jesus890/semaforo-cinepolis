import { useMemo } from "react";

import type { CumplimientoEstado } from "../../../types/dashboard.types";

interface Props {
    rows: CumplimientoEstado[];
}

export default function CumplimientoTable({ rows }: Props) {

    const totals = useMemo(() => {

        return rows.reduce((acc, item) => ({
            totalRegistros: acc.totalRegistros + item.totalRegistros,
            totalDesaparecidos: acc.totalDesaparecidos + item.totalDesaparecidos,
            totalLocalizados: acc.totalLocalizados + item.totalLocalizados,
            totalConAlerta: acc.totalConAlerta + item.totalConAlerta,
            totalAlertaLoc: acc.totalAlertaLoc + item.totalAlertaLoc,
            totalAlertaDes: acc.totalAlertaDes + item.totalAlertaDes,
            totalSinAlerta: acc.totalSinAlerta + item.totalSinAlerta,
            totalSinAlertaLoc: acc.totalSinAlertaLoc + item.totalSinAlertaLoc,
            totalSinAlertaDes: acc.totalSinAlertaDes + item.totalSinAlertaDes,
            totalArt108: acc.totalArt108 + item.totalArt108,
            totalFaltaDato: acc.totalFaltaDato + item.totalFaltaDato,
        }),
            {
                totalRegistros: 0,
                totalDesaparecidos: 0,
                totalLocalizados: 0,
                totalConAlerta: 0,
                totalAlertaLoc: 0,
                totalAlertaDes: 0,
                totalSinAlerta: 0,
                totalSinAlertaLoc: 0,
                totalSinAlertaDes: 0,
                totalArt108: 0,
                totalFaltaDato: 0,
            }
        );

    }, [rows]);

    const getCumplimientoColor = (value: number) => {
        if (value >= 90)
            return "bg-emerald-500";

        if (value >= 70)
            return "bg-amber-500";

        return "bg-red-500";
    };

    if (!rows.length) {
        return (
            <div className="flex h-64 items-center justify-center rounded-3xl border border-slate-200 bg-white">
                <span className="text-slate-500">
                    No hay información disponible
                </span>
            </div>
        );
    }

    return (
        <div className="overflow-auto rounded-3xl border border-slate-200 bg-white shadow-sm">

            <table className="min-w-[1700px] w-full">

                <thead>

                    <tr className="bg-[#611232] text-white">

                        <th className="sticky left-0 z-20 bg-[#611232] px-4 py-3 text-left">
                            Estado
                        </th>

                        <th className="px-4 py-3">
                            Registros
                        </th>

                        <th className="px-4 py-3">
                            Desaparecidos
                        </th>

                        <th className="px-4 py-3">
                            Localizados
                        </th>

                        <th className="px-4 py-3">
                            Con Alerta
                        </th>

                        <th className="px-4 py-3">
                            Alerta Loc.
                        </th>

                        <th className="px-4 py-3">
                            Alerta Des.
                        </th>

                        <th className="px-4 py-3">
                            Sin Alerta
                        </th>

                        <th className="px-4 py-3">
                            Sin Alerta Loc.
                        </th>

                        <th className="px-4 py-3">
                            Sin Alerta Des.
                        </th>

                        <th className="px-4 py-3">
                            Art.108
                        </th>

                        <th className="px-4 py-3">
                            Falta Dato
                        </th>

                        <th className="px-4 py-3">
                            Cumplimiento
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {rows.map((row) => (

                        <tr
                            key={row.estado}
                            className="
                                border-b
                                border-slate-100
                                hover:bg-slate-50
                                transition-colors
                            "
                        >

                            <td
                                className="
                                    sticky
                                    left-0
                                    bg-white
                                    px-4
                                    py-3
                                    font-semibold
                                    text-slate-700
                                "
                            >
                                {row.estado}
                            </td>

                            <td className="text-center">
                                {row.totalRegistros}
                            </td>

                            <td className="text-center">
                                {row.totalDesaparecidos}
                            </td>

                            <td className="text-center">
                                {row.totalLocalizados}
                            </td>

                            <td className="text-center">
                                {row.totalConAlerta}
                            </td>

                            <td className="text-center">
                                {row.totalAlertaLoc}
                            </td>

                            <td className="text-center">
                                {row.totalAlertaDes}
                            </td>

                            <td className="text-center">
                                {row.totalSinAlerta}
                            </td>

                            <td className="text-center">
                                {row.totalSinAlertaLoc}
                            </td>

                            <td className="text-center">
                                {row.totalSinAlertaDes}
                            </td>

                            <td className="text-center">
                                {row.totalArt108}
                            </td>

                            <td className="text-center">
                                {row.totalFaltaDato}
                            </td>

                            <td className="px-4 py-3">

                                <div className="flex items-center gap-3">

                                    <div className="h-2 flex-1 rounded-full bg-slate-200">

                                        <div
                                            className={`
                                                h-2
                                                rounded-full
                                                ${getCumplimientoColor(
                                                row.cumplimiento
                                            )}
                                            `}
                                            style={{
                                                width:
                                                    `${row.cumplimiento}%`
                                            }}
                                        />

                                    </div>

                                    <span className="w-12 text-right font-semibold">
                                        {row.cumplimiento.toFixed(0)}%
                                    </span>

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

                <tfoot>

                    <tr className="bg-slate-900 text-white font-bold">

                        <td className="px-4 py-3">
                            TOTAL
                        </td>

                        <td className="text-center">
                            {totals.totalRegistros}
                        </td>

                        <td className="text-center">
                            {totals.totalDesaparecidos}
                        </td>

                        <td className="text-center">
                            {totals.totalLocalizados}
                        </td>

                        <td className="text-center">
                            {totals.totalConAlerta}
                        </td>

                        <td className="text-center">
                            {totals.totalAlertaLoc}
                        </td>

                        <td className="text-center">
                            {totals.totalAlertaDes}
                        </td>

                        <td className="text-center">
                            {totals.totalSinAlerta}
                        </td>

                        <td className="text-center">
                            {totals.totalSinAlertaLoc}
                        </td>

                        <td className="text-center">
                            {totals.totalSinAlertaDes}
                        </td>

                        <td className="text-center">
                            {totals.totalArt108}
                        </td>

                        <td className="text-center">
                            {totals.totalFaltaDato}
                        </td>

                        <td />
                    </tr>

                </tfoot>

            </table>

        </div>
    );
}