//ts-ignore-all


import React from "react"


import { RendezVous } from "@prisma/client"
import PatientCalendar from "@/components/patient/PatientCalendar"
import { ProfileCard } from "@/components/ux/ProfileCard"
import { getMedecinById, getNewVisitMedecinById } from "@/lib/actions/medecins"
import { MedecinCard } from "@/components/ux/MedecinCard"
import { getUserInfo } from "@/lib/users/getUserInfo"

// Mapping spécialité -> terme adéquat
const SPECIALITE_TERMS: Record<string, string> = {
  MEDECINE_GENERALE: "Généraliste",
  CARDIOLOGIE: "Cardiologue",
  DERMATOLOGIE: "Dermatologue",
  PEDIATRIE: "Pédiatre",
  GYNECOLOGIE: "Gynécologue",
  NEUROLOGIE: "Neurologue",
  OPHTALMOLOGIE: "Ophtalmologue",
  ORTHOPEDIE: "Orthopédiste",
};

// @ts-ignore 

export default async function MedecinPage({
  params,
}: {
  params: Promise<{ medecinId: string }>;
}) {
  // Attente de la résolution de la promesse
  const { medecinId } = await params;
const user = await getUserInfo();

if (!user) {
  return("/")
}
const patientId = user?.id || "da8b2596-9f17-49fa-9535-33e66ece3b37"

  const medecin = await getNewVisitMedecinById(medecinId);

  console.log("medecin: ", medecin);
  if (!medecin || !medecin.user) {
    return ("/rendez-vous/nouveau")
  }

  return (
    <main className="max-w-6xl w-full flex flex-col gap-y-14  mx-auto lg:px-12 p-6">


      <pre>
        {JSON.stringify(medecin, null, 2)}
      </pre>

      <section className="mb-8 flex flex-col items-center">
        <h1 className="text-3xl font-semibold mb-4">
          Rendez-vous avec Dr. {medecin.user.prenom} {medecin.user.nom}
        </h1>
        <p className="text-muted-foreground">
          Choisissez une date et une heure pour votre rendez-vous avec votre {SPECIALITE_TERMS[medecin.specialite] }.
        </p>

      </section>

      <div className="flex flex-col gap-y-20">
        <section className=" flex flex-col md:flex-row justify-center  ">
          <div>
          
            <MedecinCard medecin={medecin.user} specialite={medecin.specialite} className="" />
          </div>
          <div>
            <p className="text-muted-foreground">{medecin?.description}</p>
          </div>
        </section>



        <section className="flex flex-col">
          <h2 className="text-2xl text-center font-semibold mb-4">
            Disponibilités & prise de rendez-vous
          </h2>
       {medecin.user?.id ? (
            <PatientCalendar patientId={patientId} medecinId={medecin.id} />
          ) : null}
    
        </section>
      </div>
    </main>
  )
}
