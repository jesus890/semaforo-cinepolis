import { ArrowLeft } from "lucide-react";

interface Props {
    onClick: () => void;
}

export default function BackButton({
    onClick,
}: Props) {

    return (
        <button
            onClick={onClick}
            className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-gray-200
                bg-white
                px-4
                py-2
                text-sm
                font-medium
                text-gray-700
                shadow-sm
                transition-all
                hover:border-[#611232]
                hover:text-[#611232]
            "
        >

            <ArrowLeft size={18} />

            Volver a estados

        </button>
    );
}