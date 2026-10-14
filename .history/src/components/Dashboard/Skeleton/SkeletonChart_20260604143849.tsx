export default function ChartSkeleton() {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm animate-pulse">

            {/* Título */}
            <div className="mb-6">
                <div className="h-6 w-56 rounded-lg bg-slate-200" />
                <div className="mt-2 h-4 w-80 rounded-lg bg-slate-100" />
            </div>

            {/* Área de gráfica */}
            <div className="flex h-[320px] items-end justify-between gap-3">

                <div className="h-[45%] w-full rounded-t-xl bg-slate-200" />
                <div className="h-[70%] w-full rounded-t-xl bg-slate-300" />
                <div className="h-[55%] w-full rounded-t-xl bg-slate-200" />
                <div className="h-[85%] w-full rounded-t-xl bg-slate-300" />
                <div className="h-[65%] w-full rounded-t-xl bg-slate-200" />
                <div className="h-[40%] w-full rounded-t-xl bg-slate-300" />
                <div className="h-[75%] w-full rounded-t-xl bg-slate-200" />
                <div className="h-[90%] w-full rounded-t-xl bg-slate-300" />

            </div>

            {/* Leyenda */}
            <div className="mt-6 flex justify-center gap-8">

                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-slate-200" />
                    <div className="h-3 w-16 rounded bg-slate-200" />
                </div>

                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-slate-200" />
                    <div className="h-3 w-20 rounded bg-slate-200" />
                </div>

                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-slate-200" />
                    <div className="h-3 w-14 rounded bg-slate-200" />
                </div>

            </div>

        </div>
    );
}