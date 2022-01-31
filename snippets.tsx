<motion.div
  layoutId="picture"
  layout
  className={
    isExpanded
      ? "absolute inset-0 bg-black"
      : "w-full h-[370px] rounded bg-black shadow-2xl shadow-gray-600 overflow-hidden"
  }
  transition={{ duration: 3 }}
>
  <motion.div
    className={
      isExpanded
        ? "scale-x-[1.237] scale-y-[1.6459] relative w-full h-full"
        : "scale-x-[1.237] scale-y-[1.6459] relative w-full h-full"
    }
    transition={{ duration: 3 }}
  >
    <Image
      src="/andre-benz-tokyo.jpg"
      alt="Tokyo in the lens of Andre Benz"
      layout="fill"
      objectFit="cover"
    />
  </motion.div>
</motion.div>;

{
  isExpanded ? (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src="/_next/image?url=%2Fandre-benz-tokyo.jpg&w=1080&q=75"
        className="object-cover h-full w-full"
      />
    </div>
  ) : (
    <div className="w-full h-[370px] overflow-hidden">
      <img
        src="/_next/image?url=%2Fandre-benz-tokyo.jpg&w=1080&q=75"
        className="object-cover w-full h-full"
      />
    </div>
  );
}

<motion.div
  layout
  className={
    isExpanded
      ? "absolute inset-0 overflow-hidden"
      : "w-full h-[370px] overflow-hidden scale-x-[1.237] scale-y-[1.6459]"
  }
>
  <img
    src="/_next/image?url=%2Fandre-benz-tokyo.jpg&w=1080&q=75"
    className="object-cover w-full h-full"
  />
</motion.div>;
