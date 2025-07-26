'use client';

import React from 'react';
import { Calendar, Phone, Mail, MapPin, Clock, Users } from 'lucide-react';
import { UserIcon } from '../ux/UserIcon';

interface Patient {
  id: string;
  nom: string;
  prenom: string;
  email?: string;
  avatarUrl?: string;
  age?: number;
  telephone?: string;
  adresse?: string;
  dateNaissance?: string;
  suiviDepuis?: string;
}

interface PatientFilterListProps {
  patients: Patient[];
}

const formatDate = (dateString?: string) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const calculerDureeSuivi = (suiviDepuis?: string) => {
  if (!suiviDepuis) return 'N/A';
  const debut = new Date(suiviDepuis);
  const maintenant = new Date();
  const diffMois = Math.floor((maintenant.getTime() - debut.getTime()) / (1000 * 60 * 60 * 24 * 30));
  if (diffMois < 1) return '< 1 mois';
  if (diffMois < 12) return `${diffMois} mois`;
  return `${Math.floor(diffMois / 12)} an${Math.floor(diffMois / 12) > 1 ? 's' : ''}`;
};

export default function PatientFilterList({ patients }: PatientFilterListProps) {
  if (!patients || patients.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Aucun patient correspondant</h3>
        <p className="text-muted-foreground mb-6">Essayez avec un autre terme de recherche.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {patients.map((user) => (
        <div
          key={user.id}
          className="p-6 bg-muted/30 border rounded-lg shadow-sm hover:bg-muted/50 transition-colors"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            
            {/* Bloc gauche : Avatar et infos principales */}
            <div className="flex items-start gap-4 flex-1">
              <UserIcon userId={user.id} avatarUrl={user.avatarUrl} name={user.prenom} />
              
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {user.prenom} {user.nom}
                  </h3>
                  {user.age && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                      {user.age} ans
                    </span>
                  )}
                </div>

                {user.email && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bloc droite : Contact et détails */}
            <div className="flex-1 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{user.telephone || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">{user.adresse || 'N/A'}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground mt-2">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Né(e) le {formatDate(user.dateNaissance)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Suivi depuis {calculerDureeSuivi(user.suiviDepuis)}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}
