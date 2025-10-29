import { AlertCircle } from "lucide-react";

const DisclaimerBanner = () => {
  return (
    <div className="bg-warning text-warning-foreground py-3 px-4 shadow-soft">
      <div className="container mx-auto flex items-center justify-center gap-3">
        <AlertCircle className="h-5 w-5 flex-shrink-0" />
        <p className="text-sm md:text-base font-medium text-center">
          <strong>DEMO ONLY:</strong> VulnTech is a fictional company for training and demonstration purposes. All contact information is fake.
        </p>
      </div>
    </div>
  );
};

export default DisclaimerBanner;
