import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "gradient";
}

const LoadingSpinner = ({ className, size = "md", variant = "default" }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  if (variant === "gradient") {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <motion.div
          className={cn(
            "rounded-full bg-gradient-to-r from-futuristic-purple via-futuristic-magenta to-futuristic-blue",
            sizeClasses[size],
            className
          )}
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <motion.div
        className={cn(
          "rounded-full border-4 border-futuristic-purple/20 border-t-futuristic-purple",
          sizeClasses[size],
          className
        )}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default LoadingSpinner;