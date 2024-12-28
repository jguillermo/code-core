import 'reflect-metadata';

export function analyzeClass(dtoClass: any) {
  console.log(`\n===== Iniciando análisis de la clase: ${dtoClass.name} =====`);

  const prototype = dtoClass.prototype;

  console.log('--------------------------------------------------------------');
  console.log(dtoClass);
  console.log('--------------------------------------------------------------');
  console.log(Object.keys(dtoClass));
  console.log('--------------------------------------------------------------');
  console.log(dtoClass.prototype);
  console.log('--------------------------------------------------------------');
  console.log(Object.keys(dtoClass.prototype));
  console.log('--------------------------------------------------------------');

  console.log('Obteniendo prototipo de la clase...', prototype);
  console.log('Prototipo obtenido. Buscando propiedades con Reflect-metadata...');

  // Obtener las propiedades definidas en el prototipo mediante los metadatos
  const propertyNames = Object.keys(prototype);
  console.log('Propiedades detectadas (Reflect):', propertyNames);

  const properties = Reflect.ownKeys(prototype);
  console.log('Propiedades detectadas en el prototipo (Reflect.ownKeys):', properties);

  // Para cada propiedad, analizar los decoradores y el tipo
  console.log('\n--- Analizando cada propiedad ---');
  const analyzedProperties = propertyNames.map((property) => {
    console.log(`\nProcesando propiedad: ${property}`);

    // Obtener el tipo de la propiedad
    const type = Reflect.getMetadata('design:type', prototype, property);
    console.log(`Tipo de la propiedad '${String(property)}': ${type?.name || 'unknown'}`);

    // Obtener los decoradores aplicados
    console.log(`Obteniendo metadatos de decoradores para '${String(property)}'...`);
    const metadataKeys = Reflect.getMetadataKeys(prototype, property);
    console.log(`Decoradores encontrados (${metadataKeys.length}):`, metadataKeys);

    const decorators = metadataKeys.map((key) => {
      const metadata = Reflect.getMetadata(key, prototype, property);
      console.log(`  - Decorador Key: ${key}`);
      console.log(`    Metadata del decorador:`, metadata);
      return {
        key,
        metadata,
      };
    });

    return {
      property,
      type: type?.name || 'unknown',
      decorators,
    };
  });

  console.log('\n===== Análisis completo de la clase =====');
  console.log('Resumen del análisis:', JSON.stringify(analyzedProperties, null, 2));

  return analyzedProperties;
}
