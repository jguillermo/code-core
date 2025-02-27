import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import 'reflect-metadata';
import { getMetadataStorage, ValidationTypes } from 'class-validator';

// 🔥 Función para agregar `@ApiProperty()` dinámicamente a un DTO externo
function applySwaggerMetadata(target: any) {
  const metadataStorage = getMetadataStorage();
  const constraints = metadataStorage.getTargetValidationMetadatas(target, target.prototype, false, false, []);

  const dtoInstance = new target(); // Instancia del DTO para obtener las propiedades
  const allProperties = Reflect.ownKeys(dtoInstance).filter((key) => typeof key === 'string'); // Todas las propiedades del DTO

  for (const propertyName of allProperties) {
    // 🔍 Buscar si la propiedad tiene validaciones
    const validationMetadata = constraints.find((meta) => meta.propertyName === propertyName);

    let validatorClass: any = null;

    if (validationMetadata && validationMetadata.type === ValidationTypes.CUSTOM_VALIDATION) {
      validatorClass = validationMetadata.constraints?.[0]; // Clase del validador
    }

    // 🔥 Aplicar `@ApiProperty()` a TODAS las propiedades, con o sin validaciones
    Reflect.decorate(
      [
        ApiProperty({
          description: validatorClass ? `Validado por ${validatorClass.name}` : `Campo ` + propertyName.toString(),
          type: Number,
        }),
      ],
      target.prototype,
      propertyName,
    );
  }
}

// 🔥 Decorador `@UseDto()` para registrar DTOs externos en Swagger sin modificarlos
export function UseDto(...dtos: any[]) {
  return function (target: any) {
    dtos.forEach((dto) => {
      applySwaggerMetadata(dto); // Convertir las propiedades en `@ApiProperty()`
      ApiExtraModels(dto); // Registrar en Swagger
    });
    return target;
  };
}
