'use client'

import useAccessor from "@/app/redux/useAccessor"
import Gate from '@/app/redux/gate'
export default function Home() {
    const [session, sessionData, data] = useAccessor()
    return (
        <div>
            <Gate>
                <div>Current session is named: {session}</div>
                <div>All sessions are: {Object.keys(data).join(", ")}</div>
                <div>
                    {JSON.stringify(sessionData)}
                </div>
            </Gate>
        </div>
    )
}
