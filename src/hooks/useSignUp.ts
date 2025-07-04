import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

export type SignUpMode = "PATIENT" | "MEDECIN";

const signUpConfig = {
  PATIENT: {
    role: "PATIENT",
    fonction: "USER",
    redirectPath: "/patient/welcome",
  },
  MEDECIN: {
    role: "ADMIN",
    fonction: "MEDECIN",
    redirectPath: "/medecin/welcome",
  },
} as const;

export function useSignUp(mode: SignUpMode = "PATIENT") {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async ({ email, password, repeatPassword }: { email: string; password: string; repeatPassword: string }) => {
      const config = signUpConfig[mode];
      return await signUpUser({
        email,
        password,
        repeatPassword,
        ...config,
      });
    },
    onSuccess: (data) => {
      if (!data?.error) {
        router.push("/auth/sign-up-success");
      }
    },
  });

  const signUp = (email: string, password: string, repeatPassword: string) => {
    mutation.mutate({ email, password, repeatPassword });
  };

  return {
    signUp,
    error: mutation.error ? (mutation.error instanceof Error ? mutation.error.message : "Une erreur est survenue") : mutation.data?.error || null,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
  };
} 