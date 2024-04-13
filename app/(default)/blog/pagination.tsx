import Link from 'next/link'

export default function Pagination() {
  return (
    <nav className="flex justify-center pt-16" role="navigation" aria-label="Pagination Navigation">
      <ul className="inline-flex flex-wrap font-medium text-sm -m-1">
        <li className="m-1">
          <span className="inline-flex h-10 min-w-10 justify-center items-center bg-gray-800 px-4 rounded-full text-gray-500">Prev</span>
        </li>
        <li className="m-1">
          <Link href="#" className="inline-flex h-10 min-w-10 justify-center items-center bg-gray-800 px-2 rounded-full text-gray-300 hover:bg-purple-600 transition-colors duration-150 ease-in-out">1</Link>
        </li>
        <li className="m-1">
          <Link href="#" className="inline-flex h-10 min-w-10 justify-center items-center bg-gray-800 px-2 rounded-full text-gray-300 hover:bg-purple-600 transition-colors duration-150 ease-in-out">2</Link>
        </li>
        <li className="m-1">
          <Link href="#" className="inline-flex h-10 min-w-10 justify-center items-center bg-gray-800 px-2 rounded-full text-gray-300 hover:bg-purple-600 transition-colors duration-150 ease-in-out">3</Link>
        </li>
        <li className="m-1">
          <span className="inline-flex h-10 min-w-10 justify-center items-center bg-gray-800 px-2 rounded-full text-gray-500">...</span>
        </li>
        <li className="m-1">
          <Link href="#" className="inline-flex h-10 min-w-10 justify-center items-center bg-gray-800 px-2 rounded-full text-gray-300 hover:bg-purple-600 transition-colors duration-150 ease-in-out">12</Link>
        </li>
        <li className="m-1">
          <Link href="#" className="inline-flex h-10 min-w-10 justify-center items-center bg-gray-800 px-4 rounded-full text-gray-300 hover:bg-purple-600 transition-colors duration-150 ease-in-out">Next</Link>
        </li>
      </ul>
    </nav>
  )
}
