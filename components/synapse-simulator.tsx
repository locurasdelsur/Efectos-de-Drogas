"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw } from "lucide-react"

interface SynapseSimulatorProps {
  drug: string
}

export function SynapseSimulator({ drug }: SynapseSimulatorProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [neurotransmitters, setNeurotransmitters] = useState<
    Array<{ id: number; x: number; y: number; type: string; active: boolean }>
  >([])
  const [drugMolecules, setDrugMolecules] = useState<Array<{ id: number; x: number; y: number }>>([])

  const drugConfig = getDrugConfig(drug)

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        // Simulate neurotransmitter release
        if (Math.random() > 0.7) {
          const newNT = {
            id: Date.now(),
            x: 20,
            y: 50 + Math.random() * 20,
            type: drugConfig.primaryNT,
            active: true,
          }
          setNeurotransmitters((prev) => [...prev, newNT])
        }

        // Add drug molecules
        if (Math.random() > 0.8) {
          const newDrug = {
            id: Date.now() + Math.random(),
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10,
          }
          setDrugMolecules((prev) => [...prev, newDrug])
        }

        // Move neurotransmitters
        setNeurotransmitters((prev) =>
          prev
            .map((nt) => ({
              ...nt,
              x: nt.x + 2,
            }))
            .filter((nt) => nt.x < 85),
        )

        // Clean up old drug molecules
        setDrugMolecules((prev) => prev.slice(-8))
      }, 200)

      return () => clearInterval(interval)
    }
  }, [isPlaying, drugConfig.primaryNT])

  const handleReset = () => {
    setIsPlaying(false)
    setNeurotransmitters([])
    setDrugMolecules([])
  }

  return (
    <Card className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm">
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-semibold mb-1 text-balance">Simulación de Sinapsis</h3>
            <p className="text-xs sm:text-sm text-muted-foreground text-pretty">{drugConfig.description}</p>
          </div>
          <div className="flex gap-2 justify-center sm:justify-end">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
              className="h-9 w-9 sm:h-10 sm:w-10"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleReset}
              className="h-9 w-9 sm:h-10 sm:w-10 bg-transparent"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="relative w-full aspect-video sm:aspect-[16/10] md:aspect-video bg-gradient-to-br from-secondary/30 to-muted/30 rounded-xl border-2 border-border/50 overflow-hidden">
          {/* Presynaptic Neuron */}
          <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-gradient-to-r from-primary/20 to-transparent">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary/40 border-2 border-primary animate-pulse" />
            <div className="absolute left-2 sm:left-4 top-2 sm:top-4 text-[10px] sm:text-xs font-medium text-foreground">
              Neurona Presináptica
            </div>
          </div>

          {/* Synaptic Cleft */}
          <div className="absolute left-1/4 right-1/4 top-0 bottom-0 bg-accent/5">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] sm:text-xs font-medium text-muted-foreground text-center px-2">
              Espacio Sináptico
            </div>
          </div>

          {/* Postsynaptic Neuron */}
          <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-gradient-to-l from-accent/20 to-transparent">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-accent/40 border-2 border-accent" />
            <div className="absolute right-2 sm:right-4 top-2 sm:top-4 text-[10px] sm:text-xs font-medium text-foreground text-right">
              Neurona Postsináptica
            </div>
          </div>

          {/* Neurotransmitters */}
          {neurotransmitters.map((nt) => (
            <div
              key={nt.id}
              className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-chart-2 border border-chart-2/50 animate-pulse transition-all duration-200"
              style={{
                left: `${nt.x}%`,
                top: `${nt.y}%`,
              }}
            />
          ))}

          {/* Drug Molecules */}
          {drugMolecules.map((drug) => (
            <div
              key={drug.id}
              className="absolute w-3 h-3 sm:w-4 sm:h-4 rounded-sm bg-destructive/60 border border-destructive rotate-45 animate-pulse"
              style={{
                left: `${drug.x}%`,
                top: `${drug.y}%`,
              }}
            />
          ))}

          {/* Drug Effect Indicator */}
          {drugMolecules.length > 0 && (
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 px-2 sm:px-4 py-1 sm:py-2 bg-destructive/20 border border-destructive/30 rounded-lg text-[10px] sm:text-xs font-medium text-destructive backdrop-blur-sm">
              {drugConfig.effectLabel}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 pt-3 sm:pt-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-chart-2 border border-chart-2/50 shrink-0" />
            <span className="text-xs sm:text-sm text-muted-foreground">{drugConfig.primaryNT}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm bg-destructive/60 border border-destructive rotate-45 shrink-0" />
            <span className="text-xs sm:text-sm text-muted-foreground">{drugConfig.drugName}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-primary/40 border-2 border-primary shrink-0" />
            <span className="text-xs sm:text-sm text-muted-foreground">Vesículas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-accent/40 border-2 border-accent shrink-0" />
            <span className="text-xs sm:text-sm text-muted-foreground">Receptores</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

function getDrugConfig(drug: string) {
  const configs: Record<string, any> = {
    alcohol: {
      drugName: "Etanol",
      primaryNT: "Glutamato",
      description: "El etanol inhibe el efecto excitador del glutamato",
      effectLabel: "Inhibición de Glutamato",
    },
    marihuana: {
      drugName: "THC",
      primaryNT: "Dopamina",
      description: "Los cannabinoides afectan la liberación de GABA y dopamina",
      effectLabel: "Aumento de Dopamina",
    },
    nicotina: {
      drugName: "Nicotina",
      primaryNT: "Dopamina",
      description: "Genera liberación de dopamina, acetilcolina y norepinefrina",
      effectLabel: "Liberación de Neurotransmisores",
    },
    cocaina: {
      drugName: "Cocaína",
      primaryNT: "Dopamina",
      description: "Bloquea la recaptación de dopamina hacia la neurona",
      effectLabel: "Bloqueo de Recaptación",
    },
  }

  return configs[drug] || configs.alcohol
}
