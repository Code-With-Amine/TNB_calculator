"use client";

import { useState, useEffect } from "react";
import { DataModal } from "@/components/DataModal";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const criteriaList = [
  { id: "health", fr: "Centres de santé", ar: "المراكز الصحية" },
  { id: "education", fr: "Établissements scolaires", ar: "المؤسسات التعليمية" },
  { id: "roads", fr: "Réseau routier", ar: "الطرق" },
  { id: "electricity", fr: "Électricité", ar: "شبكات الكهرباء" },
  { id: "water", fr: "Eau potable", ar: "الماء" },
  { id: "sanitation", fr: "Assainissement", ar: "التطهير" },
  { id: "lighting", fr: "Éclairage public", ar: "الإنارة العمومية" },
  { id: "transport", fr: "Transport urbain", ar: "النقل الحضري" },
  { id: "waste", fr: "Collecte des déchets", ar: "خدمة جمع النفايات" },
];

interface resultObject {
  id?: string;
  Lieu: string;
  Evaluation: string[];
  ZoneFr: string;
  ZoneAr: string;
}

export function EquipmentTaxCalculator() {
  const [modalOpen, setModalOpen] = useState(false);
  const [showLieuAlert, setShowLieuAlert] = useState(false);
  const [editLieu, setEditLieu] = useState<string>("");
  const [editId, setEditId] = useState<string | null>(null);

  const handleEdit = (item: resultObject) => {
    setEditId(item.id!);
    setEditLieu(item.Lieu);
  };

  const handleUpdate = async () => {
    if (!editId || !editLieu.trim()) return;
    try {
      await updateDoc(doc(db, "results", editId), { Lieu: editLieu });
      setEditId(null);
      setEditLieu("");
      await fetchData();
    } catch (err) {
      console.error("Erreur de mise à jour :", err);
    }
  };
  const [selected, setSelected] = useState<string[]>([]);
  const [lang, setLang] = useState<"fr" | "ar">("fr");
  const [result, setResult] = useState<resultObject | null>(null);
  const [lieu, setLieu] = useState<string>("");
  const [data, setData] = useState<resultObject[]>([]);
  const [search, setSearch] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const computeResult = async () => {
    if (!lieu.trim()) {
      setShowLieuAlert(true);
      return;
    }


    const count = selected.length;
    const evaluationLabels = selected.map((id) =>
      lang === "fr"
        ? criteriaList.find((c) => c.id === id)?.fr || id
        : criteriaList.find((c) => c.id === id)?.ar || id
    );

    // Check for required criteria for "Zone moyennement équipée"
    const hasRoads = selected.includes("roads");
    const hasElectricity = selected.includes("electricity");
    const hasWater = selected.includes("water");

    let zoneFr = "Zone faiblement équipée (0.5 - 2 DH/m²)";
    let zoneAr = "منطقة غير مجهزة (0.5 - 2 درهم/م²)";

    if (count >= 7) {
      zoneFr = "Zone bien équipée (15 - 30 DH/m²)";
      zoneAr = "منطقة مجهزة جيدًا (15 - 30 درهم/م²)";
    } else if (count >= 2 && hasRoads && hasElectricity && hasWater) {
      zoneFr = "Zone moyennement équipée (5 - 15 DH/m²)";
      zoneAr = "منطقة مجهزة بشكل متوسط (5 - 15 درهم/م²)";
    }

    const newResult: resultObject = {
      Lieu: lieu,
      Evaluation: evaluationLabels,
      ZoneFr: zoneFr,
      ZoneAr: zoneAr,
    };

    setResult(newResult);

    try {
      await addDoc(collection(db, "results"), newResult);
      await fetchData();
    } catch (err) {
      console.error("Error saving to Firestore:", err);
    }
  };

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "results"));
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as resultObject[];
      setData(docs);
    } catch (err) {
      console.error("Error fetching from Firestore:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Confirmer la suppression ?")) {
      try {
        await deleteDoc(doc(db, "results", id));
        await fetchData();
      } catch (err) {
        console.error("Erreur de suppression :", err);
      }
    }
  };

  const filteredData = data.filter(
    (item) =>
      item.Lieu.toLowerCase().includes(search.toLowerCase()) &&
      (filterCategory === "" || item.ZoneFr.includes(filterCategory))
  );

  return (
    <>
      {showLieuAlert && (
        <Alert className="mb-4">
          <AlertTitle>Champ requis</AlertTitle>
          <AlertDescription>
            Le champ <strong>Lieu</strong> ne peut pas être vide.
          </AlertDescription>
          <div className="mt-2 flex justify-end">
            <Button size="sm" variant="outline" onClick={() => setShowLieuAlert(false)}>
              OK
            </Button>
          </div>
        </Alert>
      )}
      <Tabs
        value={lang}
        onValueChange={(v) => setLang(v as "fr" | "ar")}
        className="w-full max-w-5xl mx-auto"
      >
      <TabsContent value="fr">
        <Card>
        <div className="grid gap-2 m-4">
          <Label htmlFor="lieu">Lieu</Label>
          <Input
            id="lieu"
            type="text"
            value={lieu}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLieu(e.target.value)
            }
            required
          />
        </div>
          <CardHeader>
            <CardTitle>Évaluation de l'Équipement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {criteriaList.map((c) => (
              <div key={c.id} className="flex items-center space-x-2">
                <Checkbox
                  id={c.id}
                  checked={selected.includes(c.id)}
                  onCheckedChange={() => toggle(c.id)}
                />
                <Label htmlFor={c.id}>{c.fr}</Label>
              </div>
            ))}
            <Button className="w-full mt-4" onClick={computeResult}>
              Afficher le résultat
            </Button>
            {result && (
              <div className="mt-4 p-4 rounded bg-muted/10 border space-y-2">
                <p><strong>Lieu :</strong> {result.Lieu}</p>
                <p><strong>Critères remplis :</strong></p>
                <ul className="list-disc list-inside">
                  {result.Evaluation.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p><strong>Zone :</strong> {result.ZoneFr}</p>
              </div>
            )}

            <Button variant="outline" className="w-full" onClick={() => setModalOpen(true)}>
              Afficher toutes les données
            </Button>
            <DataModal
              open={modalOpen}
              onOpenChange={setModalOpen}
              search={search}
              setSearch={setSearch}
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
              filteredData={filteredData}
              editId={editId}
              editLieu={editLieu}
              setEditLieu={setEditLieu}
              handleUpdate={handleUpdate}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
    </>
  );
}
