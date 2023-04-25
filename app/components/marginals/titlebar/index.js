'use client';
import Gate from "@redux/gate"

export default function Titlebar() {
    return (
        <div className="titlebar">
            Hi, I'm your local neighborhood titlebar
            <Gate>You shouldn't see me until I'm all loaded</Gate>
        </div>
    )
}