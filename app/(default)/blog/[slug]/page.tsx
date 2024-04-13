import type { Metadata } from 'next'
import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import PostDate from '@/components/post-date'
import PostTags from '@/components/post-tags'
import { PostMdx } from '@/components/mdx/post-mdx'

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: {
  params: { slug: string }
}): Promise<Metadata | undefined> {

  const post = allPosts.find((post) => post.slug === params.slug)

  if (!post) return

  const { title, summary: description } = post

  return {
    title,
    description,
  }
}

export default async function SinglePost({ params }: {
  params: { slug: string }
}) {

  const post = allPosts.find((post) => post.slug === params.slug)

  if (!post) notFound()

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-3xl mx-auto">

            <article>

              <header className="mb-8">
                {/* Title and excerpt */}
                <div className="text-center md:text-left">
                  <h1 className="h1 mb-4" data-aos="fade-up">{post.title}</h1>
                  <p className="text-xl text-gray-400" data-aos="fade-up" data-aos-delay="200">{post.summary}</p>
                </div>
                {/* Article meta */}
                <div className="md:flex md:items-center md:justify-between mt-3">
                  {/* Author meta */}
                  <div className="flex items-center justify-center" data-aos="fade-up" data-aos-delay="400">
                    <Link href="#">
                      <Image className="rounded-full shrink-0 mr-4" src={post.authorImg} width={40} height={40} alt={post.author} />
                    </Link>
                    <div>
                      <Link href="#" className="font-medium text-gray-200 hover:text-gray-100 transition duration-150 ease-in-out">{post.author}</Link>
                      <span className="text-gray-700"> - </span>
                      <span className="text-gray-500"><PostDate dateString={post.publishedAt} /></span>
                    </div>
                  </div>
                  {/* Article tags */}
                  {post.tags &&
                    <div className="flex justify-center mt-4 md:mt-0" data-aos="fade-up" data-aos-delay="600">
                      <PostTags tags={post.tags} />
                    </div>
                  }
                </div>
              </header>

              {/* Article image */}
              {post.image &&
                <figure className="mb-8 lg:-ml-32 lg:-mr-32" data-aos="fade-up" data-aos-delay="600">
                  <Image className="w-full" src={post.image} width={1024} height={576} alt={post.title} priority />
                </figure>
              }

              {/* Article content */}
              <PostMdx code={post.body.code} />

              {/* Article footer */}
              <footer>
                <div className="md:flex md:items-center md:justify-between text-center md:text-left">
                  <div className="text-lg text-gray-400 italic">Originally published at <Link href="https://cruip.com/" className="text-gray-200">https://cruip.com/</Link>.</div>
                  <ul className="inline-flex mt-4 md:ml-4 md:mb-0">
                    <li>
                      <Link href="#" className="flex justify-center items-center text-purple-600 bg-gray-800 hover:text-gray-100 hover:bg-purple-600 rounded-full transition duration-150 ease-in-out">
                        <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                          <path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875 11.232h1.36l-8.778-11.232Z" />
                        </svg>
                      </Link>
                    </li>
                    <li className="ml-4">
                      <Link href="#" className="flex justify-center items-center text-purple-600 bg-gray-800 hover:text-gray-100 hover:bg-purple-600 rounded-full transition duration-150 ease-in-out">
                        <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z" />
                        </svg>
                      </Link>
                    </li>
                    <li className="ml-4">
                      <Link href="#" className="flex justify-center items-center text-purple-600 bg-gray-800 hover:text-gray-100 hover:bg-purple-600 rounded-full transition duration-150 ease-in-out">
                        <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                          <path d="M23.3 8H8.7c-.4 0-.7.3-.7.7v14.7c0 .3.3.6.7.6h14.7c.4 0 .7-.3.7-.7V8.7c-.1-.4-.4-.7-.8-.7zM12.7 21.6h-2.3V14h2.4v7.6h-.1zM11.6 13c-.8 0-1.4-.7-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4-.1.7-.7 1.4-1.4 1.4zm10 8.6h-2.4v-3.7c0-.9 0-2-1.2-2s-1.4 1-1.4 2v3.8h-2.4V14h2.3v1c.3-.6 1.1-1.2 2.2-1.2 2.4 0 2.8 1.6 2.8 3.6v4.2h.1z" />
                        </svg>
                      </Link>
                    </li>
                  </ul>
                </div>
              </footer>
            </article>

          </div>

        </div>
      </div>
    </section>    
  )
}