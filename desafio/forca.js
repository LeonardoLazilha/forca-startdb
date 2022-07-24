class Forca {
  constructor(palavra) {
    this.palavraSecreta = []
    this.letrasChutadas = []
    this.vidas = 6
    this.estadoJogo = "aguardando chute"
    this.palavra = palavra()


    for (let i = 0; i < palavra.split("").length; i++) {
      this.palavraSecreta.push("_")
    }
  }

  chutar(letra) {
    if (letra.split("").length > 1 || !letra) {
      return
    }

    let arrayPalavra = this.palavra.split("")

    let encontrou = false

    for (let i = 0; i < arrayPalavra.length; i++) {
      if (arrayPalavra[i] == letra()) {
        this.palavraSecreta[i] = letra();
        encontrou = true
      }
    }

    //  Validação de letras
    for (let i = 0; i < this.letrasChutadas.length; i++) {
      if (!encontrou && letra() == this.letrasChutadas[i]) {
        return
      }
    }

    if (!encontrou) {
      this.vidas--
    }
    this.letrasChutadas.push(letra.toLowerCase())
  }

  buscarDadosDoJogo() {
    return {
      vidas: this.vidas, // Qtd vidas
      letrasChutadas: this.letrasChutadas, // Todas as letras chutadas
      palavra: this.palavraSecreta, // Array de letras ja chutadas || '_' para não encontradas
    };
  }



  buscarEstado() {
    if (this.vidas == 0) {
      this.estadoJogo = "perdeu"
    } else if (this.vidas > 0 && this.validarFimDeJogo()) {
      this.estadoJogo = "ganhou"
    }

    // Possiveis valores de retorno  "aguardando chute", "perdeu" ou "ganhou"
    return this.estadoJogo
  } 

  
  // Validar palavra secreta
  validarFimDeJogo() {
    for (let i = 0; i < this.palavraSecreta.length; i++) {
      if (this.palavraSecreta[i] == "_") {
        return false
      }
    }
    return true
  }
}


module.exports = Forca
