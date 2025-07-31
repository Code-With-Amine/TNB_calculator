"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const criteriaList = [
  {
    id: "health",
    fr: "Centres de santé",
    ar: "المراكز الصحية",
  },
  {
    id: "education",
    fr: "Établissements scolaires",
    ar: "المؤسسات التعليمية",
  },
  {
    id: "roads",
    fr: "Réseau routier",
    ar: "الطرق",
  },
  {
    id: "electricity",
    fr: "Électricité",
    ar: "شبكات الكهرباء",
  },
  {
    id: "water",
    fr: "Eau potable",
    ar: "الماء",
  },
  {
    id: "sanitation",
    fr: "Assainissement",
    ar: "التطهير",
  },
  {
    id: "lighting",
    fr: "Éclairage public",
    ar: "الإنارة العمومية",
  },
  {
    id: "transport",
    fr: "Transport urbain",
    ar: "النقل الحضري",
  },
  {
    id: "waste",
    fr: "Collecte des déchets",
    ar: "خدمة جمع النفايات",
  },
];

export function EquipmentTaxCalculator() {
  const [selected, setSelected] = useState<string[]>([]);
  const [lang, setLang] = useState<"fr" | "ar">("fr");
  const [result, setResullt] = useState<true | false>(false);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const getResult = () => {
    const count = selected.length;
    if (count >= 7)
      return lang === "fr"
        ? "Zone bien équipée (15 - 30 DH/m²)"
        : "منطقة مجهزة جيدًا (15 - 30 درهم/م²)";
    if (count >= 2)
      return lang === "fr"
        ? "Zone moyennement équipée (5 - 15 DH/m²)"
        : "منطقة مجهزة بشكل متوسط (5 - 15 درهم/م²)";
    return lang === "fr"
      ? "Zone faiblement équipée (0.5 - 2 DH/m²)"
      : "منطقة غير مجهزة (0.5 - 2 درهم/م²)";
  };

  return (
    <Tabs
      value={lang}
      onValueChange={(v) => setLang(v as "fr" | "ar")}
      className="w-full max-w-xl mx-auto"
    >
      <TabsList className="grid grid-cols-2 mb-4">
        <TabsTrigger value="fr">Français</TabsTrigger>
        <TabsTrigger value="ar">العربية</TabsTrigger>
      </TabsList>

      <TabsContent value="fr">
        <Card>
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
            <Button className="m-3 w-full" onClick={() =>setResullt(true)}>
               afficher le résultat
            </Button>{" "}
            { result && <div className="border mt-4 p-4 rounded bg-muted/10">
              <strong>Résultat :</strong> {getResult()}
            </div>}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="ar">
        <Card dir="rtl">
          <CardHeader>
            <CardTitle>تقييم التجهيزات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {criteriaList.map((c) => (
              <div key={c.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`ar-${c.id}`}
                  checked={selected.includes(c.id)}
                  onCheckedChange={() => toggle(c.id)}
                />
                <Label htmlFor={`ar-${c.id}`}>{c.ar}</Label>
              </div>
            ))}
            <Button className="w-full m-3" onClick={() =>setResullt(true)}>
             عرض النتيجة
            </Button>{" "}
          {result &&  <div className="border mt-4 p-4 rounded bg-muted/10">
              <strong>النتيجة:</strong> {getResult()}
            </div>}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
