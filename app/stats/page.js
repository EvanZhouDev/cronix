'use client'

import useData from "@redux/accessors/useSession"
import Gate from '@redux/gate'
export default function Home() {
    const [sessionData, session, data] = useData()
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
