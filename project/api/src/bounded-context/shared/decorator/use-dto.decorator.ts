import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import 'reflect-metadata';

// 🔥 Función para agregar `@ApiProperty()` dinámicamente a un DTO externo
function applySwaggerMetadata(target: any) {
  const properties = Reflect.ownKeys(new target()); // Obtener todas las propiedades del DTO

  for (const property of properties) {
    if (typeof property === 'string') {
      const metadata = Reflect.getMetadata('design:type', target.prototype, property);
      if (metadata) {
        Reflect.decorate([ApiProperty()], target.prototype, property);
      }
    }
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
