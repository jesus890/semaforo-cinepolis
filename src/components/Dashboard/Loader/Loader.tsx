import imageCNB from "../../../assets/CNB.png";

interface LoaderProps {
    text?: string;
}

export default function LoaderStyled({text = "Cargando información..."}: LoaderProps) {
    return (
        <div
            className="w-full h-full min-h-[320px] flex flex-col justify-center items-center gap-6 px-6 py-10"
        >
            <div className="relative flex items-center justify-center">
                <div
                    className="absolute w-32 h-32 rounded-full bg-[#00AFAA]/20 blur-3xl animate-pulse"
                />

                <div
                    className="absolute w-28 h-28 rounded-full border-[5px] border-[#00AFAA]/20 border-t-[#00AFAA] animate-spin"
                />

                <div
                    className="relative w-20 h-20 rounded-full overflow-hidden bg-white shadow-2xl border-4 border-white animate-pulse"
                >
                    <img
                        src={imageCNB}
                        alt="Loader"
                        className="object-cover"
                    />
                </div>
            </div>

            <div className="text-center space-y-2">
                <h3
                    className="text-lg sm:text-xl font-black text-[#4A0015] tracking-wide"
                >
                    {text}
                </h3>

                <p
                    className="text-sm text-slate-500 max-w-md leading-relaxed"
                >
                    Espere un momento mientras se procesa y
                    visualiza la información solicitada.
                </p>
            </div>
        </div>
    );
}