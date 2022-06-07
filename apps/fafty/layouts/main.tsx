import { Header, Footer, Meta } from '@fafty-frontend/shared/ui'
import {ReactNode} from "react";

type Props = {
  children: ReactNode,
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
