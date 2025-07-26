"use client"

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, Clock, Mail, User } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';
import { usePatientsByMedecin } from '@/hooks/usePatientsByMedecin';
import { useRendezVous } from '@/hooks/useRendezVous';
import { AvatarsPatientsToolTip } from './patients/AvatarsPatientsToolTip';

export default function NextVisit({ medecinId }: { medecinId: string }) {
  const { users } = usePatientsByMedecin(medecinId);
  const { rendezVous } = useRendezVous(medecinId);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  // Trouver le patient sélectionné
  const selectedPatient = users.find(user => user.id === selectedPatientId);

  // Filtrer les rendez-vous du patient sélectionné et trouver le prochain
  const patientRendezVous = selectedPatientId 
    ? rendezVous.filter(rdv => rdv.patientId === selectedPatientId)
    : [];

  // Trouver le prochain rendez-vous (le plus proche dans le futur)
  const nextRendezVous = patientRendezVous
    .filter(rdv => new Date(rdv.dateDebut) > new Date())
    .sort((a, b) => new Date(a.dateDebut).getTime() - new Date(b.dateDebut).getTime())[0];

  const handlePatientSelect = (patientId: string) => {
    setSelectedPatientId(patientId);
  };

  const renderHeader = () => (
    <CardHeader className='border-b'>
      <CardTitle className='h-12 flex justify-between items-center'>
        Prochain rendez-vous
        <AvatarsPatientsToolTip 
          className='h-8' 
          users={users} 
          onPatientSelect={handlePatientSelect}
          selectedPatientId={selectedPatientId}
        />
      </CardTitle>
    </CardHeader>
  );

  const renderContent = () => {
    if (!nextRendezVous) {
      return (
        <CardContent className='flex flex-col h-full'>
          {selectedPatientId ? (
            <div className="text-muted-foreground text-center">
              Aucun rendez-vous à venir pour {selectedPatient?.name}
            </div>
          ) : (
            <div className="text-muted-foreground text-center">
              Sélectionnez un patient pour voir son prochain rendez-vous
            </div>
          )}
        </CardContent>
      );
    }

    const date = format(new Date(nextRendezVous.dateDebut), 'EEEE d MMMM yyyy', { locale: fr });
    const debut = format(new Date(nextRendezVous.dateDebut), 'HH:mm');
    const fin = format(new Date(nextRendezVous.dateFin), 'HH:mm');

    return (
      <CardContent className="flex flex-col h-full px-2 py-5 gap-4 items-center">
        <div className="flex flex-col border gap-4 p-8 pt-4 border-dashed rounded-md bg-accent/20">
          {selectedPatient && (
            <Link
              className="ml-auto -mr-2 inline-flex items-center hover:text-accent/50 transition-colors"
              href={`mailto:${selectedPatient.email}`}
              aria-label={`Envoyer un email à ${selectedPatient.email}`}
            >
              <Mail className="w-5 h-5" />
            </Link>
          )}
          
          <div className="flex justify-center items-center gap-3">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <span>{date}</span>
          </div>
          <div className="flex justify-center items-center gap-3">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <span>{debut}</span> - <span>{fin}</span>
          </div>
          
          {selectedPatient && (
            <div className="flex items-center gap-3 mt-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedPatient.avatar_url} />
                <AvatarFallback>
                  {selectedPatient.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{selectedPatient.name}</span>
                <span className="text-muted-foreground">{selectedPatient.email}</span>
              </div>
            </div>
          )}
          
          <div className="mt-2 text-sm text-muted-foreground text-center">
            <span className="font-semibold">Motif :</span> {nextRendezVous.motif}
          </div>
          <div className="mt-1 text-xs text-muted-foreground text-center">
            <span className="font-semibold">Statut :</span> {nextRendezVous.statut}
          </div>
        </div>
      </CardContent>
    );
  };

  return (
    <Card className="flex-1 overflow-y-auto scrollbar-hidden border">
      {renderHeader()}
      {renderContent()}
    </Card>
  );
}
