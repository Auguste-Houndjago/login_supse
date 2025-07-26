import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from '@/components/ui/avatar';
  import {
    AvatarGroup,
    AvatarGroupTooltip,
  } from '@/components/animate-ui/components/avatar-group';
  import { cn } from '@/lib/utils';
  
  // Type minimal pour un utilisateur (issu de usePatientsByMedecin)
  export interface PatientUser {
    id: string;
    name: string;
    email?: string;
    avatar_url?: string;
  }
  
  export interface AvatarsPatientsToolTipProps {
    users: PatientUser[];
    className?: string; // ← Ajout de la prop personnalisable
    onPatientSelect?: (patientId: string) => void;
    selectedPatientId?: string | null;
  }
  
  export const AvatarsPatientsToolTip = ({
    users,
    className,
    onPatientSelect,
    selectedPatientId,
  }: AvatarsPatientsToolTipProps) => {
    if (!users || users.length === 0) return null;
  
    return (
      <AvatarGroup className={cn("h-12 -space-x-3", className)}>
        {users.map((user, index) => (
          <Avatar
            key={user.id || index}
            className={cn(
              "size-12 border-3 border-background cursor-pointer transition-all",
              selectedPatientId === user.id && "ring-2 ring-primary ring-offset-2"
            )}
            onClick={() => onPatientSelect?.(user.id)}
          >
            <AvatarImage src={user.avatar_url} />
            <AvatarFallback>
              {user.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
            <AvatarGroupTooltip>
              <div>
                <p className="font-semibold">{user.name}</p>
                {user.email && (
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                )}
              </div>
            </AvatarGroupTooltip>
          </Avatar>
        ))}
      </AvatarGroup>
    );
  };
  