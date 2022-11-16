import { ReactNode, useRef } from 'react'
import Image from 'next/image'

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'framer-motion'
import { wrap } from '@motionone/utils'

interface ParallaxProps {
  children: ReactNode
  baseVelocity: number
}

function Column({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseY = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  })

  const y = useTransform(baseY, (v) => `${wrap(-20, -45, v)}%`)

  const directionFactor = useRef<number>(1)
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()

    baseY.set(baseY.get() + moveBy)
  })

  return (
    <div>
      <motion.div
        className="grid flex-shrink-0 grid-cols-1 gap-7"
        style={{ y }}
      >
        <div className="grid flex-shrink-0 grid-cols-1 gap-8">{children} </div>
        <div className="grid flex-shrink-0 grid-cols-1 gap-8">{children} </div>
        <div className="grid flex-shrink-0 grid-cols-1 gap-8">{children} </div>
        <div className="grid flex-shrink-0 grid-cols-1 gap-8">{children} </div>
      </motion.div>
    </div>
  )
}

const Parallax = () => {
  return (
    <motion.section
      initial={{ opacity: 0, rotate: -15, scale: 2 }}
      animate={{ opacity: 1, rotate: 0, scale: 1 }}
      transition={{
        ease: 'easeOut',
        duration: 2.5, delay: 0.6
      }}
      style={{ height: '100vh' }}
      className="flex flex-row gap-8 mx-8"
    >
      <Column baseVelocity={-0.4}>
        <div className="w-max-[12rem] relative h-64 overflow-hidden rounded-lg">
          <Image
            src="/images/card-pic-1.jpeg"
            loading="eager"
            alt={'Card 2'}
            width={440}
            height={640}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="w-max-[12rem] relative h-64 overflow-hidden rounded-lg">
          <Image
            src="/images/card-pic-2.jpeg"
            loading="eager"
            alt={'Card 4'}
            width={440}
            height={640}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="w-max-[12rem] relative h-64 overflow-hidden rounded-lg">
          <Image
            src="/images/card-pic-3.jpeg"
            loading="eager"
            alt={'Card 2'}
            width={440}
            height={640}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="w-max-[12rem] relative h-64 overflow-hidden rounded-lg">
          <Image
            src="/images/card-pic-4.jpeg"
            loading="eager"
            alt={'Card 4'}
            width={440}
            height={640}
            className="h-full w-full object-cover object-center"
          />
        </div>
      </Column>
      <Column baseVelocity={0.4}>
        <div className="w-max-[12rem] relative h-64 overflow-hidden rounded-lg">
          <Image
            src="/images/card-pic-5.jpeg"
            loading="eager"
            alt={'Card 2'}
            width={440}
            height={640}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="w-max-[12rem] relative h-64 overflow-hidden rounded-lg">
          <Image
            src="/images/card-pic-4.jpeg"
            loading="eager"
            alt={'Card 4'}
            width={440}
            height={640}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="w-max-[12rem] relative h-64 overflow-hidden rounded-lg">
          <Image
            src="/images/card-pic-6.jpeg"
            loading="eager"
            alt={'Card 2'}
            width={440}
            height={640}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="w-max-[12rem] relative h-64 overflow-hidden rounded-lg">
          <Image
            src="/images/card-pic-4.jpeg"
            loading="eager"
            alt={'Card 4'}
            width={440}
            height={640}
            className="h-full w-full object-cover object-center"
          />
        </div>
      </Column>

      <Column baseVelocity={-0.3}>
        <div className="w-max-[12rem] relative h-64 overflow-hidden rounded-lg">
          <Image
            src="/images/card-pic-2.jpeg"
            loading="eager"
            alt={'Card 2'}
            width={440}
            height={640}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="w-max-[12rem] relative h-64 overflow-hidden rounded-lg">
          <Image
            src="/images/card-pic-4.jpeg"
            loading="eager"
            alt={'Card 4'}
            width={440}
            height={640}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="w-max-[12rem] relative h-64 overflow-hidden rounded-lg">
          <Image
            src="/images/card-pic-5.jpeg"
            loading="eager"
            alt={'Card 2'}
            width={440}
            height={640}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="w-max-[12rem] relative h-64 overflow-hidden rounded-lg">
          <Image
            src="/images/card-pic-1.jpeg"
            loading="eager"
            alt={'Card 4'}
            width={440}
            height={640}
            className="h-full w-full object-cover object-center"
          />
        </div>
      </Column>
        <Column baseVelocity={0.4}>
          <div className="w-max-[12rem] relative h-64 overflow-hidden rounded-lg">
            <Image
              src="/images/card-pic-2.jpeg"
              loading="eager"
              alt={'Card 2'}
              width={440}
              height={640}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="w-max-[12rem] relative h-64 overflow-hidden rounded-lg">
            <Image
              src="/images/card-pic-4.jpeg"
              loading="eager"
              alt={'Card 4'}
              width={440}
              height={640}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="w-max-[12rem] relative h-64 overflow-hidden rounded-lg">
            <Image
              src="/images/card-pic-5.jpeg"
              loading="eager"
              alt={'Card 2'}
              width={440}
              height={640}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="w-max-[12rem] relative h-64 overflow-hidden rounded-lg">
            <Image
              src="/images/card-pic-4.jpeg"
              loading="eager"
              alt={'Card 4'}
              width={440}
              height={640}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </Column>
        <Column baseVelocity={-0.4}>
          <div className="w-max-[12rem] relative h-64 overflow-hidden rounded-lg">
            <Image
              src="/images/card-pic-6.jpeg"
              loading="eager"
              alt={'Card 2'}
              width={440}
              height={640}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="w-max-[12rem] relative h-64 overflow-hidden rounded-lg">
            <Image
              src="/images/card-pic-5.jpeg"
              loading="eager"
              alt={'Card 4'}
              width={440}
              height={640}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="w-max-[12rem] relative h-64 overflow-hidden rounded-lg">
            <Image
              src="/images/card-pic-3.jpeg"
              loading="eager"
              alt={'Card 2'}
              width={440}
              height={640}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="w-max-[12rem] relative h-64 overflow-hidden rounded-lg">
            <Image
              src="/images/card-pic-4.jpeg"
              loading="eager"
              alt={'Card 4'}
              width={440}
              height={640}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </Column>
        <Column baseVelocity={0.3}>
          <div className="w-max-[12rem] relative h-64 overflow-hidden rounded-lg">
            <Image
              src="/images/card-pic-2.jpeg"
              loading="eager"
              alt={'Card 2'}
              width={440}
              height={640}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="w-max-[12rem] relative h-64 overflow-hidden rounded-lg">
            <Image
              src="/images/card-pic-6.jpeg"
              loading="eager"
              alt={'Card 4'}
              width={440}
              height={640}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="w-max-[12rem] relative h-64 overflow-hidden rounded-lg">
            <Image
              src="/images/card-pic-7.jpeg"
              loading="eager"
              alt={'Card 2'}
              width={440}
              height={640}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="w-max-[12rem] relative h-64 overflow-hidden rounded-lg">
            <Image
              src="/images/card-pic-5.jpeg"
              loading="eager"
              alt={'Card 4'}
              width={440}
              height={640}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </Column>
    </motion.section>
  )
}

export default Parallax
