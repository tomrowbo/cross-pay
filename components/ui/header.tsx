import Link from 'next/link'
import Dropdown from '@/components/utils/dropdown'
import MobileMenu from './mobile-menu'
import Logo from '@/public/images/logo.png'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link href="/" className="block" aria-label="Cruip">
            <Image src={Logo} width={64} height={64} alt="News 11" />
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop menu links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link href="/" className="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out">
                  About us
                </Link>
              </li>
              {/* 1st level: hover */}
              <Dropdown title="Support">
                {/* 2nd level: hover */}
                <li>
                  <Link href="/contact" className="font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight">
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link href="/help/frequently-asked-questions" className="font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight">
                    Help center
                  </Link>
                </li>
                <li>
                  <Link href="/404" className="font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight">
                    404
                  </Link>
                </li>
              </Dropdown>
            </ul>

            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link
                  href="/signin"
                  className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/signup" className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3">
                  Sign up
                </Link>
              </li>
            </ul>
          </nav>

          <MobileMenu />

        </div>
      </div>
    </header>
  )
}
