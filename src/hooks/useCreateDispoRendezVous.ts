"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import createRendezVous from "@/lib/actions/rendezvous";
import { TypeRendezVousEnum } from "@prisma/client";
import { queryKeys } from "./useDisponibilites";

interface CreateDispoRendezVousInput {
  disponibiliteId: string;
  motif: string;
  type: TypeRendezVousEnum;
  meta?: any;
}

export function useCreateDispoRendezVous() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: async (data: CreateDispoRendezVousInput) => {
      return await createRendezVous(data);
    },
    onSuccess: (data) => {
      // Invalider le cache des rendez-vous pour le médecin
      if (data?.rendezVous?.medecinId) {
        queryClient.invalidateQueries({ 
          queryKey: queryKeys.rendezVous(data.rendezVous.medecinId) 
        });
        // Invalider aussi le cache des disponibilités
        queryClient.invalidateQueries({ 
          queryKey: queryKeys.disponibilites(data.rendezVous.medecinId) 
        });
      }
      
      toast({
        title: "Succès",
        description: "Rendez-vous créé avec succès !",
        variant: "default",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error?.message || "Une erreur est survenue lors de la création.",
        variant: "destructive",
      });
    },
  });

  return {
    createDispoRendezVous: mutation.mutate,
    ...mutation,
  };
}
