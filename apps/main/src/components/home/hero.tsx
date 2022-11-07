import Link from 'next/link'

import Image from 'next/image'
export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none">
        <div className="animate-blob absolute top-4 left-[12rem] z-0 h-72 w-72 rounded-full bg-purple-500 opacity-80 blur-xl filter dark:mix-blend-lighten"></div>
        <div className="animate-blob animation-delay-2000 absolute bottom-[8rem] left-[5rem] z-0 h-72 w-72 rounded-full bg-blue-400 opacity-80 blur-xl filter dark:bg-blue-600 dark:mix-blend-lighten"></div>
        <div className="animate-blob animation-delay-4000 absolute bottom-10 left-[15rem] z-0 h-72 w-72 rounded-full bg-rose-400 opacity-70 blur-xl filter dark:bg-rose-500 dark:mix-blend-lighten"></div>
      </div>
      <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        {/* px-4 sm:px-6 lg:px-8  */}
        <div className="relative mx-auto max-w-7xl sm:static">
          <div className="relative z-10 sm:max-w-lg">
            <h1 className="font text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50  sm:text-6xl">
              The new creative economy.
            </h1>
            <p className="mt-4 text-xl tracking-tight text-slate-900 dark:text-slate-50">
              Create, explore, & collect digital art NFT.
            </p>
          </div>
          <div>
            <div className="mt-10">
              <Link
                href="/collections"
                className="relative z-10 inline-block rounded-md border border-transparent bg-blue-600 py-3 px-8 text-center font-medium text-white hover:bg-blue-700"
              >
                See Collections
              </Link>
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="relative h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <Image
                          src="/images/card-pic-1.jpeg"
                          loading="eager"
                          alt={'Card 1'}
                          // layout="fill"
                          width={440}
                          height={640}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      {/* backdrop-blur */}
                      <div className="relative h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                          src="/images/card-pic-2.jpeg"
                          loading="eager"
                          alt={'Card 2'}
                          // layout="fill"
                          width={440}
                          height={640}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="relative h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                          src="/images/card-pic-3.jpeg"
                          loading="eager"
                          alt={'Card 2'}
                          // layout="fill"
                          width={440}
                          height={640}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="relative h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                          src="/images/card-pic-4.jpeg"
                          loading="eager"
                          alt={'Card 4'}
                          // layout="fill"
                          width={440}
                          height={640}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="relative h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                          src="/images/card-pic-5.jpeg"
                          loading="eager"
                          alt={'Card 2'}
                          // layout="fill"
                          width={440}
                          height={640}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="relative h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                          src="/images/card-pic-6.jpeg"
                          loading="eager"
                          alt={'Card 1'}
                          // layout="fill"
                          width={440}
                          height={640}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="relative h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                          src="/images/card-pic-7.jpeg"
                          loading="eager"
                          alt={'Card 2'}
                          // layout="fill"
                          width={440}
                          height={640}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
