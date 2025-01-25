import React from 'react'
import UserMenu from '../components/userMenu'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <section className='bg-white'>
        <div className='container mx-auto p-3 grid lg:grid-cols-[250px,1fr] '>
            {/* Left for Menu */}
            <div className='py-4 sticky top-24 max-h-[calc(100vh-96px)] overflow-y-auto hidden lg:block border-r'>
                <UserMenu/>
            </div>

            {/* Right for <Menu */}
            <div className='bg-white min-h-[75vh]'>
                <Outlet/>
            </div>
        </div>
    </section>
  )
}

export default Dashboard
