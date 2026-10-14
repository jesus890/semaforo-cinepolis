interface Props {
    title: string;
    value: number;
}

export default function KPICard({ title, value, }: Props) {
    return (
        <div
            className="
                bg-white
                rounded-2xl
                p-6
                shadow-sm
                border
                border-gray-100
                hover:shadow-md
                transition-all
            "
        >
            <p className="text-sm text-gray-500 mb-2">
                {title}
            </p>

            <h2 className="text-4xl font-bold text-[#611232]">
                {value.toLocaleString()}
            </h2>
        </div>
    );
}