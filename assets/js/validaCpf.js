/**
 * 705.484.450-52 070.987.720-03
 * 
 * 7x 0x 5x 4x 8x 4x 4x 5x 0x
 * 10 9  8  7  6  5  4  3  2 
 * 10 0  40 28 48 20 16 15 0 = 237
 * 
 * 11 - (237 % 11) = 5 (Primeiro digito)
 * Se o número digito for maior que 9, consideramos 0
 * 
 * 7x 0x 5x 4x 8x 4x 4x 5x 0x 5x
 * 11 10 9  8  7  6  5  4  3  2
 * 77 0  45 32 56 24 20 20 0  10 = 284
 * 
 * 11 - (284 % 11) = 2 (Segundo dígito)
 * Se o número digito for maior que 9, consideramos 0 
 */
class ValidaCpf{
    constructor(cpf) {
        this.cpf = cpf;
        this.cpfLimpo = this.cpf.replace(/\D+/g, '');
    }

    valida(){
        if(typeof this.cpf === 'undefined') return false;
        if(this.cpfLimpo.length !== 11) return false;
        if(this.isSequencia()) return false;

        const cpfParcial = this.cpfLimpo.slice(0, -2);

        const primeiroDigito = ValidaCpf.criaDigito(cpfParcial);
        const segundoDigito = ValidaCpf.criaDigito(cpfParcial + primeiroDigito);
        
        const novoCpf = cpfParcial + primeiroDigito + segundoDigito;
        return novoCpf === this.cpfLimpo;

        return true;
    }

    static criaDigito(cpfParcial){
        const cpfArray = Array.from(cpfParcial);

        let regressivo = cpfArray.length + 1;
        const total = cpfArray.reduce( (ac, val) => {
            ac += (Number(val) * regressivo);
            regressivo--;
            return ac;
        }, 0 )

        const digito = 11 - (total % 11);
        return digito > 9 ? '0' : String(digito);
    }


    isSequencia(){
        const sequencia = this.cpfLimpo[0].repeat(11);
        return sequencia === this.cpfLimpo;
    }

}

// const v1 = new ValidaCpf('705.484.450-52');
// console.log(v1.valida());
