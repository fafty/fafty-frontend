import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import Parallax from './parallax'

const Hero = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-full max-h-[calc(100vh_-_80px)] w-full overflow-hidden"
      >
        <div className="z-1 absolute inset-0 h-40 bg-gradient-to-b from-black/90"></div>
        <div className="z-1 absolute -inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#010d47]"></div>

        <div className="z-1 absolute inset-0 bg-gradient-to-t from-[#010d47] via-neutral-900/80 to-neutral-900/90" />
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 1.1 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ease: 'easeOut', duration: 1, delay: 0.3 }}
          className="absolute z-10 mt-[5rem] flex h-full w-full flex-col items-center justify-center"
        >
          <h1 className="font text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-8xl">
            The new creative economy.
          </h1>
          <p className=" mt-4 text-3xl tracking-tight text-slate-900 dark:text-slate-50">
            Create, explore, &amp; collect digital art NFT.
          </p>
          <div className="mt-5">
            <Link
              href="/collections"
              className="relative inline-block rounded-full border border-transparent bg-blue-600 py-4 px-8 text-center text-2xl font-medium text-white hover:bg-blue-700"
            >
              Explore
            </Link>
          </div>
        </motion.div>
        <Parallax />
      </motion.div>
    </AnimatePresence>
  )
}
export default Hero
