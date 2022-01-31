import { AnimatePresence, motion } from "framer-motion";
import { ArrowsExpandIcon, ChatAltIcon, XIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";

/**
 * I'm not used to animating content, but wanted to use framer-motion for a while, so this issue was nice :)
 *
 * requirements:
 * 1. Animate the image: resize, re-scale and take care of the ratio
 * 2. Animate the expanded panel's title and author elements: bounce from bottom increasing opacity, delays a bit
 * 3. Animate the expanded panel's comment indicator: bounce from right increasing opacity, delays a bit
 * 4. Animate the expand button: re-scale and change opacity when closing the expanded panel
 * 5. All animations seems to be bouncing, and seem to be easing with ease-out?
 *
 * notes:
 * 1. I used random paddings, margings, font-size and so on. Trying to match the video by eye
 *
 * @see https://spectrum.adobe.com/page/motion/
 * @see https://www.framer.com/docs/transition/#spring
 */

export default function Home() {
  const router = useRouter();

  const slug = router.query.slug?.[0];
  const isExpanded = router.query.slug?.[1];

  return (
    <>
      <section className="h-full px-12 py-14 text-xl text-center">
        <h3 className="mb-8">
          <span className="font-bold">Shared</span> by you
        </h3>
        <motion.div
          layoutId="picture"
          className="w-full h-[370px] rounded bg-black shadow-2xl shadow-gray-600"
          transition={{ type: "spring", bounce: 0, duration: 0.5 }}
        >
          <div className="h-full flex items-center text-gray-300 justify-center">
            No image yet
          </div>
        </motion.div>
        <h1 className="text-6xl mt-14 mb-6 font-bold">Lost in Tokyo</h1>
        <h2 className="mb-14">
          Cras mattis consectetur purus sit amet fermentum. Maecenas sed diam
          eget risus varius blandit sit amet non magna.
        </h2>
        <Link href={`/post/${slug}/expanded`} passHref>
          <motion.a
            className="rounded-full bg-black px-6 py-6 inline-block"
            animate={
              isExpanded
                ? { opacity: 0, scale: 0.65 }
                : { opacity: 1, scale: 1 }
            }
            transition={{ type: "spring" }}
          >
            <ArrowsExpandIcon className="w-8 h-8 fill-white" />
          </motion.a>
        </Link>
      </section>

      <AnimatePresence>
        {isExpanded && (
          <section className="absolute inset-0 text-white overflow-hidden">
            <motion.div
              layoutId="picture"
              className="bg-black h-full w-full -z-10"
              transition={{ type: "spring", bounce: 0, duration: 0.5 }}
            />
            <motion.div
              className="flex flex-col justify-between absolute inset-6"
              exit={{ opacity: 0 }}
              transition={{ duration: 0 }}
            >
              <Link href={`/post/${slug}`} passHref>
                <a>
                  <XIcon className="h-12 w-12" />
                </a>
              </Link>
              <div className="flex flex-col pb-10">
                <motion.h1
                  className="text-7xl font-bold mb-4"
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  Lost in Tokyio
                </motion.h1>
                <div className="text-2xl flex justify-between">
                  <motion.h2
                    className="pl-3"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", bounce: 0.5, delay: 0.15 }}
                  >
                    By Andre Benz
                  </motion.h2>
                  <motion.div
                    className="pr-5 flex gap-2"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", bounce: 0.5, delay: 0.15 }}
                  >
                    8
                    <ChatAltIcon className="h-8 w-8" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>
        )}
      </AnimatePresence>
    </>
  );
}
