import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Model } from 'mongoose';
import { AbstractDocument } from '../abstract.schema';

@ValidatorConstraint({ async: true })
export class IsDocumentExistConstraint<TDocument extends AbstractDocument>
  implements ValidatorConstraintInterface
{
  constructor(private readonly model: Model<TDocument>) {}

  async validate(documentId: string) {
    const document = await this.model.findById(documentId);
    return !!document;
  }
}

export function IsDocumentExistFactory(model: Model<any>) {
  return (validationOptions?: ValidationOptions) => {
    return function (object: object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: new IsDocumentExistConstraint(model),
      });
    };
  };
}
