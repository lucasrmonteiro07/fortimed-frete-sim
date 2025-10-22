import { useState } from 'react'
import './App.css'

// Importar logo
import logo from '../img/fortimed_logo.png'

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
    cidades: 'Porto Alegre, Canoas, Gravataí, Cachoeirinha, Esteio, Sapucaia do Sul, São Leopoldo, Novo Hamburgo, Campo Bom, Estância Velha, Ivoti, Dois Irmãos, Feliz, Bom Princípio, Capela de Santana, São Sebastião do Caí, Brochier, Charqueadas, Eldorado do Sul, Arroio dos Ratos, Guaíba, Barra do Ribeiro, Butiá'
  },
  'RS2': {
    estado: 'Rio Grande do Sul',
    nome: 'RS2 - Serra Gaúcha e Hortênsias',
    cidades: 'Caxias do Sul, Farroupilha, Bento Gonçalves, Garibaldi, Carlos Barbosa, Flores da Cunha, Nova Petrópolis, Gramado, Canela, Veranópolis, Vila Flores, Antônio Prado, Guaporé, Nova Prata, Cotiporã, Fagundes Varela, Monte Belo do Sul, Santa Tereza'
  },
  'RS3': {
    estado: 'Rio Grande do Sul',
    nome: 'RS3 - Região dos Vales (Taquari / Rio Pardo)',
    cidades: 'Lajeado, Estrela, Teutônia, Encantado, Arroio do Meio, Venâncio Aires, Santa Cruz do Sul, Vera Cruz, Sobradinho, Passo do Sobrado, Cruzeiro do Sul, Paverama, Imigrante, Colinas, Poço das Antas'
  },
  'RS4': {
    estado: 'Rio Grande do Sul',
    nome: 'RS4 - Região Noroeste / Missões',
    cidades: 'Santo Ângelo, Ijuí, Panambi, Cruz Alta, Três de Maio, Santa Rosa, Horizontina, Giruá, São Luiz Gonzaga, Cerro Largo, São Borja, Roque Gonzales, Caibaté, Guarani das Missões, Salvador das Missões'
  },
  'RS5': {
    estado: 'Rio Grande do Sul',
    nome: 'RS5 - Região Norte / Alto Uruguai',
    cidades: 'Passo Fundo, Erechim, Getúlio Vargas, Sananduva, Lagoa Vermelha, Tapejara, Marau, Casca, Ibiaçá, Cacique Doble, Machadinho, Maximiliano de Almeida, Viadutos, Gaurama, Aratiba'
  },
  'RS6': {
    estado: 'Rio Grande do Sul',
    nome: 'RS6 - Região Sul / Litoral',
    cidades: 'Pelotas, Rio Grande, São Lourenço do Sul, Canguçu, Arroio Grande, Jaguarão, Piratini, Turuçu, Santa Vitória do Palmar, Chuí, Mostardas, Palmares do Sul, Tramandaí, Osório, Capão da Canoa, Torres'
  },
  'RS7': {
    estado: 'Rio Grande do Sul',
    nome: 'RS7 - Região Centro / Fronteira Oeste',
    cidades: 'Santa Maria, Cachoeira do Sul, São Gabriel, Rosário do Sul, Alegrete, Uruguaiana, Itaqui, São Vicente do Sul, Dom Pedrito, Bagé, Lavras do Sul, Santana do Livramento, Quaraí'
  },
  'RS8': {
    estado: 'Rio Grande do Sul',
    nome: 'RS8 - Região Planalto Médio / Campos de Cima da Serra',
    cidades: 'Vacaria, Lagoa Vermelha, Muitos Capões, Esmeralda, São José dos Ausentes, Bom Jesus, Cambará do Sul, Ipê, André da Rocha, Campestre da Serra'
  }
}

// Tabela de preços por zona - baseada na tabela oficial
const precos = {
  'SP1': { taxa: 70.82, freteQuilo: 1.152, grisPercentual: 0.50 },
  'SP2': { taxa: 69.92, freteQuilo: 1.139, grisPercentual: 0.50 },
  'SP3': { taxa: 74.26, freteQuilo: 1.204, grisPercentual: 0.50 },
  'PR1': { taxa: 43.99, freteQuilo: 0.746, grisPercentual: 0.50 },
  'PR2': { taxa: 52.91, freteQuilo: 0.881, grisPercentual: 0.50 },
  'PR3': { taxa: 59.78, freteQuilo: 0.985, grisPercentual: 0.50 },
  'PR4': { taxa: 45.85, freteQuilo: 0.774, grisPercentual: 0.50 },
  'PR5': { taxa: 58.53, freteQuilo: 0.965, grisPercentual: 0.50 },
  'PR6': { taxa: 51.88, freteQuilo: 0.866, grisPercentual: 0.50 },
  'SC1': { taxa: 39.07, freteQuilo: 0.671, grisPercentual: 0.50 },
  'SC2': { taxa: 37.26, freteQuilo: 0.643, grisPercentual: 0.50 },
  'SC3': { taxa: 42.75, freteQuilo: 0.727, grisPercentual: 0.50 },
  'SC4': { taxa: 42.04, freteQuilo: 0.717, grisPercentual: 0.50 },
  'SC5': { taxa: 48.38, freteQuilo: 0.812, grisPercentual: 0.50 },
  'SC6': { taxa: 34.87, freteQuilo: 0.608, grisPercentual: 0.50 },
  'RS1': { taxa: 26.44, freteQuilo: 0.481, grisPercentual: 0.50 },
  'RS2': { taxa: 25.22, freteQuilo: 0.463, grisPercentual: 0.50 },
  'RS3': { taxa: 30.25, freteQuilo: 0.538, grisPercentual: 0.50 },
  'RS4': { taxa: 35.80, freteQuilo: 0.621, grisPercentual: 0.50 },
  'RS5': { taxa: 29.64, freteQuilo: 0.529, grisPercentual: 0.50 },
  'RS6': { taxa: 41.84, freteQuilo: 0.712, grisPercentual: 0.50 },
  'RS7': { taxa: 34.13, freteQuilo: 0.598, grisPercentual: 0.50 },
  'RS8': { taxa: 30.82, freteQuilo: 0.546, grisPercentual: 0.50 }
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

    // 4. GRIS - % sobre valor da NF com mínimo por destino
    // REGRA: Destino SP = 0,20% (mínimo R$ 6,18)
    //        Demais destinos = 0,15% (mínimo R$ 3,31)
    const grisPercentual = isSP ? GRIS_SP_PERCENTUAL : GRIS_OUTROS_PERCENTUAL
    const grisMinimo = isSP ? GRIS_SP_MINIMO : GRIS_OUTROS_MINIMO
    const grisCalculado = valorNotaNum * grisPercentual
    const gris = valorNotaNum > 0 
      ? Math.max(grisCalculado, grisMinimo)
      : grisMinimo

    // 4.5 Frete Valor - 0,50% sobre valor da NF
    const freteValorCalculado = valorNotaNum * 0.005

    // 5. Frete total (inclui Frete Valor + GRIS)
    const freteTotal = freteBase + pedagio + freteValorCalculado + gris
    
    // Determinar percentual GRIS para exibição
    const percentualGrisExibicao = isSP ? '0,20' : '0,15'

    setResultado({
      transportadora: transportadoras.find(t => t.id === parseInt(transportadora))?.nome,
      zona: zona,
      regiao: regiaoInfo[zona].nome,
      cidades: regiaoInfo[zona].cidades,
      peso: pesoNum,
      valorNota: valorNotaNum,
      freteBase: freteBase.toFixed(2),
      pedagio: pedagio.toFixed(2),
      freteValor: freteValorCalculado.toFixed(2),
      gris: gris.toFixed(2),
      grisCalculado: grisCalculado.toFixed(2),
      grisMinimo: grisMinimo.toFixed(2),
      grisPercentual: percentualGrisExibicao,
      freteTotal: freteTotal.toFixed(2)
    })
  }

  return (
    <div className="container">
      <div className="header-section">
        <img src={logo} alt="FORTIMED Logo" className="logo" />
        <h1>🚚 Simulador de Frete - FORTIMED</h1>
      </div>
      
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
          <label htmlFor="estado">Estado (Destino):</label>
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
            <p><strong>Destino:</strong> <span>{resultado.zona} - {resultado.regiao}</span></p>
            <p><strong>Cidades:</strong> <span>{resultado.cidades}</span></p>
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
              <span>Frete Valor (0,50% NF):</span>
              <strong>R$ {resultado.freteValor}</strong>
            </div>
            <div className="breakdown-item">
              <span>GRIS ({resultado.grisPercentual}% sobre NF):</span>
              <strong>R$ {resultado.gris}</strong>
              <span style={{ fontSize: '0.85em', color: '#666', marginLeft: '10px' }}>
                ({resultado.grisCalculado} calculado, mínimo R$ {resultado.grisMinimo})
              </span>
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

      <div className="info-section" style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h2>📋 Informações Gerais</h2>
        
        <h3>GENERALIDADES</h3>
        <ul>
          <li><strong>Tabela:</strong> Para frete Expedido Pago e Recebido À Pagar</li>
          <li><strong>Pequenos Volumes S.V.D.:</strong> SP R$ 92,00 | PR R$ 76,00 | SC R$ 59,50 | RS R$ 43,50</li>
          <li><strong>Pedágio:</strong> Por Fração de 100Kg. Destino/Origem SP R$ 6,18 | Demais Origens/Destinos: R$ 3,31</li>
          <li><strong>GRIS:</strong> 0,50% sobre valor da NF com mínimo por CTe (SP: R$ 6,18 | Demais: R$ 3,31)</li>
          <li><strong>Acréscimo Peso:</strong> 500-1000kg: +10% no frete/kg | Acima de 1000kg: +25% no frete/kg</li>
          <li><strong>Mercadorias Volumosas:</strong> 300Kg/m³</li>
          <li><strong>Tributação:</strong> Conforme legislação vigente (ICMS, ISS, PIS, COFINS)</li>
        </ul>

        <h3>TAXAS</h3>
        <ul>
          <li><strong>TDE (Difícil Entrega):</strong> 20% sobre frete com mínimo de R$ 207,50</li>
          <li><strong>TDA (Difícil Acesso):</strong> R$ 6,33/km (ida e volta)</li>
          <li><strong>T-CPF (Entrega para CPF):</strong> R$ 48,60 por CTe (isento na retirada)</li>
          <li><strong>TVD (Veículo Dedicado):</strong> 20% sobre frete com mínimo de R$ 576,00</li>
          <li><strong>TPC (Permanência Carga):</strong> R$ 0,160/kg/dia (mínimo R$ 207,50/dia, isento 5 primeiros dias)</li>
          <li><strong>Reentrega:</strong> 50% sobre frete original com mínimo de R$ 38,10 por CTe</li>
        </ul>

        <h3>INFORMAÇÕES IMPORTANTES</h3>
        <ul>
          <li>Tabela com vigência de 12 meses, podendo ser reajustada conforme variações operacionais (índice NTC Logística)</li>
          <li>Tabela automaticamente inativada sem aviso prévio se sem faturamento por 3 meses consecutivos</li>
          <li>Localidades atendidas: <a href="https://www.expressosaomiguel.com.br" target="_blank" rel="noopener noreferrer">www.expressosaomiguel.com.br</a> ou APP "Expresso São Miguel - Cliente"</li>
          <li>Envie XML da NFe para: <a href="mailto:xml@expressosaomiguel.com.br">xml@expressosaomiguel.com.br</a></li>
          <li>Ao aceitar esta proposta, entra em vigência imediata para os CNPJ's indicados</li>
          <li><strong>Limite embarques:</strong> 5.000kg ou 12m³ por dia (mesmo expedidor x recebedor)</li>
        </ul>
      </div>
    </div>
  )
}

export default App
