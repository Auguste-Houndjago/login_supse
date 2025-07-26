import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  AvatarGroup,
  AvatarGroupTooltip,
} from '@/components/animate-ui/components/avatar-group';

// Type minimal pour un utilisateur (issu de usePatientsByMedecin)
export interface PatientUser {
  id: string;
  name: string;
  email?: string;
  avatar_url?: string;
}

interface AvatarsPatientsToolTipProps {
  users: PatientUser[];
}

export const AvatarsPatientsToolTip = ({ users }: AvatarsPatientsToolTipProps) => {
  if (!users || users.length === 0) return null;
  return (
    <AvatarGroup className="h-12 -space-x-3">
      {users.map((user, index) => (
        <Avatar key={user.id || index} className="size-12 border-3 border-background">
          <AvatarImage src={user.avatar_url} />
          <AvatarFallback>{user.name?.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
          <AvatarGroupTooltip>
            <div>
              <p className="font-semibold">{user.name}</p>
              {user.email && <p className="text-xs text-muted-foreground">{user.email}</p>}
            </div>
          </AvatarGroupTooltip>
        </Avatar>
      ))}
    </AvatarGroup>
  );
};