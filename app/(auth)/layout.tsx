import PageIllustration from '@/components/page-illustration'
import Header from '@/components/ui/header'


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  return (
    <main className="grow">

      <PageIllustration />
      <Header />

      {children}

    </main>
  )
}
