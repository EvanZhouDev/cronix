'use client'

import useData from '@app/redux/accessors/useSessionData'
import useStore from '@app/redux/accessors/useStore'
import Gate from '@redux/gate'
export default function Home() {
    const sessionData = useData()
    const store = useStore()
    return (
        <div>
            <Gate>
                <pre>
                    {JSON.stringify(sessionData, null, 2)}
                </pre>
            </Gate>
        </div>
    )
}
