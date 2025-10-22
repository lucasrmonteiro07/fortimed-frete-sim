import { useState } from 'react'
import './App.css'

// Dados do Expresso São Miguel - Atualizado com tabela oficial
const transportadoras = [
  { id: 1, nome: 'Expresso São Miguel' }
]

// Regiões por estado
const regioes = {
  1: {
    'São Paulo': ['SP1', 'SP2', 'SP3'],
    'Paraná': ['PR1', 'PR2', 'PR3', 'PR4', 'PR5', 'PR6'],
    'Santa Catarina': ['SC1', 'SC2', 'SC3', 'SC4', 'SC5', 'SC6'],
    'Rio Grande do Sul': ['RS1', 'RS2', 'RS3', 'RS4', 'RS5', 'RS6', 'RS7', 'RS8']
  }
}

// Informações detalhadas das regiões e cidades
const regiaoInfo = {
  'SP1': {
    estado: 'São Paulo',
    nome: 'SP1 - Região Metropolitana de São Paulo',
    cidades: 'São Paulo, Guarulhos, Osasco, Santo André, São Bernardo do Campo, São Caetano do Sul'
  },
  'SP2': {
    estado: 'São Paulo',
    nome: 'SP2 - Interior SP (Campinas / Sorocaba)',
    cidades: 'Campinas, Sorocaba, Jundiaí, Valinhos, Vinhedo, Sumaré'
  },
  'SP3': {
    estado: 'São Paulo',
    nome: 'SP3 - Interior SP (Ribeirão Preto / Araraquara)',
    cidades: 'Ribeirão Preto, Araraquara, São Carlos, Jaboticabal, Brodowski'
  },
  'PR1': {
    estado: 'Paraná',
    nome: 'PR1 - Região Metropolitana de Curitiba',
    cidades: 'Curitiba, Pinhais, Piraquara, Colombo, Almirante Tamandaré, Campo Largo'
  },
  'PR2': {
    estado: 'Paraná',
    nome: 'PR2 - Londrina / Maringá',
    cidades: 'Londrina, Maringá, Apucarana, Cambé, Cornélio Procópio'
  },
  'PR3': {
    estado: 'Paraná',
    nome: 'PR3 - Ponta Grossa',
    cidades: 'Ponta Grossa, Castro, Telêmaco Borba, Carambeí'
  },
  'PR4': {
    estado: 'Paraná',
    nome: 'PR4 - Cascavel',
    cidades: 'Cascavel, Toledo, Foz do Iguaçu, Campo Mourão'
  },
  'PR5': {
    estado: 'Paraná',
    nome: 'PR5 - Demais localidades PR',
    cidades: 'Paranavaí, Umuarama, Cianorte, Guarapuava'
  },
  'PR6': {
    estado: 'Paraná',
    nome: 'PR6 - Demais localidades PR',
    cidades: 'Demais cidades do Paraná'
  },
  'SC1': {
    estado: 'Santa Catarina',
    nome: 'SC1 - Vale do Itajaí',
    cidades: 'Blumenau, Brusque, Indaial, Gaspar, Timbó'
  },
  'SC2': {
    estado: 'Santa Catarina',
    nome: 'SC2 - Grande Florianópolis',
    cidades: 'Florianópolis, Biguaçu, Palhoça, São José'
  },
  'SC3': {
    estado: 'Santa Catarina',
    nome: 'SC3 - Sul SC',
    cidades: 'Criciúma, Tubarão, Içara, Laguna'
  },
  'SC4': {
    estado: 'Santa Catarina',
    nome: 'SC4 - Planalto SC',
    cidades: 'Lages, São Bento do Sul, Rio Negrinho'
  },
  'SC5': {
    estado: 'Santa Catarina',
    nome: 'SC5 - Oeste SC',
    cidades: 'Chapecó, Xanxerê, Concórdia, Videira'
  },
  'SC6': {
    estado: 'Santa Catarina',
    nome: 'SC6 - Demais localidades SC',
    cidades: 'Demais cidades de Santa Catarina'
  },
  'RS1': {
    estado: 'Rio Grande do Sul',
    nome: 'RS1 - Região Metropolitana de Porto Alegre e Vale dos Sinos',
    cidades: 'Porto Alegre, Canoas, Gravataí, Cachoeirinha, Esteio, Sapucaia do Sul, São Leopoldo, Novo Hamburgo, Campo Bom, Estância Velha, Ivoti, Dois Irmãos'
  },
  'RS2': {
    estado: 'Rio Grande do Sul',
    nome: 'RS2 - Serra Gaúcha e Hortênsias',
    cidades: 'Caxias do Sul, Farroupilha, Bento Gonçalves, Garibaldi, Carlos Barbosa, Flores da Cunha, Nova Petrópolis, Gramado, Canela'
  },
  'RS3': {
    estado: 'Rio Grande do Sul',
    nome: 'RS3 - Região dos Vales (Taquari / Rio Pardo)',
    cidades: 'Lajeado, Estrela, Teutônia, Encantado, Venâncio Aires, Santa Cruz do Sul, Vera Cruz'
  },
  'RS4': {
    estado: 'Rio Grande do Sul',
    nome: 'RS4 - Região Noroeste / Missões',
    cidades: 'Santo Ângelo, Ijuí, Panambi, Cruz Alta, Santa Rosa, São Borja'
  },
  'RS5': {
    estado: 'Rio Grande do Sul',
    nome: 'RS5 - Região Norte / Alto Uruguai',
    cidades: 'Passo Fundo, Erechim, Getúlio Vargas, Sananduva, Lagoa Vermelha'
  },
  'RS6': {
    estado: 'Rio Grande do Sul',
    nome: 'RS6 - Região Sul / Litoral',
    cidades: 'Pelotas, Rio Grande, São Lourenço do Sul, Canguçu, Torres'
  },
  'RS7': {
    estado: 'Rio Grande do Sul',
    nome: 'RS7 - Região Centro / Fronteira Oeste',
    cidades: 'Santa Maria, Cachoeira do Sul, Rosário do Sul, Alegrete, Uruguaiana'
  },
  'RS8': {
    estado: 'Rio Grande do Sul',
    nome: 'RS8 - Região Planalto Médio / Campos de Cima da Serra',
    cidades: 'Vacaria, Muitos Capões, Esmeralda, Bom Jesus, Cambará do Sul'
  }
}

// Tabela de preços por zona - baseada na tabela oficial
const precos = {
  'SP1': { taxa: 70.82, freteQuilo: 1.152, grisPercentual: 0.20 },
  'SP2': { taxa: 69.92, freteQuilo: 1.139, grisPercentual: 0.20 },
  'SP3': { taxa: 74.26, freteQuilo: 1.204, grisPercentual: 0.20 },
  'PR1': { taxa: 43.99, freteQuilo: 0.746, grisPercentual: 0.15 },
  'PR2': { taxa: 52.91, freteQuilo: 0.881, grisPercentual: 0.15 },
  'PR3': { taxa: 59.78, freteQuilo: 0.985, grisPercentual: 0.15 },
  'PR4': { taxa: 45.85, freteQuilo: 0.774, grisPercentual: 0.15 },
  'PR5': { taxa: 58.53, freteQuilo: 0.965, grisPercentual: 0.15 },
  'PR6': { taxa: 51.88, freteQuilo: 0.866, grisPercentual: 0.15 },
  'SC1': { taxa: 39.07, freteQuilo: 0.671, grisPercentual: 0.15 },
  'SC2': { taxa: 37.26, freteQuilo: 0.643, grisPercentual: 0.15 },
  'SC3': { taxa: 42.75, freteQuilo: 0.727, grisPercentual: 0.15 },
  'SC4': { taxa: 42.04, freteQuilo: 0.717, grisPercentual: 0.15 },
  'SC5': { taxa: 48.38, freteQuilo: 0.812, grisPercentual: 0.15 },
  'SC6': { taxa: 34.87, freteQuilo: 0.608, grisPercentual: 0.15 },
  'RS1': { taxa: 26.44, freteQuilo: 0.481, grisPercentual: 0.15 },
  'RS2': { taxa: 25.22, freteQuilo: 0.463, grisPercentual: 0.15 },
  'RS3': { taxa: 30.25, freteQuilo: 0.538, grisPercentual: 0.15 },
  'RS4': { taxa: 35.80, freteQuilo: 0.621, grisPercentual: 0.15 },
  'RS5': { taxa: 29.64, freteQuilo: 0.529, grisPercentual: 0.15 },
  'RS6': { taxa: 41.84, freteQuilo: 0.712, grisPercentual: 0.15 },
  'RS7': { taxa: 34.13, freteQuilo: 0.598, grisPercentual: 0.15 },
  'RS8': { taxa: 30.82, freteQuilo: 0.546, grisPercentual: 0.15 }
}

// Constantes para taxas e adicionais
const PEDAGIO_SP = 6.18
const PEDAGIO_OUTROS = 3.31
const GRIS_SP_PERCENTUAL = 0.0020
const GRIS_SP_MINIMO = 6.18
const GRIS_OUTROS_PERCENTUAL = 0.0015
const GRIS_OUTROS_MINIMO = 3.31
const AUMENTO_500A1000KG = 0.10
const AUMENTO_ACIMA1000KG = 0.25
const PESO_VOLUMOSO = 300 // kg/m³
const SVD_SP = 92.00
const SVD_PR = 76.00
const SVD_SC = 59.50
const SVD_RS = 43.50

function App() {
  const [transportadora, setTransportadora] = useState('1')
  const [estado, setEstado] = useState('São Paulo')
  const [zona, setZona] = useState('SP1')
  const [peso, setPeso] = useState('')
  const [valorNota, setValorNota] = useState('')
  const [resultado, setResultado] = useState(null)

  const estados = ['São Paulo', 'Paraná', 'Santa Catarina', 'Rio Grande do Sul']
  const zonasDisponiveis = regioes[transportadora]?.[estado] || []

  const handleEstadoChange = (novoEstado) => {
    setEstado(novoEstado)
    const primeiraZona = regioes[transportadora]?.[novoEstado]?.[0]
    if (primeiraZona) {
      setZona(primeiraZona)
    }
  }

  const calcular = () => {
    if (!peso || parseFloat(peso) <= 0) {
      alert('Por favor, insira um peso válido')
      return
    }

    const precosZona = precos[zona]
    if (!precosZona) {
      alert('Zona não encontrada')
      return
    }

    const pesoNum = parseFloat(peso)
    const valorNotaNum = valorNota ? parseFloat(valorNota) : 0

    // Determina se é SP ou não para cálculos diferenciados
    const isSP = zona.startsWith('SP')
    
    // 1. Frete base = taxa + (peso × frete por quilo)
    let freteBase = precosZona.taxa + (pesoNum * precosZona.freteQuilo)

    // 2. Aplicar acréscimo por peso (500-1000kg: +10%, >1000kg: +25%)
    if (pesoNum > 1000) {
      freteBase += freteBase * AUMENTO_ACIMA1000KG
    } else if (pesoNum > 500) {
      freteBase += freteBase * AUMENTO_500A1000KG
    }

    // 3. Pedágio (por fração de 100kg)
    const pedagio = Math.ceil(pesoNum / 100) * (isSP ? PEDAGIO_SP : PEDAGIO_OUTROS)

    // 4. GRIS - % sobre valor da NF com mínimo
    const grisPercentual = isSP ? GRIS_SP_PERCENTUAL : GRIS_OUTROS_PERCENTUAL
    const grisMinimo = isSP ? GRIS_SP_MINIMO : GRIS_OUTROS_MINIMO
    const gris = valorNotaNum > 0 
      ? Math.max(valorNotaNum * grisPercentual, grisMinimo)
      : grisMinimo

    // 5. Frete total
    const freteTotal = freteBase + pedagio + gris

    setResultado({
      transportadora: transportadoras.find(t => t.id === parseInt(transportadora))?.nome,
      regiao: regiaoInfo[zona].nome,
      cidades: regiaoInfo[zona].cidades,
      peso: pesoNum,
      valorNota: valorNotaNum,
      freteBase: freteBase.toFixed(2),
      pedagio: pedagio.toFixed(2),
      gris: gris.toFixed(2),
      freteTotal: freteTotal.toFixed(2)
    })
  }

  return (
    <div className="container">
      <h1>🚚 Simulador de Frete - FORTIMED</h1>
      
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="transportadora">Transportadora:</label>
          <select 
            id="transportadora"
            value={transportadora} 
            onChange={(e) => setTransportadora(e.target.value)}
          >
            {transportadoras.map(t => (
              <option key={t.id} value={t.id}>{t.nome}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="estado">Estado:</label>
          <select 
            id="estado"
            value={estado} 
            onChange={(e) => handleEstadoChange(e.target.value)}
          >
            {estados.map(est => (
              <option key={est} value={est}>{est}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="zona">Zona / Região:</label>
          <select 
            id="zona"
            value={zona} 
            onChange={(e) => setZona(e.target.value)}
          >
            {zonasDisponiveis.map(z => (
              <option key={z} value={z}>
                {z} - {regiaoInfo[z]?.nome.split(' - ')[1]}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="peso">Peso (kg):</label>
          <input 
            id="peso"
            type="number" 
            step="0.1" 
            min="0" 
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            placeholder="Digite o peso em kg"
          />
        </div>

        <div className="form-group">
          <label htmlFor="valorNota">Valor da Nota (R$):</label>
          <input 
            id="valorNota"
            type="number" 
            step="0.01" 
            min="0" 
            value={valorNota}
            onChange={(e) => setValorNota(e.target.value)}
            placeholder="Valor da NF (opcional)"
          />
        </div>

        <button onClick={calcular}>Calcular Frete</button>
      </div>

      {resultado && (
        <div className="resultado">
          <h2>📊 Resultado da Simulação</h2>
          <div className="info-box">
            <p><strong>Transportadora:</strong> <span>{resultado.transportadora}</span></p>
            <p><strong>Região:</strong> <span>{resultado.regiao}</span></p>
            <p><strong>Cidades Atendidas:</strong> <span>{resultado.cidades}</span></p>
            <p><strong>Peso:</strong> <span>{resultado.peso} kg</span></p>
            {resultado.valorNota > 0 && (
              <p><strong>Valor da Nota:</strong> <span>R$ {resultado.valorNota.toFixed(2)}</span></p>
            )}
          </div>

          <div className="breakdown">
            <h3>💰 Detalhamento do Cálculo</h3>
            <div className="breakdown-item">
              <span>Frete Base:</span>
              <strong>R$ {resultado.freteBase}</strong>
            </div>
            <div className="breakdown-item">
              <span>Pedágio:</span>
              <strong>R$ {resultado.pedagio}</strong>
            </div>
            <div className="breakdown-item">
              <span>GRIS (0,50% NF):</span>
              <strong>R$ {resultado.gris}</strong>
            </div>
            <div className="breakdown-item total">
              <span>Total do Frete:</span>
              <strong>R$ {resultado.freteTotal}</strong>
            </div>
          </div>
        </div>
      )}

      <div className="info-section">
        <h2>📋 Informações Importantes</h2>
        <ul>
          <li><strong>Pequenos Volumes S.V.D.:</strong> SP R$ 92,00 | PR R$ 76,00 | SC R$ 59,50 | RS R$ 43,50</li>
          <li><strong>Mercadorias 500-1000kg:</strong> Acréscimo de 10% no frete</li>
          <li><strong>Mercadorias acima de 1000kg:</strong> Acréscimo de 25% no frete</li>
          <li><strong>Mercadorias Volumosas:</strong> Densidade 300kg/m³</li>
          <li><strong>GRIS:</strong> 0,50% sobre valor da NF (mínimos: SP R$ 6,18 | Demais R$ 3,31)</li>
        </ul>
      </div>

      <div className="tabela-referencia">
        <h2>📊 Tabela de Referência - Expresso São Miguel</h2>
        <div className="tabela-wrapper">
          <table>
            <thead>
              <tr>
                <th>Zona</th>
                <th>Região</th>
                <th>Taxa (R$)</th>
                <th>Frete/kg (R$)</th>
                <th>GRIS (%)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(regiaoInfo).map(([zona, info]) => (
                <tr key={zona}>
                  <td><strong>{zona}</strong></td>
                  <td>{info.nome.split(' - ')[1]}</td>
                  <td>R$ {precos[zona].taxa.toFixed(2)}</td>
                  <td>R$ {precos[zona].freteQuilo.toFixed(3)}</td>
                  <td>{precos[zona].grisPercentual.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
