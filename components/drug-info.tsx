import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Info, Zap, Brain } from "lucide-react"
import Image from "next/image"

interface DrugInfoProps {
  drug: string
}

export function DrugInfo({ drug }: DrugInfoProps) {
  const info = getDrugInfo(drug)

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Main Info Card */}
      <Card className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm">
        <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 shrink-0">
            <Info className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 text-balance">{info.name}</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-pretty">{info.description}</p>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div className="p-3 sm:p-4 bg-secondary/50 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
              <Zap className="w-4 h-4 text-accent shrink-0" />
              Componente Activo
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed text-pretty">
              {info.activeComponent}
            </p>
          </div>

          <div className="p-3 sm:p-4 bg-secondary/50 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
              <Brain className="w-4 h-4 text-accent shrink-0" />
              Mecanismo de Acción
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed text-pretty">{info.mechanism}</p>
          </div>
        </div>
      </Card>

      {/* Image Card */}
      {info.imagePath && (
        <Card className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm">
          <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Diagrama Científico</h4>
          <div className="relative w-full aspect-video sm:aspect-[4/3] bg-secondary/30 rounded-lg overflow-hidden border border-border/50">
            <Image
              src={info.imagePath || "/placeholder.svg"}
              alt={`Diagrama del mecanismo de acción de ${info.name}`}
              fill
              className="object-contain p-2 sm:p-4"
              priority
            />
          </div>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 sm:mt-3 text-center text-pretty">
            {info.imageCaption}
          </p>
        </Card>
      )}

      {/* Effects Card */}
      <Card className="p-4 sm:p-6 bg-card/80 backdrop-blur-sm">
        <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Efectos en el Organismo</h4>
        <ul className="space-y-2 sm:space-y-3">
          {info.effects.map((effect, index) => (
            <li key={index} className="flex items-start gap-2 sm:gap-3">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent mt-1.5 sm:mt-2 shrink-0" />
              <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed text-pretty">{effect}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Warning Alert */}
      <Alert className="border-destructive/50 bg-destructive/10">
        <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
        <AlertDescription className="text-xs sm:text-sm leading-relaxed text-pretty">
          <span className="font-semibold text-destructive">Advertencia:</span> {info.warning}
        </AlertDescription>
      </Alert>
    </div>
  )
}

function getDrugInfo(drug: string) {
  const infos: Record<string, any> = {
    alcohol: {
      name: "Alcohol Etílico (Etanol)",
      description:
        "El etanol es el componente principal de las bebidas alcohólicas. Tiene una baja masa molecular y no requiere ser digerido, pasando rápidamente al torrente sanguíneo debido a su alta solubilidad en agua.",
      activeComponent:
        "Etanol (C₂H₅OH) - Molécula pequeña y soluble en agua que atraviesa fácilmente las membranas celulares.",
      mechanism:
        "El principal mecanismo de acción del etanol es inhibir el efecto excitador del neurotransmisor glutamato, produciendo principalmente un efecto sedante en el sistema nervioso central.",
      imagePath: "/images/alcohol-mechanism.png",
      imageCaption:
        "El alcohol (cuadrados verdes) bloquea los receptores de glutamato en la neurona postsináptica, inhibiendo su efecto excitador.",
      effects: [
        "Efecto sedante y depresor del sistema nervioso central",
        "Alteraciones en la toma de decisiones y control de impulsos",
        "Afectación del área cerebral relacionada con la formación de memoria",
        "Disminución de la coordinación motora y reflejos",
        "Alteración del juicio y la percepción",
      ],
      warning:
        "El consumo excesivo de alcohol puede causar daño cerebral permanente, deterioro cognitivo, dependencia física y psicológica, y daños graves en múltiples órganos.",
    },
    marihuana: {
      name: "Marihuana (Cannabis)",
      description:
        "La marihuana se extrae de la Cannabis sativa, una planta que contiene compuestos denominados cannabinoides, entre los cuales se encuentra el THC (tetrahidrocannabinol). Los cannabinoides pueden permanecer en el cuerpo por períodos prolongados.",
      activeComponent:
        "THC (Tetrahidrocannabinol) - Principal cannabinoide psicoactivo presente en la planta Cannabis sativa.",
      mechanism:
        "Los cannabinoides afectan la liberación de GABA en el espacio sináptico. Normalmente, GABA impide la liberación de dopamina, pero el THC interfiere con este proceso, permitiendo mayor liberación de dopamina.",
      imagePath: "/images/marihuana-mechanism.png",
      imageCaption:
        "Arriba: Sin THC, GABA se libera normalmente. Abajo: Con THC (moléculas rojas), se bloquea GABA y aumenta la liberación de dopamina.",
      effects: [
        "Aumento en la liberación de dopamina",
        "Sensación de relajación y euforia",
        "Alteración de la percepción del tiempo",
        "Afectación de la memoria a corto plazo",
        "Cambios en la conducta motora",
        "Puede detectarse en pruebas varios días después del consumo",
      ],
      warning:
        "El consumo de marihuana puede afectar el desarrollo cerebral en adolescentes, causar problemas de memoria y aprendizaje, y en algunos casos desencadenar trastornos psicológicos.",
    },
    nicotina: {
      name: "Nicotina",
      description:
        "La nicotina es una sustancia que se encuentra en las plantas de tabaco. Su consumo es principalmente a través de cigarrillos o por masticación. Es una droga que llega rápidamente al sistema nervioso, ya que se absorbe fácilmente a través de la inhalación.",
      activeComponent: "Nicotina (C₁₀H₁₄N₂) - Alcaloide presente en las hojas de tabaco, altamente adictivo.",
      mechanism:
        "Genera la liberación de múltiples neurotransmisores: dopamina en zonas cerebrales relacionadas con el placer, acetilcolina y norepinefrina, produciendo un estado de alerta y atención.",
      imagePath: "/images/nicotina-cycle.png",
      imageCaption:
        "Ciclo de la nicotina en el cerebro, mostrando las diferentes áreas afectadas y los neurotransmisores liberados.",
      effects: [
        "Liberación de dopamina (efecto placentero y adictivo)",
        "Aumento de acetilcolina (mejora temporal de atención)",
        "Liberación de norepinefrina (estado de alerta)",
        "Aumento temporal de la concentración",
        "Elevación de la frecuencia cardíaca y presión arterial",
        "Alta capacidad adictiva",
      ],
      warning:
        "La nicotina es extremadamente adictiva. El consumo de tabaco está asociado con cáncer, enfermedades cardiovasculares, problemas respiratorios y reducción significativa de la esperanza de vida.",
    },
    cocaina: {
      name: "Cocaína",
      description:
        "La cocaína es una sustancia psicoactiva que se obtiene del procesamiento químico de las hojas del arbusto de coca, presente principalmente en Bolivia y Perú. Es un estimulante potente del sistema nervioso central.",
      activeComponent: "Clorhidrato de cocaína - Alcaloide extraído y procesado de las hojas de coca.",
      mechanism:
        "Actúa bloqueando los canales que recuperan la dopamina hacia la neurona presináptica después de enviar la información. Esto genera que quede continuamente dopamina en el medio y la neurona postsináptica se sobreestimule.",
      imagePath: "/images/cocaine-mechanism.png",
      imageCaption:
        "La cocaína (moléculas naranjas) bloquea los canales de recaptación de dopamina, causando acumulación en el espacio sináptico.",
      effects: [
        "Sobreestimulación continua por acumulación de dopamina",
        "Incremento en la lucidez y estado de alerta",
        "Sensación constante de bienestar y euforia intensa",
        "Aumento de la energía y actividad motora",
        "Deterioro neuronal progresivo con el uso continuado",
        "Riesgo de arritmias cardíacas y accidentes cerebrovasculares",
      ],
      warning:
        "La cocaína es altamente adictiva y causa deterioro neuronal grave. Puede provocar infartos, derrames cerebrales, daño cardíaco permanente, psicosis y muerte súbita incluso en consumidores ocasionales.",
    },
  }

  return infos[drug] || infos.alcohol
}
