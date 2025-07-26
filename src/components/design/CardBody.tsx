import { cn } from "@/lib/utils"
import React from "react"

// ======================= Card Content =======================
const cardContent = {
  title: "Login",
  description:
    "Connectez vous avec votre compte, si vous n'avez pas de compte, veuillez vous inscrire.",
}

// ======================= CardBody =======================
export const CardBody = ({
  title ,
  description,
  className = "p-4",
}: {
  title?: string
  description?: string
  className?: string
}) => (
  <div className={cn("text-start", className)}>
    <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-gray-100">
      {title}
    </h3>
    <p className="text-gray-700 dark:text-gray-300">{description}</p>
  </div>
)

// ======================= Line =======================
export const Line = ({ className = "" }: { className?: string }) => (
  <div
    className={cn(
      "h-px w-full via-zinc-400 from-[1%] from-zinc-200 to-zinc-600 absolute -z-0 dark:via-zinc-700 dark:from-zinc-900 dark:to-zinc-500",
      className
    )}
  />
)

// ======================= Container =======================
export const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto w-full px-4 sm:px-6 md:px-8">
    <Line className="bg-gradient-to-l left-0 top-2 sm:top-4 md:top-6" />
    <Line className="bg-gradient-to-r bottom-2 sm:bottom-4 md:bottom-6 left-0" />
    <Line className="w-px bg-gradient-to-t right-2 sm:right-4 md:right-6 h-full inset-y-0" />
    <Line className="w-px bg-gradient-to-t left-2 sm:left-4 md:left-6 h-full inset-y-0" />
    <div className="relative z-20 mx-auto py-8">{children}</div>
  </div>
)

// ======================= SimpleCard_V2 =======================
export const SimpleCard_V2 = () => (
  <Container>
    <div className="p-4 w-full flex justify-center">
      <CardBody />
    </div>
  </Container>
)


//=======================Login ===============
