import Header from '../components/layouts/header'
import Footer from '../components/layouts/footer'
import Meta from '../components/layouts/meta'

// import Head from 'next/head';
import Link from 'next/link';
import {
  PencilIcon,
  PhotographIcon,
  GlobeAltIcon,
  FlagIcon,
  ShareIcon,
} from '@heroicons/react/outline';


import img from '../img/bg-profile.jpeg';
type Props = {
  children: React.ReactNode,
  title: string,
  description: string
}

const ProfileLayout = ({ children, title, description }: Props) => {
  const navigation = [
    { name: 'Dashboard', href: '/profile', current: true },
    { name: 'Team', href: '/profile/pages2', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
    { name: 'Reports', href: '#', current: false },
  ]
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  return (
    <>
      <Meta title={title} description={description} />
      <div className="relative">
        <Header />
        <div className="w-full relative">
          <img src={img.src} className="h-96 object-cover w-full" alt=""/>
          <div className="flex absolute bottom-0 right-0 z-1 mb-6">
            <div className="max-w-7xl px-4 sm:px-6 mx-auto flex gap-3">
              <button className="rounded-full text-white border py-2 px-4 flex gap-4 items-center">
                <span>Edit profile</span>
                <PencilIcon className="w-5" />
              </button>
              <button className="rounded-full text-white border py-2 px-4 flex gap-4 items-center">
                <span>Edit cover photo</span>
                <PhotographIcon className="w-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl px-4 sm:px-6 mx-auto">
          <div className="grid grid-cols-6 gap-8">
            <div className="col-span-6 md:col-span-2 text-center">
              <div className="bg-white rounded-xl flex flex-col items-center -mt-28 relative z-10 p-8 border border-slate-300 mb-10">
                <img
                  className="inline-block h-40 w-40 rounded-full ring-2 ring-white mb-5"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <div className="text-2xl font-medium">Enrico Cole</div>
                <div className="text-xl font-medium text-slate-500 mb-8">0xc4c16a645...b21a</div>
                <div className="text-md font-medium text-slate-500 mb-8">A wholesome farm owner in Montana. Upcoming gallery solo show in Germany</div>
                <div className="mb-9 flex items-center gap-1">
                  <GlobeAltIcon className="w-5" />
                  <Link  href="https://bkb.ner">
                    <a className="text-md font-medium text-slate-800">https://bkb.ner</a>
                  </Link>
                </div>
                <div className="flex gap-3 mb-8">
                  <button className="border text-slate-500 bg-white p-2 rounded-3xl text-xl hover:bg-indigo-700 hover:text-white">Unfollow</button>
                  <button className="border-0 text-white bg-indigo-700 p-2 rounded-3xl text-xl">Follow</button>
                  <button className="text-slate-500 rounded-full border w-12 h-12 flex hover:bg-indigo-700 hover:text-white">
                    <ShareIcon className="w-5 m-auto" />
                  </button>
                  <button className="text-slate-500 rounded-full border w-12 h-12 flex hover:bg-indigo-700 hover:text-white">
                    <FlagIcon className="w-5 m-auto" />
                  </button>
                </div>
                <div className="text-slate-500 border-t pt-5">
                  Members since Mar 15, 2012
                </div>
              </div>
            </div>
            <main className="col-span-6 md:col-span-4">
              <nav className="my-8">
                <ul className="flex items-baseline space-x-4">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href}>
                        <a
                          className={classNames(
                            item.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-500 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-2xl text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div>{ children }</div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default ProfileLayout