import type { Metadata } from 'next'
import { allHelp } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import PostDate from '@/components/post-date'
import Sidebar from './help-sidebar'
import { HelpMdx } from '@/components/mdx/help-mdx'

export async function generateStaticParams() {
  return allHelp.map((help) => ({
    slug: help.slug,
  }))
}

export async function generateMetadata({ params }: {
  params: { slug: string }
}): Promise<Metadata | undefined> {

  const help = allHelp.find((help) => help.slug === params.slug)

  if (!help) return

  const { title, summary: description } = help

  return {
    title,
    description,
  }
}

export default async function SingleHelp({ params }: {
  params: { slug: string }
}) {

  const help = allHelp.find((help) => help.slug === params.slug)
  
  if (!help) notFound()

  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
      <div className="pt-32 pb-12 md:pt-40 md:pb-20">
        <div className="flex flex-col md:flex-row">

          <main className="md:flex-auto md:pl-10 order-1" data-aos="fade-up">
            <div className="mb-8">
              <h2 className="h2 mb-4">{help.title}</h2>
              <p className="text-gray-400">Last updated - <span className="text-purple-600"><PostDate dateString={help.updatedAt} /></span></p>
            </div>            
            <HelpMdx code={help.body.code} />
          </main>

          {/* Nav sidebar */}
          <Sidebar />         

        </div>
      </div>
    </div>
  )
}