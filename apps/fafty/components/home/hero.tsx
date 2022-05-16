import Image from 'next/image'
export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font font-extrabold tracking-tight text-slate-900  dark:text-slate-50  sm:text-6xl">
              The new creative economy.
            </h1>
            <p className="mt-4 text-xl text-slate-900 tracking-tight dark:text-slate-50">
              Create, explore, & collect digital art NFTs.
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="relative w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100">
                        {/* <img
                          src="/assets/shared/ui/images/card-pic-1.jpeg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        /> */}
                        <Image
                          src='/card-pic-1.jpeg'
                          loading="eager"
                          alt={'Card 1'}
                          layout='fill'
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="relative backdrop-blur w-44 h-64 rounded-lg overflow-hidden">
                        {/* <img
                          src="/assets/shared/ui/images/card-pic-2.jpeg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        /> */}
                        <Image
                          src='/card-pic-1.jpeg'
                          loading="eager"
                          alt={'Card 2'}
                          layout='fill'
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="relative w-44 h-64 rounded-lg overflow-hidden">
                        {/* <img
                          src="/assets/shared/ui/images/card-pic-2.jpeg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        /> */}
                        <Image
                          src='/card-pic-2.jpeg'
                          loading="eager"
                          alt={'Card 2'}
                          layout='fill'
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="relative w-44 h-64 rounded-lg overflow-hidden">
                        {/* <img
                          src="/assets/shared/ui/images/card-pic-4.jpeg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        /> */}
                        <Image
                          src='/card-pic-4.jpeg'
                          loading="eager"
                          alt={'Card 4'}
                          layout='fill'
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="relative w-44 h-64 rounded-lg overflow-hidden">
                        {/* <img
                          src="/assets/shared/ui/images/card-pic-2.jpeg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        /> */}
                        <Image
                          src='/card-pic-2.jpeg'
                          loading="eager"
                          alt={'Card 2'}
                          layout='fill'
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="relative w-44 h-64 rounded-lg overflow-hidden">
                        {/* <img
                          src="/assets/shared/ui/images/card-pic-2.jpeg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        /> */}
                        <Image
                          src='/card-pic-2.jpeg'
                          loading="eager"
                          alt={'Card 1'}
                          layout='fill'
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="relative w-44 h-64 rounded-lg overflow-hidden">
                        {/* <img
                          src="/assets/shared/ui/images/card-pic-2.jpeg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        /> */}
                        <Image
                          src='/card-pic-2.jpeg'
                          loading="eager"
                          alt={'Card 2'}
                          layout='fill'
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a href="#" className="inline-block text-center bg-blue-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-blue-700">
                Shop Collection
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}