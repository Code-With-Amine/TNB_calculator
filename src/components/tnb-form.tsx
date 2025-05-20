"use client"

import { useState } from "react"
import type React from "react"
import { MultiSelect, type Option } from "./multi-select"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { calculateAmountForYear } from "@/lib/tnb-utils" // utility function we'll define below

export function TnbForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [superficie, setSuperficie] = useState("")
  const [etage, setEtage] = useState<string | null>(null)
  const [selectedTndYears, setSelectedTndYears] = useState<string[]>([])
  const [selectedDeclaredTnbYears, setSelectedDeclaredTnbYears] = useState<string[]>([])
  const [results, setResults] = useState<{ year: string; total: number }[]>([])

  const tndYearsOptions: Option[] = [
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const superficieValue = parseFloat(superficie)
    if (isNaN(superficieValue) || superficieValue <= 0) return

    const tarif = 6
    const principal = superficieValue * tarif

    const computed = selectedTndYears.map((year) => {
      const isDeclared = selectedDeclaredTnbYears.includes(year)
      const total = calculateAmountForYear(parseInt(year), principal, isDeclared)
      return { year, total }
    })

    setResults(computed)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bienvenue</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="superficie">Taille du terrain en m²</Label>
                <Input
                  id="superficie"
                  type="number"
                  value={superficie}
                  onChange={(e) => setSuperficie(e.target.value)}
                  placeholder="ex: 92"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="etage">Nombre d'étages</Label>
                <Select onValueChange={setEtage}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choisissez un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Type de terrain</SelectLabel>
                      <SelectItem value="villa">R ≤ 3 (Zone villa ou maison)</SelectItem>
                      <SelectItem value="immeuble">R ≥ 3 (Zone immeuble)</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Années non payées</Label>
                <MultiSelect
                  options={tndYearsOptions}
                  selected={selectedTndYears}
                  onChange={setSelectedTndYears}
                  placeholder="Sélectionnez les années"
                />
              </div>

              <div className="grid gap-2">
                <Label>Années déclarées</Label>
                <MultiSelect
                  options={tndYearsOptions.map((o) => ({
                    value: o.value,
                    label: `Je déclare ${o.label}`,
                  }))}
                  selected={selectedDeclaredTnbYears}
                  onChange={setSelectedDeclaredTnbYears}
                  placeholder="Sélectionnez les années déclarées"
                />
              </div>

              <Button type="submit" className="w-full">
                Calculer
              </Button>

              {results.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold text-center mb-2">Résultats</h3>
                  <ul className="space-y-1 text-sm">
                    {results.map((r) => (
                      <li key={r.year}>
                        <strong>{r.year}:</strong> {r.total.toFixed(2)} DH
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
