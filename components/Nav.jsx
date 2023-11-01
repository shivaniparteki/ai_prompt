import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import logo from "../assets/images/logo.svg";

const Nav = () => {
  const { data: session } = useSession();

  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);
  const [providers, setProviders] = useState(null)

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()
      console.log('Session:', session)
      console.log('Providers:', providers)
      console.log("response")
      console.log(response)

      setProviders(response)
    }

    setUpProviders();

  }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3 px-12' >
      <Link href={"/"} className='flex gap-2 flex-center'>
        <Image
          src={logo}
          alt='promptopia logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* Mobile Navigation */}
      <div className="sm:flex hidden">
        {
          session?.user ? (
            <>
              <div className="flex gap-3 md:gap-5">
                <Link href={"/create-prompt"} className='black_btn'> Create Post </Link>

                <button type='button' onClick={() => signOut(session?.user)} className='outline_btn'>
                  Sign out
                </button>

                <Link href="/profile">
                  <Image src={session?.user?.image} alt='profile' width={37} height={37} className='rounded-full' />
                </Link>
              </div>
            </>
          ) : (
            <>
              {
                providers && Object.values(providers).map((provider) => {
                  return (
                    <button type='button'
                      key={provider?.name}
                      onClick={() => signIn(provider.id)}
                      className='black_btn'
                    >
                      Sign In
                    </button>
                  )
                })
              }
            </>
          )
        }
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {
          session?.user ? (
            <>
              <div className="flex">
                <Image
                  src={session?.user?.image}
                  alt='profile'
                  width={37}
                  height={37}
                  className='rounded-full'
                  onClick={() => { setToggleMobileMenu((prev) => !prev) }}
                />

                {
                  toggleMobileMenu && (
                    <div className="dropdown border">
                      <Link
                        href="/profile"
                        className='dropdown_link'
                        onClick={() => setToggleMobileMenu(false)}>My Profile
                      </Link>
                      <Link
                        href="/create-prompt"
                        className='dropdown_link'
                        onClick={() => setToggleMobileMenu(false)}>Create Prompt
                      </Link>
                      <button
                        type='button'
                        onClick={() => {
                          setToggleMobileMenu(false)
                          // signOut();
                        }}
                        className='black_btn mt-5 w-full'
                      >
                        Sign Out
                      </button>
                    </div>
                  )
                }
              </div>
            </>
          ) : (
            <>
              {
                providers && Object.values(providers).map((provider) => {
                  return (
                    <button type='button'
                      key={provider?.name}
                      onClick={() => signIn(provider.id)}
                      className='black-btn'
                    >
                      Sign In
                    </button>
                  )
                })
              }
            </>
          )
        }
      </div>
    </nav >
  )
}

export default Nav