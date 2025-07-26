import React from 'react'
import { AvatarsToolTip } from './AvatarsToolTip'

export default function PatientsRdv() {
  return (
    <div className='flex flex-col gap-4'>
        <div className='flex flex-col rounded-lg border gap-2'>
            <div className='border p-4'>
                <AvatarsToolTip/>
            </div>

            <div className='flex flex-1 min-h-48 flex-col items-center justify-center'>

            </div>
        </div>
    </div>
  )
}
