import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { calculateAge } from "@/lib/utils";
import { Mail } from "lucide-react";
import Link from "next/link";

interface PatientInfoProps {
  patient: any;
}

export function PatientInfo({ patient }: PatientInfoProps) {
  if (!patient) return null;
  const user = patient.user;
  const initials = `${user.prenom?.[0] ?? ''}${user.nom?.[0] ?? ''}`.toUpperCase();
  const age = user.dateNaissance ? calculateAge(user.dateNaissance) : undefined;

  return (
    <Card className="border-2 rounded-lg min-h-42 min-w-42 flex-1">
      {/* HEADER */}
      <CardHeader className="flex flex-row items-center relative justify-between p-4 border-b-2 pb-2">
        <div className="flex items-center space-x-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={user.avatarUrl || undefined} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-semibold">
              {user.nom} {user.prenom}
            </CardTitle>
            <div className="flex items-center gap-2 mt-1">
              {age && <Badge variant="secondary">{age} ans</Badge>}
              <Badge variant="outline">Patient</Badge>
            </div>
          </div>
        </div>
        {/* Lien mailto */}
        {user.email && (
          <Link
            href={`mailto:${user.email}`}
            className="text-blue-600  absolute right-4 top-2 flex w-fit jusctify-center items-center h-fit  hover:text-blue-800 transition-colors"
          >
            <Mail className="w-6 h-6" />
          </Link>
        )}
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="p-4 ">
        <div className="grid grid-cols-2 gap-4 md:gap-8 text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground font-medium">Téléphone</p>
            <p>{user.telephone || '-'}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground font-medium">Email</p>
            <p className="truncate">{user.email || '-'}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground font-medium">Date de naissance</p>
            <p>{user.dateNaissance ? new Date(user.dateNaissance).toLocaleDateString() : '-'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
