import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  search: string;
  setSearch: (val: string) => void;
  filterCategory: string;
  setFilterCategory: (val: string) => void;
  filteredData: any[];
  editId: string | null;
  editLieu: string;
  setEditLieu: (val: string) => void;
  handleUpdate: () => void;
  handleEdit: (item: any) => void;
  handleDelete: (id: string) => void;
}

export function DataModal({
  open,
  onOpenChange,
  search,
  setSearch,
  filterCategory,
  setFilterCategory,
  filteredData,
  editId,
  editLieu,
  setEditLieu,
  handleUpdate,
  handleEdit,
  handleDelete,
}: ModalProps) {
  // ...existing code...
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [pendingDeleteId, setPendingDeleteId] = React.useState<string | null>(null);

  const onDeleteClick = (id: string) => {
    setPendingDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (pendingDeleteId) {
      handleDelete(pendingDeleteId);
      setPendingDeleteId(null);
    }
    setConfirmOpen(false);
  };

  // PDF download handler
  const handleDownloadPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    doc.text("Toutes les données", 14, 14);
    const tableColumn = ["Lieu", "Zone", "Critères"];
    const tableRows = filteredData.map((item) => [
      item.Lieu,
      item.ZoneFr,
      item.Evaluation.join("\n")
    ]);
    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 20 });
    doc.save("tnb-table.pdf");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[1800px] w-[98vw] h-[85vh] overflow-y-auto my-7">
          <DialogTitle>Toutes les données</DialogTitle>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Recherche par lieu"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            />
            <select
              className="border rounded px-2 py-1"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">Toutes les catégories</option>
              <option value="Zone bien équipée (15 - 30 DH/m²)">Zone bien équipée</option>
              <option value="Zone moyennement équipée (5 - 15 DH/m²)">Zone moyennement équipée</option>
              <option value="Zone faiblement équipée (0.5 - 2 DH/m²)">Zone faiblement équipée</option>
            </select>
            <Button variant="outline" onClick={handleDownloadPDF}>
              Télécharger PDF
            </Button>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lieu</TableHead>
                  <TableHead>Zone</TableHead>
                  <TableHead>Critères</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {editId === item.id ? (
                        <Input
                          value={editLieu}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditLieu(e.target.value)}
                          className="w-32"
                        />
                      ) : (
                        item.Lieu
                      )}
                    </TableCell>
                    <TableCell>{item.ZoneFr}</TableCell>
                    <TableCell>
                      {item.Evaluation.map((ev: string, i: number) => (
                        <React.Fragment key={i}>
                          {ev}
                          {i < item.Evaluation.length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      {editId === item.id ? (
                        <>
                          <Button size="sm" variant="outline" onClick={handleUpdate}>
                            Enregistrer
                          </Button>
                          <Button size="sm" variant="secondary" onClick={() => setEditLieu("")}>Annuler</Button>
                        </>
                      ) : (
                        <>
                          <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                            Modifier
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => onDeleteClick(item.id!)}
                          >
                            Supprimer
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
      {/* Confirmation Dialog for Delete */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="max-w-md">
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <div className="mb-4">Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.</div>
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" onClick={() => setConfirmOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Supprimer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
