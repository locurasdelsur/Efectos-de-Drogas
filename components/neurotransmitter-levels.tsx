"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface NeurotransmitterLevelsProps {
  drug: string
}

export function NeurotransmitterLevels({ drug }: NeurotransmitterLevelsProps) {
  const levels = getNeurotransmitterLevels(drug)

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-balance">Niveles de Neurotransmisores</h3>
        <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 leading-relaxed text-pretty">
          Comparación de los niveles de neurotransmisores en estado normal vs. bajo el efecto de {levels.drugName}.
        </p>

        <div className="space-y-4 sm:space-y-6">
          {levels.neurotransmitters.map((nt, index) => (
            <div key={index} className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shrink-0"
                    style={{ backgroundColor: nt.color }}
                  />
                  <span className="font-medium text-sm sm:text-base truncate">{nt.name}</span>
                </div>
                <Badge
                  variant={
                    nt.change === "increase" ? "default" : nt.change === "decrease" ? "destructive" : "secondary"
                  }
                  className="gap-1 text-xs shrink-0"
                >
                  {nt.change === "increase" && <TrendingUp className="w-3 h-3" />}
                  {nt.change === "decrease" && <TrendingDown className="w-3 h-3" />}
                  {nt.change === "stable" && <Minus className="w-3 h-3" />}
                  <span className="hidden sm:inline">{nt.changeLabel}</span>
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground">
                  <span>Normal</span>
                  <span>Con {levels.drugName}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <div>
                    <Progress value={50} className="h-1.5 sm:h-2" />
                  </div>
                  <div>
                    <Progress
                      value={nt.level}
                      className="h-1.5 sm:h-2"
                      style={
                        {
                          "--progress-background": nt.color,
                        } as React.CSSProperties
                      }
                    />
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed text-pretty">{nt.description}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 sm:p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <h4 className="font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-base sm:text-lg">
          <span className="text-lg sm:text-xl">⚡</span>
          Resumen de Efectos
        </h4>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed text-pretty">{levels.summary}</p>
      </Card>
    </div>
  )
}

function getNeurotransmitterLevels(drug: string) {
  const configs: Record<string, any> = {
    alcohol: {
      drugName: "Alcohol",
      neurotransmitters: [
        {
          name: "Glutamato",
          color: "#ef4444",
          level: 20,
          change: "decrease",
          changeLabel: "Disminuye",
          description:
            "El etanol inhibe el efecto excitador del glutamato, reduciendo significativamente su actividad y produciendo un efecto sedante general.",
        },
        {
          name: "GABA",
          color: "#3b82f6",
          level: 75,
          change: "increase",
          changeLabel: "Aumenta",
          description:
            "El alcohol potencia los efectos del GABA, el principal neurotransmisor inhibidor, aumentando la sedación.",
        },
        {
          name: "Dopamina",
          color: "#8b5cf6",
          level: 45,
          change: "stable",
          changeLabel: "Variable",
          description: "Los niveles de dopamina pueden variar, contribuyendo a los efectos de recompensa del alcohol.",
        },
      ],
      summary:
        "El alcohol actúa principalmente como depresor del sistema nervioso central, inhibiendo el glutamato y potenciando el GABA. Esto resulta en efectos sedantes, alteración del juicio, pérdida de coordinación y afectación de la memoria.",
    },
    marihuana: {
      drugName: "THC",
      neurotransmitters: [
        {
          name: "Dopamina",
          color: "#8b5cf6",
          level: 80,
          change: "increase",
          changeLabel: "Aumenta",
          description:
            "El THC interfiere con la liberación de GABA, permitiendo mayor liberación de dopamina, lo que produce sensaciones de placer y relajación.",
        },
        {
          name: "GABA",
          color: "#3b82f6",
          level: 30,
          change: "decrease",
          changeLabel: "Disminuye",
          description:
            "Los cannabinoides reducen la liberación de GABA, eliminando su efecto inhibidor sobre la dopamina.",
        },
        {
          name: "Anandamida",
          color: "#10b981",
          level: 70,
          change: "increase",
          changeLabel: "Aumenta",
          description:
            "El THC imita a la anandamida, un cannabinoide endógeno, afectando el estado de ánimo y la percepción.",
        },
      ],
      summary:
        "La marihuana actúa sobre el sistema endocannabinoide, reduciendo la inhibición de GABA y permitiendo mayor liberación de dopamina. Esto produce relajación, alteración de la percepción del tiempo, y afecta la memoria a corto plazo.",
    },
    nicotina: {
      drugName: "Nicotina",
      neurotransmitters: [
        {
          name: "Dopamina",
          color: "#8b5cf6",
          level: 85,
          change: "increase",
          changeLabel: "Aumenta",
          description:
            "La nicotina estimula la liberación de dopamina en el sistema de recompensa cerebral, generando sensación placentera y alta adicción.",
        },
        {
          name: "Acetilcolina",
          color: "#f59e0b",
          level: 80,
          change: "increase",
          changeLabel: "Aumenta",
          description:
            "La nicotina activa los receptores de acetilcolina, mejorando temporalmente la atención y concentración.",
        },
        {
          name: "Norepinefrina",
          color: "#ef4444",
          level: 75,
          change: "increase",
          changeLabel: "Aumenta",
          description:
            "Aumenta la liberación de norepinefrina, generando estado de alerta y aumento de la frecuencia cardíaca.",
        },
      ],
      summary:
        "La nicotina es un potente estimulante que activa múltiples sistemas de neurotransmisores. Genera liberación de dopamina (placer y adicción), acetilcolina (atención) y norepinefrina (alerta), creando una fuerte dependencia física y psicológica.",
    },
    cocaina: {
      drugName: "Cocaína",
      neurotransmitters: [
        {
          name: "Dopamina",
          color: "#8b5cf6",
          level: 95,
          change: "increase",
          changeLabel: "Aumenta Mucho",
          description:
            "La cocaína bloquea la recaptación de dopamina, causando acumulación masiva en la sinapsis y sobreestimulación continua de las neuronas.",
        },
        {
          name: "Serotonina",
          color: "#ec4899",
          level: 70,
          change: "increase",
          changeLabel: "Aumenta",
          description:
            "También bloquea la recaptación de serotonina, contribuyendo a la euforia y alteraciones del estado de ánimo.",
        },
        {
          name: "Norepinefrina",
          color: "#ef4444",
          level: 85,
          change: "increase",
          changeLabel: "Aumenta",
          description:
            "El bloqueo de recaptación de norepinefrina causa aumento de energía, alerta extrema y efectos cardiovasculares peligrosos.",
        },
      ],
      summary:
        "La cocaína bloquea la recaptación de dopamina, serotonina y norepinefrina, causando sobreestimulación extrema. Esto produce euforia intensa, aumento de energía y lucidez, pero causa deterioro neuronal progresivo y riesgo cardiovascular grave.",
    },
  }

  return configs[drug] || configs.alcohol
}
