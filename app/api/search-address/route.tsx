import React from 'react'
import { NextResponse } from 'next/server'

export async function GET (request:any){
    return NextResponse.json({data:'Test'})
}

const route = () => {
  return (
    <div>route</div>
  )
}

export default route
