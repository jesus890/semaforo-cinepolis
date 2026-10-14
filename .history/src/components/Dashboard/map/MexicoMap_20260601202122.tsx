"use client";

import { useEffect, useRef } from "react";

import maplibregl from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";

interface Props {
    data: any[];
}

export default function MexicoMap({
    data,
}: Props) {

    const map =
        useRef<maplibregl.Map | null>(
            null
        );

    const mapContainer =
        useRef<HTMLDivElement>(null);

    useEffect(() => {

        if (
            map.current ||
            !mapContainer.current
        ) {
            return;
        }

        map.current =
            new maplibregl.Map({

                container:
                    mapContainer.current,

                style:
                    `https://api.maptiler.com/maps/streets/style.json?key=${import.meta.env.VITE_MAPTILER_KEY}`,

                center: [
                    -102,
                    23,
                ],

                zoom: 4.4,
            });

        map.current.addControl(
            new maplibregl.NavigationControl(),
            "top-right"
        );

    }, []);

    return (

        <div
            ref={mapContainer}
            className="
                h-[650px]
                w-full
                rounded-3xl
            "
        />
    );
}