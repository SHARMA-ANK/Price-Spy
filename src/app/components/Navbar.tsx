"use client";
import { headers } from 'next/headers'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const navIcons=[
    {src:'/assets/icons/search.svg',alt:'Search Icon'},
    {src:'/assets/icons/black-heart.svg',alt:'Heart Icon'},
    {src:'/assets/icons/user.svg',alt:'User Icon'},
];
const Navbar = () => {
  return (
    <header className='w-full'>
        <nav className='nav'>
            <Link href="/" className="flex items-center gap-1">
            <Image src="/assets/icons/logo.svg"
            alt="Price Spy Logo"
            width={27}
            height={27}
            />
<p className='nav-logo'>
                Price <span className='text-primary'>Spy</span>
            </p>
            </Link>

            <div className='flex items-center gap-5' >
                {navIcons.map((icon) => {
                    return (
                        <Image
                            key={icon.alt}
                            src={icon.src}
                            alt={icon.alt}
                            width={20}
                            height={20}
                            className='object-contain'
                        />
                    );
                })}
            </div>
            
        </nav>
    </header>
  )
}

export default Navbar