/**
 *
 * @param validacoes - passa um array de boolean, podendo ser uma função que retorne boolean ou uma variavel
 */

export class Validation {
  private validacoes: Array<(() => boolean) | boolean> = [];

  constructor(validacoes: Array<(() => boolean) | boolean>) {
    this.validacoes = this.validacoes.concat(validacoes);
  }

  async getResultValidation(): Promise<boolean> {
    const promisses = this.validacoes.map((validacao) => {
      if (typeof validacao !== 'function' && typeof validacao !== 'boolean') {
        throw new Error('O tipo esperado não foi o esperado.');
      }

      return new Promise<boolean | (() => boolean)>((resolve) =>
        resolve(typeof validacao === 'function' ? validacao() : validacao),
      );
    });
    try {
      const resultados = await Promise.all(promisses);

      // if (
      //   !resultados.every((resultado) => resultado) &&
      //   this.CustomErrorAllowance.customError
      // ) {
      //   this.cbFunction(this.CustomErrorAllowance.messageError);
      // }

      return resultados.every((resultado) => resultado);
    } catch (error) {
      return false;
    }
  }
}
