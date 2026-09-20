import heroImg from "@/assets/dashboard/dashboard-hero.jpg";

export default function GreetingBanner() {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-white border border-kc-border shadow-xs min-h-[105px] sm:min-h-[140px] flex items-center card-3d-hover group">
      {/* Background farmland image bleeding in from the right with smooth 3D zoom */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-right sm:bg-center transition-transform duration-700 ease-out group-hover:scale-105"
        style={{
          backgroundImage: `url('${heroImg}')`,
        }}
      />

      {/* Gradient mask: solid white on the left fading smoothly across to transparent */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(90deg, #ffffff 0%, #ffffff 45%, rgba(255, 255, 255, 0.9) 60%, rgba(255, 255, 255, 0.4) 80%, rgba(255, 255, 255, 0) 100%)",
        }}
      />

      {/* Greeting Content */}
      <div className="relative z-20 p-4 sm:p-6 lg:p-8 max-w-xl">
        <h1 className="text-lg sm:text-2xl lg:text-[26px] font-bold text-kc-text tracking-tight flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <span>Good Morning,</span>
          <span className="text-kc-green font-bold">Prathamesh!</span>
          <span className="text-xl sm:text-2xl">👋</span>
        </h1>
        <p className="text-kc-muted text-xs sm:text-sm lg:text-[15px] mt-1 font-normal">
          Here's your smart farming overview for today.
        </p>
      </div>
    </div>
  );
}
