"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SynapseSimulator } from "@/components/synapse-simulator"
import { DrugInfo } from "@/components/drug-info"
import { NeurotransmitterLevels } from "@/components/neurotransmitter-levels"
import { Brain, Beaker, Activity } from "lucide-react"
import Image from "next/image"

export default function DrugSimulatorPage() {
  const [selectedDrug, setSelectedDrug] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-start sm:items-center gap-2 sm:gap-4 flex-1 min-w-0">
              <Image
                src="/images/logo-escuela.png"
                alt="Logo E.E.S.T. N° 6"
                width={50}
                height={50}
                className="shrink-0 w-10 h-10 sm:w-[60px] sm:h-[60px]"
              />
              <div className="min-w-0 flex-1">
                <h1 className="text-base sm:text-xl md:text-2xl font-bold text-balance leading-tight">
                  Simulador de Efectos de Drogas
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Sistema Nervioso y Neurotransmisores</p>
              </div>
            </div>
            <div className="text-right text-xs sm:text-sm shrink-0">
              <p className="font-semibold text-primary">Prof. Elisabet Martin</p>
              <p className="text-muted-foreground hidden sm:block">E.E.S.T. N° 6 - Banfield</p>
              <p className="text-muted-foreground text-[10px] sm:text-xs">Lomas de Zamora</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
        <Card className="p-4 sm:p-6 mb-4 sm:mb-6 md:mb-8 bg-card/80 backdrop-blur-sm border-border/50">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-accent/10 shrink-0">
              <Beaker className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-balance">
                Bienvenido al Simulador Interactivo
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-pretty">
                Explora cómo diferentes sustancias psicoactivas afectan el sistema nervioso a nivel molecular.
                Selecciona una droga para ver su mecanismo de acción en la sinapsis neuronal y los efectos en los
                neurotransmisores.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
          <DrugCard
            name="Alcohol (Etanol)"
            color="from-amber-500/20 to-orange-500/20"
            borderColor="border-amber-500/30"
            icon="🍺"
            onClick={() => setSelectedDrug("alcohol")}
            isSelected={selectedDrug === "alcohol"}
          />
          <DrugCard
            name="Marihuana (THC)"
            color="from-green-500/20 to-emerald-500/20"
            borderColor="border-green-500/30"
            icon="🌿"
            onClick={() => setSelectedDrug("marihuana")}
            isSelected={selectedDrug === "marihuana"}
          />
          <DrugCard
            name="Nicotina"
            color="from-slate-500/20 to-gray-500/20"
            borderColor="border-slate-500/30"
            icon="🚬"
            onClick={() => setSelectedDrug("nicotina")}
            isSelected={selectedDrug === "nicotina"}
          />
          <DrugCard
            name="Cocaína"
            color="from-red-500/20 to-pink-500/20"
            borderColor="border-red-500/30"
            icon="❄️"
            onClick={() => setSelectedDrug("cocaina")}
            isSelected={selectedDrug === "cocaina"}
          />
        </div>

        {/* Main Content */}
        {selectedDrug ? (
          <Tabs defaultValue="simulation" className="space-y-4 sm:space-y-6">
            <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto h-auto">
              <TabsTrigger value="simulation" className="gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-2.5">
                <Activity className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Simulación</span>
                <span className="sm:hidden">Simular</span>
              </TabsTrigger>
              <TabsTrigger value="info" className="gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-2.5">
                <Beaker className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Información</span>
                <span className="sm:hidden">Info</span>
              </TabsTrigger>
              <TabsTrigger value="levels" className="gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-2.5">
                <Brain className="w-3 h-3 sm:w-4 sm:h-4" />
                Niveles
              </TabsTrigger>
            </TabsList>

            <TabsContent value="simulation" className="space-y-4 sm:space-y-6">
              <SynapseSimulator drug={selectedDrug} />
            </TabsContent>

            <TabsContent value="info" className="space-y-4 sm:space-y-6">
              <DrugInfo drug={selectedDrug} />
            </TabsContent>

            <TabsContent value="levels" className="space-y-4 sm:space-y-6">
              <NeurotransmitterLevels drug={selectedDrug} />
            </TabsContent>
          </Tabs>
        ) : (
          <Card className="p-6 sm:p-8 md:p-12 text-center bg-card/50 backdrop-blur-sm border-dashed">
            <div className="flex flex-col items-center gap-3 sm:gap-4 max-w-md mx-auto">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-muted flex items-center justify-center">
                <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-balance">Selecciona una Droga</h3>
              <p className="text-sm sm:text-base text-muted-foreground text-pretty">
                Elige una de las sustancias psicoactivas arriba para comenzar la simulación y explorar sus efectos en el
                sistema nervioso.
              </p>
            </div>
          </Card>
        )}
      </main>

      <footer className="border-t border-border/50 mt-8 sm:mt-12 md:mt-16 py-4 sm:py-6 bg-card/50">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
            <div className="text-center sm:text-left">
              <p className="font-semibold text-foreground">Escuela de Educación Secundaria Técnica N° 6</p>
              <p className="text-xs sm:text-sm">Banfield, Lomas de Zamora - Buenos Aires, Argentina</p>
            </div>
            <div className="text-center sm:text-right">
              <p>Simulador Educativo de Biología</p>
              <p className="text-[10px] sm:text-xs">Profesora: Elisabet Martin</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

interface DrugCardProps {
  name: string
  color: string
  borderColor: string
  icon: string
  onClick: () => void
  isSelected: boolean
}

function DrugCard({ name, color, borderColor, icon, onClick, isSelected }: DrugCardProps) {
  return (
    <Card
      className={`p-3 sm:p-4 md:p-6 cursor-pointer transition-all hover:scale-105 hover:shadow-lg border-2 ${
        isSelected ? `${borderColor} bg-gradient-to-br ${color} shadow-md` : "border-border/50 bg-card/80 hover:bg-card"
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center gap-2 sm:gap-3 text-center">
        <div className="text-2xl sm:text-3xl md:text-4xl">{icon}</div>
        <h3 className="font-semibold text-xs sm:text-sm md:text-base text-balance leading-tight">{name}</h3>
        {isSelected && <div className="w-full h-1 rounded-full bg-primary/50 animate-pulse" />}
      </div>
    </Card>
  )
}
