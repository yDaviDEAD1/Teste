class RecintosZoo {
    constructor() {
      // Definindo os recintos e os animais já existentes
      this.recintos = [
        { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3, tamanho: 1 }] },
        { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
        { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1, tamanho: 2 }] },
        { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
        { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1, tamanho: 3 }] }
      ];
  
      // Informações sobre os animais
      this.animais = {
        LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
        LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
        CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
        MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
        GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
        HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false },
      };
    }
  
    // Método para analisar recintos com base nas regras
    analisaRecintos(animal, quantidade) {
      // Verifica se o animal é válido
      if (!this.animais[animal]) {
        return { erro: 'Animal inválido' };
      }
  
      // Verifica se a quantidade de animais é válida
      if (quantidade <= 0) {
        return { erro: 'Quantidade inválida' };
      }
  
      const animalInfo = this.animais[animal];
      const recintosViaveis = [];
  
      // Itera sobre cada recinto para verificar a viabilidade
      for (const recinto of this.recintos) {
        let espacoOcupado = recinto.animais.reduce((total, a) => total + (a.quantidade * a.tamanho), 0);
        let espacoExtra = recinto.animais.length > 0 && recinto.animais[0].especie !== animal ? 1 : 0;
        let espacoLivre = recinto.tamanho - espacoOcupado - espacoExtra;
  
        const biomaCompativel = animalInfo.biomas.includes(recinto.bioma);
        const mesmoEspecieOuVazio = recinto.animais.length === 0 || recinto.animais.every(a => a.especie === animal);
        const espacamentoSuficiente = espacoLivre >= (quantidade * animalInfo.tamanho);
  
        // Se o bioma é compatível, há espaço suficiente e os animais podem conviver
        if (biomaCompativel && espacamentoSuficiente && mesmoEspecieOuVazio) {
          recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - (quantidade * animalInfo.tamanho)} total: ${recinto.tamanho})`);
        }
      }
  
      // Se não há recintos viáveis
      if (recintosViaveis.length === 0) {
        return { erro: 'Não há recinto viável' };
      }
  
      // Retorna os recintos viáveis
      return { recintosViaveis };
    }
  }
  
  // Exportando a classe para ser usada nos testes
  export { RecintosZoo as RecintosZoo };
  