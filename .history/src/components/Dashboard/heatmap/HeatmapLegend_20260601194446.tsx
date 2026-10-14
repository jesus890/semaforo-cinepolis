export default function HeatmapLegend() {

    const levels = [
        "#F3F4F6",
        "#D1FAE5",
        "#6EE7B7",
        "#00AFAA",
        "#611232",
    ];

    return (
        <div className="flex items-center gap-3">

            <span className="text-xs text-gray-500">
                Menor intensidad
            </span>

            <div className="flex items-center gap-1">

                {levels.map((color) => (

                    <div
                        key={color}
                        className="h-4 w-4 rounded"
                        style={{
                            backgroundColor: color,
                        }}
                    />
                ))}

            </div>

            <span className="text-xs text-gray-500">
                Mayor intensidad
            </span>

        </div>
    );
}