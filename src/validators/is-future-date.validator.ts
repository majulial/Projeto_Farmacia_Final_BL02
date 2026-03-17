import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsFutureDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isFutureDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const date = new Date(value);
          const today = new Date();
          return date > today; // Verifica se é no futuro
        },
        defaultMessage(args: ValidationArguments) {
          return 'A data deve ser no futuro';
        },
      },
    });
  };
}