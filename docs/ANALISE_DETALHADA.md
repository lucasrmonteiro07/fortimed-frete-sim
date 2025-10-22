# 🔍 ANÁLISE DETALHADA DO CÁLCULO DE FRETE

## ❌ PROBLEMAS CRÍTICOS IDENTIFICADOS

### 1. **DADOS DE PREÇOS DESATUALIZADOS (CRÍTICO)**

**Situação Atual:**
```
SP1: { minimo: 10.50, porKg: 1.20 }
PR1: { minimo: 13.50, porKg: 1.40 }
RS1: { minimo: 15.00, porKg: 1.55 }
```

**Deve Ser (Tabela Oficial):**
```
SP1: { taxa: 70.82, freteQuilo: 1.152 }
PR1: { taxa: 43.99, freteQuilo: 0.746 }
RS1: { taxa: 26.44, freteQuilo: 0.481 }
```

**Todas as 23 zonas estão com dados incorretos!**

---

### 2. **FÓRMULA DE CÁLCULO INCORRETA (CRÍTICO)**

**Código Atual:**
```javascript
const frete = Math.max(precosZona.minimo, pesoNum * precosZona.porKg)
```

**Problema:** 
- Não está somando a TAXA (valor fixo)
- Está comparando mínimo com peso × preço (NÃO FARÁ SENTIDO com novos dados)

**Deve Ser:**
```javascript
1. Frete Base = Taxa (R$) + (Peso × Frete/kg)
2. Aplicar acréscimo por peso se > 500kg
3. Calcular Pedágio
4. Calcular GRIS
5. Total = Frete Base + Pedágio + GRIS
```

---

### 3. **PEDÁGIO NÃO IMPLEMENTADO (CRÍTICO)**

**O que deveria estar calculando:**
```javascript
const pedagio = Math.ceil(pesoNum / 100) * (isSP ? 6.18 : 3.31)
```

**Exemplos:**
- 50kg em SP: ceil(50/100) × 6.18 = 1 × 6.18 = R$ 6.18
- 150kg em SP: ceil(150/100) × 6.18 = 2 × 6.18 = R$ 12.36
- 250kg em PR: ceil(250/100) × 3.31 = 3 × 3.31 = R$ 9.93

**Status:** ❌ Não está sendo calculado

---

### 4. **GRIS CALCULADO INCORRETAMENTE (CRÍTICO)**

**Código Atual:**
```javascript
const percentualNota = 0.02 // 2% ← ERRADO!
const taxaNota = valorNotaNum * percentualNota
```

**Deve Ser:**
```javascript
// GRIS: 0,50% sobre valor da NF com mínimo
const grisPercentual = isSP ? 0.0020 : 0.0015 // 0,20% SP / 0,15% demais
const grisMinimo = isSP ? 6.18 : 3.31
const gris = valorNotaNum > 0 
  ? Math.max(valorNotaNum * grisPercentual, grisMinimo)
  : grisMinimo
```

**Exemplos:**
- Nota R$ 1.000 em SP: MAX(1000 × 0,20%, 6.18) = MAX(2.00, 6.18) = **R$ 6.18**
- Nota R$ 5.000 em SP: MAX(5000 × 0,20%, 6.18) = MAX(10.00, 6.18) = **R$ 10.00**
- Nota R$ 3.000 em PR: MAX(3000 × 0,15%, 3.31) = MAX(4.50, 3.31) = **R$ 4.50**

**Status:** ❌ Está usando 2% fixo em vez de 0,20%/0,15% com mínimo

---

### 5. **ACRÉSCIMOS POR PESO NÃO IMPLEMENTADOS (CRÍTICO)**

**Não está calculando:**
```javascript
// Mercadorias 500-1000kg: +10%
// Mercadorias >1000kg: +25%
```

**Deve Ser:**
```javascript
let freteBase = taxa + (peso × freteQuilo)

if (peso > 1000) {
  freteBase += freteBase * 0.25 // +25%
} else if (peso > 500) {
  freteBase += freteBase * 0.10 // +10%
}
```

**Exemplo:**
- 600kg em SP1: 
  - Frete Base: 70.82 + (600 × 1.152) = 761.12
  - Acréscimo 10%: 761.12 × 0.10 = 76.11
  - **Total: R$ 837.23**

**Status:** ❌ Não implementado

---

### 6. **DADOS REGIONAIS RS INCORRETOS**

**Atual (Incompleto):**
```
RS1: 'Porto Alegre'
RS2: 'Caxias do Sul, Bento Gonçalves'
```

**Deve Ser (Completo):**
```
RS1: 'Região Metropolitana de Porto Alegre e Vale dos Sinos'
     Porto Alegre, Canoas, Gravataí, Cachoeirinha, Esteio, Sapucaia do Sul,
     São Leopoldo, Novo Hamburgo, Campo Bom, Estância Velha, Ivoti, Dois Irmãos...

RS2: 'Serra Gaúcha e Hortênsias'
     Caxias do Sul, Farroupilha, Bento Gonçalves, Garibaldi, Carlos Barbosa,
     Flores da Cunha, Nova Petrópolis, Gramado, Canela, Veranópolis...
```

**Status:** ❌ 8 regiões desatualizadas

---

## 📊 COMPARAÇÃO REAL DE CÁLCULOS

### Exemplo: 100kg em SP1, Nota de R$ 2.000

**CÁLCULO ATUAL (INCORRETO):**
```
Frete = MAX(10.50, 100 × 1.20)
Frete = MAX(10.50, 120.00)
Frete = R$ 120.00

Taxa Nota = 2.000 × 2% = R$ 40.00

TOTAL CALCULADO = R$ 160.00 ← INCORRETO!
```

**CÁLCULO CORRETO:**
```
1. Frete Base = 70.82 + (100 × 1.152) = R$ 186.02
2. Acréscimo peso = 0% (< 500kg) = R$ 0.00
3. Pedágio = ceil(100/100) × 6.18 = 1 × 6.18 = R$ 6.18
4. GRIS = MAX(2000 × 0.20%, 6.18) = MAX(4.00, 6.18) = R$ 6.18

TOTAL CORRETO = 186.02 + 6.18 + 6.18 = R$ 198.38 ← CORRETO!
```

**Diferença:** R$ 198.38 vs R$ 160.00 = **24% a menos (ERRO!)**

---

### Exemplo: 600kg em PR2, Nota de R$ 1.500

**CÁLCULO ATUAL (INCORRETO):**
```
Frete = MAX(15.00, 600 × 1.55)
Frete = MAX(15.00, 930.00)
Frete = R$ 930.00

Taxa Nota = 1.500 × 2% = R$ 30.00

TOTAL CALCULADO = R$ 960.00 ← MUITO INCORRETO!
```

**CÁLCULO CORRETO:**
```
1. Frete Base = 52.91 + (600 × 0.881) = R$ 581.01
2. Acréscimo peso = +10% (500-1000kg) = 581.01 × 0.10 = R$ 58.10
3. Frete com acréscimo = R$ 639.11
4. Pedágio = ceil(600/100) × 3.31 = 6 × 3.31 = R$ 19.86
5. GRIS = MAX(1500 × 0.15%, 3.31) = MAX(2.25, 3.31) = R$ 3.31

TOTAL CORRETO = 639.11 + 19.86 + 3.31 = R$ 662.28 ← CORRETO!
```

**Diferença:** R$ 662.28 vs R$ 960.00 = **45% a mais (ERRO CRÍTICO!)**

---

## ✅ CHECKLIST DE CORREÇÕES

- [ ] **Atualizar 23 zonas** com Taxa (R$) e Frete/kg corretos
- [ ] **Atualizar 8 regiões RS** com cidades detalhadas
- [ ] **Implementar nova fórmula:**
  - Taxa + (Peso × Frete/kg)
  - Acréscimo por peso
  - Pedágio
  - GRIS
- [ ] **Implementar cálculo de Pedágio** corretamente
- [ ] **Implementar GRIS** com % correto e mínimo
- [ ] **Implementar acréscimos** 500-1000kg (+10%) e >1000kg (+25%)
- [ ] **Testar com exemplos reais** da tabela
- [ ] **Validar interface** para mostrar breakdown completo

---

## 🚨 RISCO

**Situação Atual:** Cotações estão até **45% incorretas**  
**Impacto:** Margem de lucro pode ser negativa  
**Urgência:** 🔴 CRÍTICA - Corrigir imediatamente!

