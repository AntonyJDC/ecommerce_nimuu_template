import { cn } from "@/lib/utils";
import * as motion from "framer-motion/client";
import DressStyleCard from "./DressStyleCard";

const DressStyle = () => {
  return (
    <section className="container ">
      <div className="bg-base-200 pb-6 pt-10 md:p-[70px] rounded-[40px] text-center">
        <motion.h2
          initial={{ y: "100px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={cn([
            "text-[32px] leading-[36px] text-base-content md:text-4xl mb-8 md:mb-14 uppercase font-bold",
          ])}
        >
          Selecciona tu estilo de bienestar
        </motion.h2>

        {/* Grid principal */}
        <motion.div
          initial={{ y: "100px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5"
        >
          {/* Casual (1 columna en móviles, 1 en grandes) */}
          <DressStyleCard
             title={
              <>
                Relax
              </>
            }
            url="/shop#casual"
            className="col-span-1 md:col-span-1 row-span-1 w-full min-h-[200px] md:min-h-[300px] bg-[url('/images/dress-style-1.png')] bg-cover bg-center rounded-xl"
          />

          {/* Formal (1 columna en móviles, 2 en grandes) */}
          <DressStyleCard
             title={
              <>
                Cuidado<br />Facial
              </>
            }
            url="/shop#formal"
            className="col-span-1 md:col-span-2 row-span-1 w-full min-h-[200px] md:min-h-[300px] bg-[url('/images/dress-style-2.png')] bg-cover bg-center rounded-xl"
          />

          {/* Party (1 columna en móviles, 2 en grandes) */}
          <DressStyleCard
             title={
              <>
                Cuidado<br />Corporal
              </>
            }
            url="/shop#party"
            className="col-span-1 md:col-span-2 row-span-1 w-full min-h-[200px] md:min-h-[300px] bg-[url('/images/dress-style-3.png')] bg-cover bg-center rounded-xl"
          />

          {/* Gym (1 columna en móviles, 1 en grandes) */}
          <DressStyleCard
             title={
              <>
                Cuidado<br />Capilar
              </>
            }
            url="/shop#gym"
            className="col-span-1 md:col-span-1 row-span-1 w-full min-h-[200px] md:min-h-[300px] bg-[url('/images/dress-style-4.png')] bg-cover bg-center rounded-xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default DressStyle;
