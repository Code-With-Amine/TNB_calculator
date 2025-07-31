"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Landmark,
  Ban,
  Car,
  ParkingSquare,
  Trees,
  MapPinned,
  FileText,
  Calculator,
  LifeBuoy,
  ChevronRight,
} from "lucide-react";

const navigationItems = [
    {
    id: 10,
    title: "Terrains non bâtis nouvelle version",
    subtitle: "Soumis à la taxe",
    description: "Essayez le nouveau calcul des taxes de TNB",
    icon: Landmark,
    color: "from-gray-500/20 to-gray-600/20",
    hoverColor: "hover:from-gray-500/30 hover:to-gray-600/30",
    borderColor: "border-gray-200/50",
    link: "/newTNB",
  },
  {
    id: 2,
    title: "Terrains non bâtis (Non exonérés)",
    subtitle: "Soumis à la taxe",
    description: "Visualisez les terrains non exonérés",
    icon: Landmark,
    color: "from-red-500/20 to-red-600/20",
    hoverColor: "hover:from-red-500/30 hover:to-red-600/30",
    borderColor: "border-red-200/50",
    link: "/terrainNonExo",
  },
  {
    id: 1,
    title: "Terrains non bâtis (Exonérés)",
    subtitle: "Terrains sans construction",
    description: "Consultez les terrains exemptés de la taxe",
    icon: Ban,
    color: "from-green-500/20 to-green-600/20",
    hoverColor: "hover:from-green-500/30 hover:to-green-600/30",
    borderColor: "border-green-200/50",
    link: "/terrainExo",
  },
  {
    id: 9,
    title: "Taxi",
    subtitle: "Soumis à la Taxi",
    description: "Visualisez les droit de taxi",
    icon: Car,
    color: "from-blue-500/20 to-blue-600/20",
    hoverColor: "hover:from-blue-500/30 hover:to-blue-600/30",
    borderColor: "border-blue-200/50",
    link: "/Taxi",
  },
  {
    id: 3,
    title: "Droit de stationnement",
    subtitle: "Taxe sur les taxis",
    description: "Informations sur les droits de stationnement",
    icon: ParkingSquare,
    color: "from-blue-500/20 to-blue-600/20",
    hoverColor: "hover:from-blue-500/30 hover:to-blue-600/30",
    borderColor: "border-blue-200/50",
    link: "/error",
  },
  {
    id: 4,
    title: "Début de boisson",
    subtitle: "Taxe pour établissement",
    description: "Gestion de la taxe pour début d'activité de boisson",
    icon: Trees,
    color: "from-amber-500/20 to-amber-600/20",
    hoverColor: "hover:from-amber-500/30 hover:to-amber-600/30",
    borderColor: "border-amber-200/50",
    link: "/error",
  },
  {
    id: 5,
    title: "Occupation du domaine public",
    subtitle: "Utilisation du domaine public",
    description: "Suivi de l’occupation des espaces publics",
    icon: MapPinned,
    color: "from-purple-500/20 to-purple-600/20",
    hoverColor: "hover:from-purple-500/30 hover:to-purple-600/30",
    borderColor: "border-purple-200/50",
    link: "/error",
  },
  {
    id: 6,
    title: "Documents",
    subtitle: "Fichiers importants",
    description: "Téléchargez ou consultez vos documents",
    icon: FileText,
    color: "from-sky-500/20 to-sky-600/20",
    hoverColor: "hover:from-sky-500/30 hover:to-sky-600/30",
    borderColor: "border-sky-200/50",
    link: "/error",
  },
  {
    id: 7,
    title: "Calcul de la taxe urbaine",
    subtitle: "Simulateur intelligent",
    description: "Découvrez comment calculer votre taxe urbaine",
    icon: Calculator,
    color: "from-indigo-500/20 to-indigo-600/20",
    hoverColor: "hover:from-indigo-500/30 hover:to-indigo-600/30",
    borderColor: "border-indigo-200/50",
    link: "/error",
  },
  {
    id: 8,
    title: "Support",
    subtitle: "Aide et assistance",
    description: "Contactez-nous pour toute question",
    icon: LifeBuoy,
    color: "from-gray-500/20 to-gray-600/20",
    hoverColor: "hover:from-gray-500/30 hover:to-gray-600/30",
    borderColor: "border-gray-200/50",
    link: "/error",
  },
];

export default function VerticalNavLanding() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const headerTitle = "Bienvenue à La Regie 🏦";
  const intoText =
    "Vous trouverez ici les taxes perçues par la Régie et vous pourrez calculer votre taxe 🧾.";
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4">
            {headerTitle}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{intoText}</p>
        </div>

        <nav className="space-y-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isHovered = hoveredItem === item.id;

            return (
              <div
                key={item.id}
                className={`
                  group relative w-full p-6 md:p-8 rounded-2xl border-2 
                  bg-gradient-to-r ${item.color} ${item.hoverColor} ${
                  item.borderColor
                }
                  backdrop-blur-sm cursor-pointer
                  transform transition-all duration-500 ease-out
                  hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/10
                  hover:-translate-y-1
                  ${
                    isHovered
                      ? "shadow-2xl shadow-black/10 scale-[1.02] -translate-y-1"
                      : "shadow-lg shadow-black/5"
                  }
                `}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link href={item.link}>
                  {/* 3D Background Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      {/* Icon with 3D effect */}
                      <div
                        className={`
                      p-4 rounded-xl bg-white/80 backdrop-blur-sm
                      shadow-lg transform transition-all duration-300
                      group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl
                      ${isHovered ? "scale-110 rotate-3 shadow-xl" : ""}
                    `}
                      >
                        <Icon className="w-8 h-8 text-slate-700" />
                      </div>

                      {/* Text Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 font-medium mb-1 transition-colors duration-300">
                          {item.subtitle}
                        </p>
                        <p
                          className={`
                        text-slate-500 transition-all duration-500 transform
                        ${
                          isHovered
                            ? "opacity-100 translate-x-2"
                            : "opacity-70 translate-x-0"
                        }
                      `}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Arrow with animation */}
                    <div
                      className={`
                    transform transition-all duration-300
                    ${
                      isHovered
                        ? "translate-x-2 scale-110"
                        : "translate-x-0 scale-100"
                    }
                  `}
                    >
                      <ChevronRight className="w-8 h-8 text-slate-400 group-hover:text-slate-600" />
                    </div>
                  </div>

                  {/* Bottom highlight bar */}
                  <div
                    className={`
                  absolute bottom-0 left-6 right-6 h-1 rounded-full
                  bg-gradient-to-r ${item.color.replace("/20", "/60")}
                  transform transition-all duration-500 origin-left
                  ${
                    isHovered
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0"
                  }
                `}
                  />
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="text-center mt-16 text-slate-500">
        </div>
      </div>
    </div>
  );
}
