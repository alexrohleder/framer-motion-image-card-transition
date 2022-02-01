import { motion, useAnimation, Variant } from "framer-motion";
import { ArrowsExpandIcon, ChatAltIcon, XIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";
import { useWindowSize } from "@react-hook/window-size";

type Variation = "expanded" | "collapsed";

const MAX_PAGE_WIDTH = 500; // in px
const TAILWIND_SM_BREAKPOINT = 620; // in px

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
 * @see https://spectrum.adobe.com/page/motion/
 * @see https://www.framer.com/docs/transition/#spring
 */
function usePostAnimations(isExpanded: boolean) {
  const controls = useAnimation();
  const [windowWidth, windowHeight] = useWindowSize();

  // Everytime we transition page the isExpanded will change
  // We use this to animate the change of variations in the page
  useLayoutEffect(() => {
    const nextVariation: Variation = isExpanded ? "expanded" : "collapsed";

    controls.start(nextVariation, { type: "spring", bounce: 0.25 });

    return controls.stop;
  }, [controls, isExpanded]);

  const variants: { [component: string]: Record<Variation, Variant> } = {
    img: {
      collapsed: {
        scale: 1,
      },
      expanded: {
        scale: 2,
      },
    },
    imgContainer: {
      collapsed: {
        width: windowWidth < TAILWIND_SM_BREAKPOINT ? 320 : 390,
        height: 370,
        y: 0,
        x: 0,
      },
      expanded: {
        width: Math.min(windowWidth, MAX_PAGE_WIDTH),
        height: windowHeight,
        y: -128, // tailwind h-32
        x: -48, // tailwind pl-12
        transition: {
          height: {
            // Transition the height faster because this is normally longer
            // For example the height can vary from 370 to 1080, while width is from 390 to 500
            duration: 0.25,
          },
        },
      },
    },
    expandButton: {
      collapsed: {
        opacity: 1,
        scale: 1,
      },
      expanded: {
        opacity: 0,
        scale: 0.65,
      },
    },
    extendedContainer: {
      collapsed: {
        opacity: 0,
        pointerEvents: "none",
        transition: {
          duration: 0,
        },
      },
      expanded: {
        opacity: 1,
        pointerEvents: "all",
        transition: {
          duration: 0.8,
          when: "beforeChildren",
        },
      },
    },
    extendedTitle: {
      collapsed: {
        y: 100, // Offscreen
      },
      expanded: {
        y: 0,
        transition: {
          bounce: 0.5,
        },
      },
    },
    extendedAuthor: {
      collapsed: {
        y: 100, // Offscreen
      },
      expanded: {
        y: 0,
        transition: {
          bounce: 0.5,
          delay: 0.15, // Waiting a bit for the extendedTitle
        },
      },
    },
    extendedComment: {
      collapsed: {
        x: 100, // Offscreen
      },
      expanded: {
        x: 0,
        transition: {
          bounce: 0.5,
          delay: 0.15,
        },
      },
    },
  };

  return [variants, controls] as const;
}

export default function Home() {
  const router = useRouter();

  const slug = router.query.slug?.[0];
  const isExpanded = !!router.query.slug?.[1];

  const [variants, controls] = usePostAnimations(isExpanded);

  return (
    <motion.div animate={controls} initial={"collapsed" as Variation}>
      <section
        className="h-screen m-auto text-lg sm:text-xl text-center overflow-hidden relative px-6 sm:px-12"
        style={{ maxWidth: MAX_PAGE_WIDTH }}
      >
        <div className="h-32 flex items-end justify-center">
          <h3 className="mb-8">
            <span className="font-bold">Shared</span> by you
          </h3>
        </div>
        <div className="h-[370px]">
          <motion.div
            className="h-full w-full overflow-hidden absolute rounded shadow-xl shadow-gray-300"
            variants={variants.imgContainer}
          >
            <motion.img
              src="/andre-benz-tokyo.jpeg"
              className="object-cover"
              alt="Tokyo by Andre Benz"
              variants={variants.img}
            />
          </motion.div>
        </div>
        <h1 className="text-5xl sm:text-6xl mt-14 mb-6 font-bold">
          Lost in Tokyo
        </h1>
        <h2 className="mb-14">
          Cras mattis consectetur purus sit amet fermentum. Maecenas sed diam
          eget risus varius blandit sit amet non magna.
        </h2>
        <Link href={`/post/${slug}/expanded`} passHref>
          <motion.a
            className="rounded-full bg-black px-6 py-6 inline-block"
            variants={variants.expandButton}
          >
            <ArrowsExpandIcon className="w-8 h-8 fill-white" />
          </motion.a>
        </Link>
        <motion.div
          className="flex flex-col justify-between absolute inset-6 text-white"
          variants={variants.extendedContainer}
        >
          <Link href={`/post/${slug}`} passHref>
            <a>
              <XIcon className="h-12 w-12" />
            </a>
          </Link>
          <div className="flex flex-col pb-10">
            <motion.h1
              className="text-7xl text-left font-bold mb-4"
              variants={variants.extendedTitle}
            >
              Lost in Tokyio
            </motion.h1>
            <div className="text-2xl flex justify-between">
              <motion.h2 className="pl-3" variants={variants.extendedAuthor}>
                By Andre Benz
              </motion.h2>
              <motion.div
                className="pr-5 flex gap-2"
                variants={variants.extendedComment}
              >
                8
                <ChatAltIcon className="h-8 w-8" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
