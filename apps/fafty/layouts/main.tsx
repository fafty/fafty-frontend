// import Header from '../components/layouts/header'
// import Footer from '../components/layouts/footer'
// import Meta from '../components/layouts/meta'
import { Header, Footer, Meta } from '@fafty-frontend/shared/ui'

type Props = {
  children: React.ReactNode,
  title: string,
  description: string
}

const MainLayout = ({ children, title, description }: Props) => {
  return (
    <>
      <Meta title={title} description={description} />
      <Header />
      <main className="relative container mx-auto px-8">{ children }</main>
      <Footer />
    </>
  )
}

export default MainLayout