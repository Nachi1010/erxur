import { ArrowRight } from "lucide-react";

export const CTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm py-3 z-40">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="text-white">
          <h3 className="text-lg font-semibold">Ready to Start Your Journey?</h3>
          <p className="text-sm opacity-60">Join our AI program today</p>
        </div>
        <a 
          href="#registration-form"
          className="cta-button"
        >
          Enroll Now
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};