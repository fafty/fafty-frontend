import MainLayout from "../layouts/main"

export default function Test() {
  return (
    <MainLayout title={""} description={""}>
      <div className="grid sm:grid-cols-1 md:grid-cols-[1fr,350px] lg:grid-cols-[1fr,400px] grid-rows-3 gap-y-16 sm:gap-x-2 md:gap-x-4 lg:gap-x-8 xl:gap-x-10 2xl:gap-x-13  py-24 px-4">
        <div className="row-start-1 row-span-2 lg:mr-10">
          <div className="bg-gray-200 flex rounded-2xl overflow-hidden w-full h-full">
            <div className="inline-flex items-center justify-center bg-gray-200">
              <div className="flex items-center justify-center bg-gray-50"/>
            </div>
            <div className="absolute ml-5 mt-5">
              <div className=" inline-flex space-x-2 items-start justify-start">
                <div className="flex items-center justify-center px-2 pt-2 pb-1.5 bg-gray-800 rounded">
                  <p className="text-xs font-bold leading-3 text-gray-50 uppercase">Art</p>
                </div>
                <div className="flex items-center justify-center px-2 pt-2 pb-1.5 bg-purple-500 rounded">
                  <p className="text-xs font-bold leading-3 text-gray-50 uppercase">unlockable</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row-start-1 row-end-4">
          <div className="grid grid-cols-1 gap-y-10">
            <div className="flex flex-col space-y-2 items-start justify-center w-full">
              <p className="w-full text-4xl font-bold leading-10 text-slate-900 dark:text-slate-50">The amazing art</p>
              <div className="inline-flex space-x-2 items-center justify-start">
                <div className="flex items-center justify-center px-2 pt-2 pb-1.5 border-2 rounded border-green-500">
                  <p className="text-base font-bold leading-none text-green-500">2.5 ETH</p>
                </div>
                <div className="flex items-center justify-center px-2 pt-2 pb-1.5 border-2 rounded border-gray-200">
                  <p className="text-base font-bold leading-none text-gray-500">$4,429.87</p>
                </div>
                <p className="text-base font-bold leading-none text-gray-500">10 in stock</p>
              </div>
            </div>
            <div>
              <p className="text-base leading-normal text-slate-900 dark:text-slate-50">This NFT Card will give you Access to Special Airdrops. To learn more about UI8 please visit https://ui8.net</p>
            </div>
            <div className="flex flex-col space-y-8 items-start justify-start w-full h-52">
              <div className="flex flex-col items-start justify-start w-full p-1.5 border-2 rounded-full border-gray-200">
                <div className="inline-flex space-x-2 items-start justify-start w-96">
                  <div className="flex items-center justify-center px-3 py-1.5 bg-gray-700 rounded-full">
                    <p className="text-sm font-bold leading-none text-gray-50">Info</p>
                  </div>
                  <div className="flex items-center justify-center px-3 py-1.5 rounded-full">
                    <p className="text-sm font-bold leading-none text-gray-500">Owners</p>
                  </div>
                  <div className="flex items-center justify-center px-3 py-1.5 rounded-full">
                    <p className="text-sm font-bold leading-none text-gray-500">History</p>
                  </div>
                  <div className="flex items-center justify-center px-3 py-1.5 rounded-full">
                    <p className="text-sm font-bold leading-none text-gray-500">Bids</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-4 items-start justify-start w-full">
                <div className="flex flex-col space-y-4 items-start justify-start w-full">
                  <div className="inline-flex space-x-4 items-center justify-start">
                    <div className="relative" style={{ width: 48, height: 48, }}>
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500 rounded-full">
                        <img className="w-12 h-full" src="https://via.placeholder.com/49.339351654052734x74" />
                      </div>
                      <div className="inline-flex items-center justify-center w-6 h-6 p-1.5 absolute right-0 bottom-0">
                        <div className="flex-1 h-full rounded-full">
                          <img className="flex-1 h-full rounded-full" src="https://via.placeholder.com/12x12" />
                        </div>
                      </div>
                    </div>
                    <div className="inline-flex flex-col space-y-0.5 items-start justify-start">
                      <p className="text-sm leading-normal text-gray-500">Owner</p>
                      <div className="inline-flex space-x-1 items-start justify-start">
                        <p className="text-sm font-medium leading-normal text-gray-800">Raquel</p>
                        <p className="text-sm font-medium leading-normal text-gray-800">Will</p>
                      </div>
                    </div>
                  </div>
                  <img className="w-full h-0.5 rounded-full" src="https://via.placeholder.com/384x1" />
                </div>
                <div className="flex flex-col space-y-4 items-start justify-start w-full">
                  <div className="inline-flex space-x-4 items-center justify-start">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full">
                      <img className="flex-1 h-full" src="https://via.placeholder.com/48x71.9912109375" />
                    </div>
                    <div className="inline-flex flex-col space-y-0.5 items-start justify-start">
                      <p className="text-sm leading-normal text-gray-500">Creator</p>
                      <div className="inline-flex space-x-1 items-start justify-start">
                        <p className="text-sm font-medium leading-normal text-gray-800">Selina</p>
                        <p className="text-sm font-medium leading-normal text-gray-800">Mayert</p>
                      </div>
                    </div>
                  </div>
                  <img className="w-full h-0.5 rounded-full" src="https://via.placeholder.com/384x1" />
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-8 items-start justify-center w-full p-6 bg-gray-50 shadow border rounded-2xl border-gray-200">
              <div className="flex flex-col items-start justify-start w-full">
                <div className="inline-flex space-x-4 items-center justify-start transform -rotate-180">
                  <div className="inline-flex flex-col items-start justify-start transform -rotate-180">
                    <div className="inline-flex space-x-2 items-start justify-start">
                      <p className="text-base font-medium leading-normal text-gray-500">Highest bid by</p>
                      <div className="flex space-x-1 items-start justify-start">
                        <p className="text-base font-medium leading-normal text-gray-800">Kohaku</p>
                        <p className="text-base font-medium leading-normal text-gray-800">Tora</p>
                      </div>
                    </div>
                    <div className="inline-flex space-x-3 items-start justify-start">
                      <p className="text-2xl font-semibold leading-loose text-gray-800">1.46 ETH</p>
                      <p className="text-2xl font-semibold leading-loose text-gray-500">$2,764.89</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center transform -rotate-180 w-1/6 h-12 bg-green-500 rounded-full">
                    <img className="flex-1 h-full" src="https://via.placeholder.com/48x71.9912109375" />
                  </div>
                </div>
              </div>
              <div className="inline-flex space-x-2 items-start justify-start w-full">
                <div className="flex items-center justify-center flex-1 px-6 py-4 bg-blue-500 rounded-full">
                  <p className="text-base font-bold leading-none text-center text-gray-50">Purchase now</p>
                </div>
                <div className="flex items-center justify-center flex-1 px-6 py-4 border-2 rounded-full border-gray-200">
                  <p className="text-base font-bold leading-none text-center text-gray-800">Place a bid</p>
                </div>
              </div>
              <div className="inline-flex space-x-3 items-center justify-start w-full">
                <p className="text-sm font-medium leading-normal text-gray-500">Service fee</p>
                <p className="text-sm font-medium leading-normal text-gray-800">1.5%</p>
                <p className="text-sm leading-normal text-gray-500">2.563 ETH</p>
                <p className="text-sm leading-normal text-gray-500">$4,540.62</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}