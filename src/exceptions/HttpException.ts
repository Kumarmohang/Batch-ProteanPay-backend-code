/**
 * Class for Http error
 *
 * @augments Error
 */
export class HttpException extends Error {
  /**
   *
   * @param errorCode Status code
   * @param message message in string
   */
  constructor(public errorCode: number, public message: string) {
    super(message);
    this.errorCode = errorCode;
    this.message = message;
  }
}
