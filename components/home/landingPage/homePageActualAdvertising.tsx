import { motion } from "framer-motion";
import { forwardRef } from "react";
import { DESIGN_SYSTEM } from "./designSystem";
import BackgroundDot from "../backgroundDot";

const HomePageActualAdvertising = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <motion.section
      {...DESIGN_SYSTEM.animations.fadeInUp}
      ref={ref}
      className="py-20 px-6 bg-[#fdf1da] relative"
    >
      <BackgroundDot />
      <div className="max-w-7xl mx-auto text-center space-y-6 relative">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-4xl font-MaruBuri-Bold"
        >
          선생님, 커리큘럼, 교재까지. 모든게 준비되었습니다.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-lg font-MaruBuri-Light"
        >
          이제는 여러분 차례입니다.
        </motion.p>
      </div>
    </motion.section>
  );
});

HomePageActualAdvertising.displayName = "HomePageActualAdvertising";

export default HomePageActualAdvertising;
