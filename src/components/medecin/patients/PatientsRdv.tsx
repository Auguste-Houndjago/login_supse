"use client"
import React, { useState } from 'react'
import { AvatarsPatientsToolTip } from './AvatarsPatientsToolTip'
import { usePatientsByMedecin } from '@/hooks/usePatientsByMedecin';
import { useRendezVous } from '@/hooks/useRendezVous';

export default function PatientsRdv({medecinId}:{medecinId: string}) {
    const { users } = usePatientsByMedecin(medecinId);
    const { rendezVous } = useRendezVous(medecinId);
    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

    // Filtrer les rendez-vous par patient sélectionné
    const patientRendezVous = selectedPatientId 
        ? rendezVous.filter(rdv => rdv.patientId === selectedPatientId)
        : [];

    // Trouver le patient sélectionné
    const selectedPatient = users.find(user => user.id === selectedPatientId);

    const handlePatientSelect = (patientId: string) => {
        setSelectedPatientId(patientId);
    };

  return (
    <div className='flex flex-col gap-4'>
        <div className='flex flex-col  gap-2'>
            <div className='border-b p-4 flex justify-end'>
                <AvatarsPatientsToolTip 
                    className='' 
                    users={users} 
                    onPatientSelect={handlePatientSelect}
                    selectedPatientId={selectedPatientId}
                />
            </div>

            <div className='flex flex-1 min-h-36 h-full   overflow-hidden scrollbar-hidden flex-col items-center justify-center p-4'>
                <div className="flex flex-col overflow-y-auto w-full h-full">
                    {selectedPatientId ? (
                        <div className='w-full'>
                            <h3 className='text-lg font-semibold mb-4'>
                                Rendez-vous de {selectedPatient?.name}
                            </h3>
                            {patientRendezVous.length > 0 ? (
                                <div className='space-y-2'>
                                    {patientRendezVous.map((rdv) => (
                                        <div key={rdv.id} className='p-3 border rounded-lg'>
                                            <div className='flex justify-between items-center'>
                                                <div>
                                                    <p className='font-medium'>
                                                        {new Date(rdv.dateDebut).toLocaleDateString('fr-FR')}
                                                    </p>
                                                    <p className='text-sm text-muted-foreground'>
                                                        {new Date(rdv.dateDebut).toLocaleTimeString('fr-FR', {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })} - {new Date(rdv.dateFin).toLocaleTimeString('fr-FR', {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>
                                                </div>
                                                <span className={`px-2 py-1 rounded-full text-xs ${
                                                    rdv.statut === 'CONFIRME' ? 'bg-green-100 text-green-800' :
                                                    rdv.statut === 'EN_ATTENTE' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {rdv.statut}
                                                </span>
                                            </div>
                                            {rdv.motif && (
                                                <p className='text-sm text-muted-foreground mt-2'>
                                                    Motif: {rdv.motif}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className='text-muted-foreground text-center'>
                                    Aucun rendez-vous pour ce patient
                                </p>
                            )}
                        </div>
                    ) : (
                        <p className='text-muted-foreground text-center'>
                            Sélectionnez un patient pour voir ses rendez-vous
                        </p>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}
