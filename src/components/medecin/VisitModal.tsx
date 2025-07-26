import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import PatientsRdv from "./patients/PatientsRdv"

export default function PatientsRdvList({medecinId}:{medecinId: string}) {
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="outline">  List des rendez-Vous </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col rounded-2xl gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:hidden">
        <ScrollArea className="flex max-h-full  flex-col overflow-hidden">
         
          <PatientsRdv medecinId={medecinId} />
          <DialogFooter className="px-6 pb-6 sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
