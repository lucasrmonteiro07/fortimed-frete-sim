# 📋 TABELA OFICIAL CORRIGIDA + FÓRMULA CORRETA

## 1️⃣ ESTRUTURA CORRETA DE DADOS

```javascript
// ESTRUTURA CORRETA:
const precos = {
  'SP1': { taxa: 70.82, freteQuilo: 1.152 },
  'SP2': { taxa: 69.92, freteQuilo: 1.139 },
  'SP3': { taxa: 74.26, freteQuilo: 1.204 },
  // ... etc
}

// ERRADO (Atual):
const precos = {
  'SP1': { minimo: 10.50, porKg: 1.20 },  // ❌ DESCARTÁVEL!
}
```

---

## 2️⃣ FÓRMULA CORRETA DE CÁLCULO

```javascript
const calcularFrete = (zona, peso, valorNota, isSP) => {
  const precosZona = precos[zona]
  
  // 1️⃣ FRETE BASE = Taxa + (Peso × Frete/kg)
  let freteBase = precosZona.taxa + (peso * precosZona.freteQuilo)
  
  // 2️⃣ ACRÉSCIMO POR PESO
  if (peso > 1000) {
    freteBase += freteBase * 0.25  // +25%
  } else if (peso > 500) {
    freteBase += freteBase * 0.10  // +10%
  }
  
  // 3️⃣ PEDÁGIO (por fração de 100kg)
  const pedagio = Math.ceil(peso / 100) * (isSP ? 6.18 : 3.31)
  
  // 4️⃣ GRIS (0,20% SP / 0,15% demais com mínimo)
  const grisPercentual = isSP ? 0.0020 : 0.0015
  const grisMinimo = isSP ? 6.18 : 3.31
  const gris = valorNota > 0 
    ? Math.max(valorNota * grisPercentual, grisMinimo)
    : grisMinimo
  
  // 5️⃣ TOTAL
  return freteBase + pedagio + gris
}
```

---

## 3️⃣ TABELA COMPLETA CORRIGIDA (23 Zonas)

```javascript
const precos = {
  // SÃO PAULO (3 zonas)
  'SP1': { taxa: 70.82, freteQuilo: 1.152 },
  'SP2': { taxa: 69.92, freteQuilo: 1.139 },
  'SP3': { taxa: 74.26, freteQuilo: 1.204 },
  
  // PARANÁ (6 zonas)
  'PR1': { taxa: 43.99, freteQuilo: 0.746 },
  'PR2': { taxa: 52.91, freteQuilo: 0.881 },
  'PR3': { taxa: 59.78, freteQuilo: 0.985 },
  'PR4': { taxa: 45.85, freteQuilo: 0.774 },
  'PR5': { taxa: 58.53, freteQuilo: 0.965 },
  'PR6': { taxa: 51.88, freteQuilo: 0.866 },
  
  // SANTA CATARINA (6 zonas)
  'SC1': { taxa: 39.07, freteQuilo: 0.671 },
  'SC2': { taxa: 37.26, freteQuilo: 0.643 },
  'SC3': { taxa: 42.75, freteQuilo: 0.727 },
  'SC4': { taxa: 42.04, freteQuilo: 0.717 },
  'SC5': { taxa: 48.38, freteQuilo: 0.812 },
  'SC6': { taxa: 34.87, freteQuilo: 0.608 },
  
  // RIO GRANDE DO SUL (8 zonas)
  'RS1': { taxa: 26.44, freteQuilo: 0.481 },
  'RS2': { taxa: 25.22, freteQuilo: 0.463 },
  'RS3': { taxa: 30.25, freteQuilo: 0.538 },
  'RS4': { taxa: 35.80, freteQuilo: 0.621 },
  'RS5': { taxa: 29.64, freteQuilo: 0.529 },
  'RS6': { taxa: 41.84, freteQuilo: 0.712 },
  'RS7': { taxa: 34.13, freteQuilo: 0.598 },
  'RS8': { taxa: 30.82, freteQuilo: 0.546 }
}
```

---

## 4️⃣ CONSTANTES IMPORTANTES

```javascript
// PEDÁGIO (por fração de 100kg)
const PEDAGIO_SP = 6.18
const PEDAGIO_OUTROS = 3.31

// GRIS (% sobre valor da NF com mínimos)
const GRIS_SP_PERCENTUAL = 0.0020      // 0,20%
const GRIS_SP_MINIMO = 6.18
const GRIS_OUTROS_PERCENTUAL = 0.0015  // 0,15%
const GRIS_OUTROS_MINIMO = 3.31

// ACRÉSCIMOS POR PESO
const AUMENTO_500A1000KG = 0.10        // +10%
const AUMENTO_ACIMA1000KG = 0.25       // +25%

// PEQUENOS VOLUMES (S.V.D.)
const SVD_SP = 92.00
const SVD_PR = 76.00
const SVD_SC = 59.50
const SVD_RS = 43.50
```

---

## 5️⃣ REGIÕES RS CORRIGIDAS (8 regiões)

```javascript
const regiaoInfo = {
  'RS1': {
    nome: 'RS1 - Região Metropolitana de Porto Alegre e Vale dos Sinos',
    cidades: 'Porto Alegre, Canoas, Gravataí, Cachoeirinha, Esteio, Sapucaia do Sul, São Leopoldo, Novo Hamburgo, Campo Bom, Estância Velha, Ivoti, Dois Irmãos, Feliz, Bom Princípio, Capela de Santana, São Sebastião do Caí, Brochier, Charqueadas, Eldorado do Sul, Arroio dos Ratos, Guaíba, Barra do Ribeiro, Butiá'
  },
  'RS2': {
    nome: 'RS2 - Serra Gaúcha e Hortênsias',
    cidades: 'Caxias do Sul, Farroupilha, Bento Gonçalves, Garibaldi, Carlos Barbosa, Flores da Cunha, Nova Petrópolis, Gramado, Canela, Veranópolis, Vila Flores, Antônio Prado, Guaporé, Nova Prata, Cotiporã, Fagundes Varela, Monte Belo do Sul, Santa Tereza'
  },
  'RS3': {
    nome: 'RS3 - Região dos Vales (Taquari / Rio Pardo)',
    cidades: 'Lajeado, Estrela, Teutônia, Encantado, Arroio do Meio, Venâncio Aires, Santa Cruz do Sul, Vera Cruz, Sobradinho, Passo do Sobrado, Cruzeiro do Sul, Paverama, Imigrante, Colinas, Poço das Antas'
  },
  'RS4': {
    nome: 'RS4 - Região Noroeste / Missões',
    cidades: 'Santo Ângelo, Ijuí, Panambi, Cruz Alta, Três de Maio, Santa Rosa, Horizontina, Giruá, São Luiz Gonzaga, Cerro Largo, São Borja, Roque Gonzales, Caibaté, Guarani das Missões, Salvador das Missões'
  },
  'RS5': {
    nome: 'RS5 - Região Norte / Alto Uruguai',
    cidades: 'Passo Fundo, Erechim, Getúlio Vargas, Sananduva, Lagoa Vermelha, Tapejara, Marau, Casca, Ibiaçá, Cacique Doble, Machadinho, Maximiliano de Almeida, Viadutos, Gaurama, Aratiba'
  },
  'RS6': {
    nome: 'RS6 - Região Sul / Litoral',
    cidades: 'Pelotas, Rio Grande, São Lourenço do Sul, Canguçu, Arroio Grande, Jaguarão, Piratini, Turuçu, Santa Vitória do Palmar, Chuí, Mostardas, Palmares do Sul, Tramandaí, Osório, Capão da Canoa, Torres'
  },
  'RS7': {
    nome: 'RS7 - Região Centro / Fronteira Oeste',
    cidades: 'Santa Maria, Cachoeira do Sul, São Gabriel, Rosário do Sul, Alegrete, Uruguaiana, Itaqui, São Vicente do Sul, Dom Pedrito, Bagé, Lavras do Sul, Santana do Livramento, Quaraí'
  },
  'RS8': {
    nome: 'RS8 - Região Planalto Médio / Campos de Cima da Serra',
    cidades: 'Vacaria, Lagoa Vermelha, Muitos Capões, Esmeralda, São José dos Ausentes, Bom Jesus, Cambará do Sul, Ipê, André da Rocha, Campestre da Serra'
  }
}
```

---

## 6️⃣ EXEMPLO DE CÁLCULO PASSO A PASSO

```
ENTRADA:
- Zona: SP1
- Peso: 150kg
- Valor Nota: R$ 3.000
- É SP? Sim

CÁLCULO:

1️⃣ Frete Base
   = Taxa + (Peso × Frete/kg)
   = 70.82 + (150 × 1.152)
   = 70.82 + 172.80
   = R$ 243.62

2️⃣ Acréscimo por Peso
   150kg < 500kg → Sem acréscimo
   = R$ 0.00

3️⃣ Pedágio
   = ceil(150 / 100) × 6.18
   = ceil(1.5) × 6.18
   = 2 × 6.18
   = R$ 12.36

4️⃣ GRIS
   = MAX(3000 × 0.20%, 6.18)
   = MAX(6.00, 6.18)
   = R$ 6.18

TOTAL = 243.62 + 0.00 + 12.36 + 6.18 = R$ 262.16
```

