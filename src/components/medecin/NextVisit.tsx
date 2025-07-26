import { getUserInfo } from '@/lib/users/getUserInfo';
import { getNextRendezVousForMedecin } from '@/lib/actions/rendezvous';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, Clock, Mail, User } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';

export default async function NextVisit({ medecinId }: { medecinId: string }) {
  const user = await getUserInfo();
  if (!user) return null;
  const rdv = await getNextRendezVousForMedecin(medecinId);

  if (!rdv) {
    return (
      <Card className="flex-1 overflow-y-auto scrollbar-hidden border">
        <CardHeader>
          <CardTitle>Prochain rendez-vous</CardTitle>
        </CardHeader>
        <CardContent className=' flex flex-col h-full'>
          <div className="text-muted-foreground text-center">Aucun rendez-vous à venir</div>
        </CardContent>
      </Card>
    );
  }

  const date = format(new Date(rdv.dateDebut), 'EEEE d MMMM yyyy', { locale: fr });
  const heure = format(new Date(rdv.dateDebut), 'HH:mm');
  const debut = format(new Date(rdv.dateDebut), 'HH:mm');
  const fin = format(new Date(rdv.dateDebut), 'HH:mm');
  const patient = rdv.patient?.user;

  return (
    <Card className="flex-1">
      <CardHeader className='border-b'>
        <CardTitle>Prochain rendez-vous</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-full px-2 py-5  gap-4 items-center">
        <div className="flex flex-col border gap-4 p-8 pt-4 border-dashed rounded-md bg-accent/20 ">
        <Link
    className="ml-auto -mr-2 inline-flex items-center  hover:text-accent/50 transition-colors"
    href={`mailto:${patient.email}`}
    aria-label={`Envoyer un email à ${patient.email}`}
  >
    <Mail className="w-5 h-5" />
  </Link>
        <a href="mailto:augustehoundjago@gmail.com">Envoyer un mail</a>
          <div className="flex justify-center items-center gap-3">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <span>{date}</span>
          </div>
          <div className="flex justify-center items-center gap-3">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <span>{debut}</span> - <span>{fin}</span>
          </div>
          {patient && (
            <div className="flex items-center gap-3 mt-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={patient.avatarUrl} />
                <AvatarFallback>{patient.prenom[0]}{patient.nom[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{patient.prenom} {patient.nom}</span>
                <span className=" text-muted-foreground">{patient.email}</span>
              </div>
            </div>
          )}
          <div className="mt-2 text-sm text-muted-foreground text-center">
            <span className="font-semibold">Motif :</span> {rdv.motif}
          </div>
          <div className="mt-1 text-xs text-muted-foreground text-center">
            <span className="font-semibold">Statut :</span> {rdv.statut}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
