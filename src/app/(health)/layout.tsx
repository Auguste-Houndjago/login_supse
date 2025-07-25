import React from 'react'

interface layoutProps {
    children: React.ReactNode
}

export default function layout({children}: layoutProps) {
  return (
    <div className='h-full flex flex-col w-full'>

        {children}
        
    </div>
  )
}
