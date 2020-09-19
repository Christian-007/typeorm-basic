import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

import { HttpException } from '../exceptions/http.exception';

export async function validationMiddleware(
  classType: ClassType<unknown>,
  requestBody: object,
): Promise<string> {
  const transformToClass = plainToClass(classType, requestBody);
  const errors: ValidationError[] = await validate(transformToClass);
  const hasErrors = errors.length > 0;

  if (!hasErrors) {
    return;
  }

  const errorMessages = errors.map(transformErrorValidations).join();
  throw new HttpException(400, errorMessages);
}

function transformErrorValidations(error: ValidationError): string[] {
  const hasChildren = error.children.length > 0;

  if (hasChildren) {
    const childrenErrorMessages = error.children.map((err) => Object.values(err.constraints));
    const flattened: string[] = [].concat(...childrenErrorMessages);

    return flattened;
  }

  return Object.values(error.constraints);
}
