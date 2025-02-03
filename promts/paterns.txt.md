# patrones creacionales

### **Patrón de Diseño: Singleton**

#### 📌 **Propósito**

El patrón de diseño **Singleton** es un patrón creacional que permite asegurarse de que una clase tenga una única instancia, proporcionando además un punto de acceso global a dicha
instancia.

---

#### 🚩 **Problema**

El Singleton resuelve dos problemas:

1. **Garantizar una única instancia de una clase:** Es útil para controlar el acceso a recursos compartidos como bases de datos o archivos. En vez de crear múltiples instancias,
   siempre se obtiene la misma.
2. **Proporcionar un punto de acceso global:** Similar a una variable global, pero con mayor seguridad, ya que impide que otras partes del código sobrescriban la instancia
   existente.

---

#### 💡 **Solución**

La solución implica:

- **Privatizar el constructor** para evitar la creación de nuevas instancias usando `new`.
- **Método estático de creación:** Actúa como constructor, invoca el constructor privado y guarda la instancia en una variable estática. Las llamadas posteriores devuelven la misma
  instancia almacenada.

---

#### 🗂️ **Estructura**

- **Clase Singleton:** Declara un método estático `obtenerInstancia` que devuelve la misma instancia.
- **Constructor privado:** Solo accesible desde dentro de la clase para prevenir la creación externa de instancias.

---

#### 📝 **Pseudocódigo**

```pseudocode
class Database is
    private static field instance: Database
    private constructor Database() is
        // Inicialización

    public static method getInstance() is
        if (Database.instance == null) then
            acquireThreadLock()
                if (Database.instance == null) then
                    Database.instance = new Database()
        return Database.instance

    public method query(sql) is
        // Lógica para consultas a la base de datos

class Application is
    method main() is
        Database foo = Database.getInstance()
        foo.query("SELECT ...")
        Database bar = Database.getInstance()
        bar.query("SELECT ...")
        // foo y bar son la misma instancia
```

---

#### 🎯 **Aplicabilidad**

- **Cuando necesitas una única instancia** de una clase (por ejemplo, un objeto de base de datos).
- **Control de variables globales:** A diferencia de las variables globales tradicionales, el Singleton garantiza una única instancia inmutable desde fuera de la clase.

---

#### ⚙️ **Cómo implementarlo**

1. Añadir un **campo estático privado** para la instancia Singleton.
2. Declarar un **método de creación estático público**.
3. Implementar **inicialización diferida** (lazy initialization) para crear la instancia solo cuando sea necesario.
4. Definir el **constructor como privado**.
5. Reemplazar las llamadas al constructor en el código cliente por el método de creación estático.

---

#### ✅ **Pros y ❌ Contras**

**Pros:**

- Garantiza una única instancia.
- Proporciona un punto de acceso global.
- Inicialización diferida (solo se crea cuando es necesario).

**Contras:**

- Viola el **Principio de Responsabilidad Única** (SRP).
- Puede enmascarar un mal diseño, generando acoplamiento innecesario.
- Problemas en entornos multihilo si no se maneja adecuadamente.
- Dificulta la realización de pruebas unitarias debido a la imposibilidad de simular fácilmente el Singleton.

---

#### 🔗 **Relaciones con otros patrones**

- **Fachada (Facade):** Puede implementarse como Singleton para simplificar el acceso.
- **Flyweight:** Similar en la gestión de instancias compartidas, pero difieren en que Flyweight puede tener múltiples instancias inmutables.
- **Abstract Factory, Builder, Prototype:** Pueden implementarse como Singleton en algunos casos.

---

Ejemplo conceptual
Este ejemplo ilustra la estructura del patrón de diseño Singleton y se centra en las siguientes preguntas:

¿De qué clases se compone?
¿Qué papeles juegan esas clases?
¿De qué forma se relacionan los elementos del patrón?
index.ts: Ejemplo conceptual

```
/**
 * The Singleton class defines an `instance` getter, that lets clients access
 * the unique singleton instance.
 */
class Singleton {
    static #instance: Singleton;

    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor() { }

    /**
     * The static getter that controls access to the singleton instance.
     *
     * This implementation allows you to extend the Singleton class while
     * keeping just one instance of each subclass around.
     */
    public static get instance(): Singleton {
        if (!Singleton.#instance) {
            Singleton.#instance = new Singleton();
        }

        return Singleton.#instance;
    }

    /**
     * Finally, any singleton can define some business logic, which can be
     * executed on its instance.
     */
    public someBusinessLogic() {
        // ...
    }
}

/**
 * The client code.
 */
function clientCode() {
    const s1 = Singleton.instance;
    const s2 = Singleton.instance;

    if (s1 === s2) {
        console.log(
            'Singleton works, both variables contain the same instance.'
        );
    } else {
        console.log('Singleton failed, variables contain different instances.');
    }
}

clientCode();
```

---

### **Patrón de Diseño: Prototype**

#### 📌 **Propósito**

El patrón de diseño **Prototype** es un patrón creacional que permite copiar objetos existentes sin que el código dependa de sus clases específicas.

---

#### 🚩 **Problema**

- **¿Cómo crear una copia exacta de un objeto?**  
  Para copiar un objeto, deberías crear uno nuevo de la misma clase y copiar todos sus atributos. Sin embargo:
- Algunos atributos pueden ser **privados** e inaccesibles desde fuera del objeto.
- Podrías no conocer la clase concreta del objeto, solo su interfaz.

---

#### 💡 **Solución**

El patrón Prototype **delegar la clonación al propio objeto**. Esto se hace a través de:

- Una **interfaz común** con un método `clonar()`.
- Cada clase implementa este método para crear una copia exacta, incluyendo atributos privados.

---

#### 🗂️ **Estructura**

1. **Interfaz Prototype:** Define el método `clonar()`.
2. **Clases Concretas:** Implementan `clonar()`, copiando atributos simples y complejos.
3. **Cliente:** Usa `clonar()` sin conocer la clase específica.

---

#### 📝 **Pseudocódigo**

```pseudocode
abstract class Shape is
    field X: int
    field Y: int
    field color: string

    constructor Shape(source: Shape) is
        this.X = source.X
        this.Y = source.Y
        this.color = source.color

    abstract method clone(): Shape

class Rectangle extends Shape is
    field width: int
    field height: int

    constructor Rectangle(source: Rectangle) is
        super(source)
        this.width = source.width
        this.height = source.height

    method clone(): Shape is
        return new Rectangle(this)

class Application is
    field shapes: array of Shape

    method businessLogic() is
        foreach (s in shapes) do
            shapesCopy.add(s.clone())
```

---

#### 🎯 **Aplicabilidad**

- **Evitar la dependencia de clases concretas:** Ideal cuando solo conoces la interfaz.
- **Reducir la proliferación de subclases:** Clona prototipos en lugar de crear subclases específicas para cada configuración.

---

#### ⚙️ **Cómo implementarlo**

1. Definir una **interfaz con `clonar()`**.
2. Implementar `clonar()` en cada clase, asegurando que copia correctamente los atributos.
3. **Opcional:** Crear un **registro de prototipos** para gestionar objetos preconfigurados.

---

#### ✅ **Pros y ❌ Contras**

**Pros:**

- Clonación sin acoplamiento a clases concretas.
- Reduce la duplicación de lógica de inicialización.
- Facilita la creación de objetos complejos.

**Contras:**

- Clonar objetos con **referencias circulares** puede ser complicado.
- Puede ser más difícil de entender que la creación directa de objetos.

---

#### 🔗 **Relaciones con otros patrones**

- **Factory Method y Abstract Factory:** Prototype puede reemplazar métodos de fábrica cuando se necesita flexibilidad adicional.
- **Memento:** Prototype puede ser una alternativa para guardar el estado de un objeto.
- **Composite y Decorator:** Facilita la clonación de estructuras complejas.

---

Ejemplo conceptual
Este ejemplo ilustra la estructura del patrón de diseño Prototype y se centra en las siguientes preguntas:

¿De qué clases se compone?
¿Qué papeles juegan esas clases?
¿De qué forma se relacionan los elementos del patrón?
index.ts: Ejemplo conceptual

```
/**
 * The example class that has cloning ability. We'll see how the values of field
 * with different types will be cloned.
 */
class Prototype {
    public primitive: any;
    public component: object;
    public circularReference: ComponentWithBackReference;

    public clone(): this {
        const clone = Object.create(this);

        clone.component = Object.create(this.component);

        // Cloning an object that has a nested object with backreference
        // requires special treatment. After the cloning is completed, the
        // nested object should point to the cloned object, instead of the
        // original object. Spread operator can be handy for this case.
        clone.circularReference = {
            ...this.circularReference,
            prototype: { ...this },
        };

        return clone;
    }
}

class ComponentWithBackReference {
    public prototype;

    constructor(prototype: Prototype) {
        this.prototype = prototype;
    }
}

/**
 * The client code.
 */
function clientCode() {
    const p1 = new Prototype();
    p1.primitive = 245;
    p1.component = new Date();
    p1.circularReference = new ComponentWithBackReference(p1);

    const p2 = p1.clone();
    if (p1.primitive === p2.primitive) {
        console.log('Primitive field values have been carried over to a clone. Yay!');
    } else {
        console.log('Primitive field values have not been copied. Booo!');
    }
    if (p1.component === p2.component) {
        console.log('Simple component has not been cloned. Booo!');
    } else {
        console.log('Simple component has been cloned. Yay!');
    }

    if (p1.circularReference === p2.circularReference) {
        console.log('Component with back reference has not been cloned. Booo!');
    } else {
        console.log('Component with back reference has been cloned. Yay!');
    }

    if (p1.circularReference.prototype === p2.circularReference.prototype) {
        console.log('Component with back reference is linked to original object. Booo!');
    } else {
        console.log('Component with back reference is linked to the clone. Yay!');
    }
}

clientCode();
```

Output.txt: Resultado de la ejecución

```
Primitive field values have been carried over to a clone. Yay!
Simple component has been cloned. Yay!
Component with back reference has been cloned. Yay!
Component with back reference is linked to the clone. Yay!
```

### **Patrón de Diseño: Factory Method**

#### 📌 **Propósito**

El patrón de diseño **Factory Method** es un patrón creacional que proporciona una interfaz para crear objetos en una superclase, permitiendo que las subclases alteren el tipo de
objetos que se crearán.

---

#### 🚩 **Problema**

- **Dificultad al añadir nuevos tipos de objetos:**  
  En aplicaciones acopladas a clases concretas, añadir nuevos tipos de productos requiere modificar gran parte del código. Esto resulta en código propenso a errores y difícil de
  mantener.

---

#### 💡 **Solución**

El Factory Method propone:

- Reemplazar la creación directa de objetos (`new`) por un **método fábrica** en una clase base.
- Las **subclases sobrescriben** este método para especificar qué tipo de objeto se debe crear, sin modificar el código cliente.

---

#### 🗂️ **Estructura**

1. **Producto (Product):** Declara la interfaz común para los objetos creados.
2. **Productos Concretos:** Implementan la interfaz de producto.
3. **Creador (Creator):** Declara el Factory Method y puede tener lógica por defecto.
4. **Creadores Concretos:** Sobrescriben el Factory Method para crear productos específicos.

---

#### 📝 **Pseudocódigo**

```pseudocode
// Interfaz del producto
interface Button {
    method render()
    method onClick(f)
}

// Productos concretos
class WindowsButton implements Button {
    method render() { /* Botón estilo Windows */ }
    method onClick(f) { /* Evento nativo */ }
}

class HTMLButton implements Button {
    method render() { /* Botón HTML */ }
    method onClick(f) { /* Evento web */ }
}

// Clase creadora
abstract class Dialog {
    abstract method createButton(): Button

    method render() {
        Button okButton = createButton()
        okButton.onClick(closeDialog)
        okButton.render()
    }
}

// Creadores concretos
class WindowsDialog extends Dialog {
    method createButton(): Button {
        return new WindowsButton()
    }
}

class WebDialog extends Dialog {
    method createButton(): Button {
        return new HTMLButton()
    }
}
```

---

#### 🎯 **Aplicabilidad**

- **Cuando no conoces de antemano** el tipo exacto de objetos que tu código debe crear.
- **Extensión de frameworks o bibliotecas:** Permite a los desarrolladores personalizar componentes sin modificar el código base.
- **Reutilización de objetos existentes** para ahorrar recursos.

---

#### ⚙️ **Cómo implementarlo**

1. **Definir una interfaz común** para los productos.
2. Añadir un **método fábrica abstracto** en la clase creadora.
3. **Reemplazar instancias directas** (`new`) por llamadas al método fábrica.
4. Crear **subclases creadoras** que sobrescriban el método para devolver tipos de productos específicos.

---

#### ✅ **Pros y ❌ Contras**

**Pros:**

- Reduce el acoplamiento entre el creador y los productos concretos.
- Facilita la **extensibilidad** para agregar nuevos productos sin modificar el código existente.
- Apoya el **principio de responsabilidad única** al separar la creación de objetos de su uso.

**Contras:**

- Puede aumentar la complejidad del código al requerir múltiples subclases.
- Sobrecarga el diseño con jerarquías innecesarias si no se requiere una flexibilidad significativa.

---

#### 🔗 **Relaciones con otros patrones**

- **Abstract Factory:** A menudo utiliza Factory Method para crear familias de productos relacionados.
- **Prototype:** Puede usarse para clonar objetos en lugar de crearlos desde cero.
- **Template Method:** Factory Method puede ser un paso dentro de un Template Method para personalizar la creación de objetos.

---
Ejemplo conceptual
Este ejemplo ilustra la estructura del patrón de diseño Factory Method y se centra en las siguientes preguntas:

¿De qué clases se compone?
¿Qué papeles juegan esas clases?
¿De qué forma se relacionan los elementos del patrón?
index.ts: Ejemplo conceptual

```
/**
* The Creator class declares the factory method that is supposed to return an
* object of a Product class. The Creator's subclasses usually provide the
* implementation of this method.
  */
  abstract class Creator {
  /**
 * Note that the Creator may also provide some default implementation of the
 * factory method.
   */
   public abstract factoryMethod(): Product;

  /**
 * Also note that, despite its name, the Creator's primary responsibility is
 * not creating products. Usually, it contains some core business logic that
 * relies on Product objects, returned by the factory method. Subclasses can
 * indirectly change that business logic by overriding the factory method
 * and returning a different type of product from it.
   */
   public someOperation(): string {
   // Call the factory method to create a Product object.
   const product = this.factoryMethod();
   // Now, use the product.
   return `Creator: The same creator's code has just worked with ${product.operation()}`;
   }
   }

/**
* Concrete Creators override the factory method in order to change the
* resulting product's type.
  */
  class ConcreteCreator1 extends Creator {
  /**
 * Note that the signature of the method still uses the abstract product
 * type, even though the concrete product is actually returned from the
 * method. This way the Creator can stay independent of concrete product
 * classes.
   */
   public factoryMethod(): Product {
   return new ConcreteProduct1();
   }
   }

class ConcreteCreator2 extends Creator {
public factoryMethod(): Product {
return new ConcreteProduct2();
}
}

/**
* The Product interface declares the operations that all concrete products must
* implement.
  */
  interface Product {
  operation(): string;
  }

/**
* Concrete Products provide various implementations of the Product interface.
  */
  class ConcreteProduct1 implements Product {
  public operation(): string {
  return '{Result of the ConcreteProduct1}';
  }
  }

class ConcreteProduct2 implements Product {
public operation(): string {
return '{Result of the ConcreteProduct2}';
}
}

/**
* The client code works with an instance of a concrete creator, albeit through
* its base interface. As long as the client keeps working with the creator via
* the base interface, you can pass it any creator's subclass.
  */
  function clientCode(creator: Creator) {
  // ...
  console.log('Client: I\'m not aware of the creator\'s class, but it still works.');
  console.log(creator.someOperation());
  // ...
  }

/**
* The Application picks a creator's type depending on the configuration or
* environment.
  */
  console.log('App: Launched with the ConcreteCreator1.');
  clientCode(new ConcreteCreator1());
  console.log('');

console.log('App: Launched with the ConcreteCreator2.');
clientCode(new ConcreteCreator2());
```

Output.txt: Resultado de la ejecución

```
App: Launched with the ConcreteCreator1.
Client: I'm not aware of the creator's class, but it still works.
Creator: The same creator's code has just worked with {Result of the ConcreteProduct1}

App: Launched with the ConcreteCreator2.
Client: I'm not aware of the creator's class, but it still works.
Creator: The same creator's code has just worked with {Result of the ConcreteProduct2}
```

### **Patrón de Diseño: Builder**

#### 📌 **Propósito**

El patrón de diseño **Builder** es un patrón creacional que permite construir objetos complejos paso a paso. Permite producir diferentes tipos y representaciones de un objeto
utilizando el mismo código de construcción.

---

#### 🚩 **Problema**

- **Inicialización complicada:** Cuando un objeto requiere muchos parámetros o configuraciones, los constructores se vuelven difíciles de gestionar.
- **Constructores telescópicos:** Uso excesivo de sobrecargas de constructores para manejar combinaciones de parámetros, lo que complica el mantenimiento del código.

---

#### 💡 **Solución**

El patrón Builder propone:

- Extraer el código de construcción de la clase principal y colocarlo en una clase separada llamada **Constructor**.
- Definir pasos de construcción (`construirParedes()`, `instalarPuerta()`, etc.) que permiten configurar el objeto final de forma flexible.

---

#### 🗂️ **Estructura**

1. **Interfaz del Constructor:** Define los métodos para construir las partes del producto.
2. **Constructores Concretos:** Implementan los métodos definidos en la interfaz para crear diferentes representaciones del producto.
3. **Producto:** El objeto que se está construyendo.
4. **Director:** Controla el proceso de construcción, definiendo el orden en que se llaman los métodos del constructor.
5. **Cliente:** Inicia el proceso de construcción creando instancias del constructor y del director.

---

#### 📝 **Pseudocódigo**

```pseudocode
// Producto complejo
class Car {
    // Atributos como motor, asientos, GPS, etc.
}

// Interfaz del constructor
interface Builder {
    method reset()
    method setSeats(number)
    method setEngine(type)
    method setGPS(enabled)
}

// Constructor concreto para autos
class CarBuilder implements Builder {
    private car

    method reset() {
        this.car = new Car()
    }

    method setSeats(number) {
        car.seats = number
    }

    method setEngine(type) {
        car.engine = type
    }

    method setGPS(enabled) {
        car.gps = enabled
    }

    method getProduct() {
        return this.car
    }
}

// Director
class Director {
    method constructSportsCar(builder) {
        builder.reset()
        builder.setSeats(2)
        builder.setEngine("V8")
        builder.setGPS(true)
    }
}

// Código cliente
director = new Director()
builder = new CarBuilder()

director.constructSportsCar(builder)
car = builder.getProduct()
```

---

#### 🎯 **Aplicabilidad**

- **Evitar constructores telescópicos:** Permite construir objetos de manera flexible sin depender de constructores largos con muchos parámetros.
- **Múltiples representaciones:** Facilita la creación de diferentes variantes de un objeto sin duplicar el código de construcción.
- **Construcción paso a paso:** Ideal para objetos que requieren una configuración compleja.

---

#### ⚙️ **Cómo implementarlo**

1. Define una **interfaz de constructor** con métodos para cada paso del proceso de construcción.
2. Crea **constructores concretos** que implementen la interfaz y definan la lógica para construir diferentes representaciones del producto.
3. (Opcional) Añade un **director** que defina el orden de los pasos de construcción.
4. El **cliente** utiliza el director y el constructor para crear instancias del producto final.

---

#### ✅ **Pros y ❌ Contras**

**Pros:**

- Permite construir objetos paso a paso.
- Facilita la reutilización del código de construcción.
- Mejora la legibilidad del código al separar la lógica de construcción de la lógica de negocio.
- Apoya el **principio de responsabilidad única**.

**Contras:**

- Introduce complejidad adicional al requerir múltiples clases.
- Puede ser excesivo para objetos simples.

---

#### 🔗 **Relaciones con otros patrones**

- **Factory Method:** Comienza como una solución más simple, pero puede evolucionar hacia Builder para mayor flexibilidad.
- **Abstract Factory:** Crea familias de objetos relacionados, mientras que Builder se enfoca en construir un solo objeto complejo.
- **Prototype:** Puede usarse junto con Builder para clonar objetos parcialmente construidos.
- **Composite:** Builder es útil para construir estructuras de árbol complejas de forma recursiva.

---

Ejemplo conceptual
Este ejemplo ilustra la estructura del patrón de diseño Builder y se centra en las siguientes preguntas:

¿De qué clases se compone?
¿Qué papeles juegan esas clases?
¿De qué forma se relacionan los elementos del patrón?
index.ts: Ejemplo conceptual

```
/**
* The Builder interface specifies methods for creating the different parts of
* the Product objects.
  */
  interface Builder {
  producePartA(): void;
  producePartB(): void;
  producePartC(): void;
  }

/**
* The Concrete Builder classes follow the Builder interface and provide
* specific implementations of the building steps. Your program may have several
* variations of Builders, implemented differently.
  */
  class ConcreteBuilder1 implements Builder {
  private product: Product1;

  /**
 * A fresh builder instance should contain a blank product object, which is
 * used in further assembly.
   */
   constructor() {
   this.reset();
   }

  public reset(): void {
  this.product = new Product1();
  }

  /**
 * All production steps work with the same product instance.
   */
   public producePartA(): void {
   this.product.parts.push('PartA1');
   }

  public producePartB(): void {
  this.product.parts.push('PartB1');
  }

  public producePartC(): void {
  this.product.parts.push('PartC1');
  }

  /**
 * Concrete Builders are supposed to provide their own methods for
 * retrieving results. That's because various types of builders may create
 * entirely different products that don't follow the same interface.
 * Therefore, such methods cannot be declared in the base Builder interface
 * (at least in a statically typed programming language).
 *
 * Usually, after returning the end result to the client, a builder instance
 * is expected to be ready to start producing another product. That's why
 * it's a usual practice to call the reset method at the end of the
 * `getProduct` method body. However, this behavior is not mandatory, and
 * you can make your builders wait for an explicit reset call from the
 * client code before disposing of the previous result.
   */
   public getProduct(): Product1 {
   const result = this.product;
   this.reset();
   return result;
   }
   }

/**
* It makes sense to use the Builder pattern only when your products are quite
* complex and require extensive configuration.
*
* Unlike in other creational patterns, different concrete builders can produce
* unrelated products. In other words, results of various builders may not
* always follow the same interface.
  */
  class Product1 {
  public parts: string[] = [];

  public listParts(): void {
  console.log(`Product parts: ${this.parts.join(', ')}\n`);
  }
  }

/**
* The Director is only responsible for executing the building steps in a
* particular sequence. It is helpful when producing products according to a
* specific order or configuration. Strictly speaking, the Director class is
* optional, since the client can control builders directly.
  */
  class Director {
  private builder: Builder;

  /**
 * The Director works with any builder instance that the client code passes
 * to it. This way, the client code may alter the final type of the newly
 * assembled product.
   */
   public setBuilder(builder: Builder): void {
   this.builder = builder;
   }

  /**
 * The Director can construct several product variations using the same
 * building steps.
   */
   public buildMinimalViableProduct(): void {
   this.builder.producePartA();
   }

  public buildFullFeaturedProduct(): void {
  this.builder.producePartA();
  this.builder.producePartB();
  this.builder.producePartC();
  }
  }

/**
* The client code creates a builder object, passes it to the director and then
* initiates the construction process. The end result is retrieved from the
* builder object.
  */
  function clientCode(director: Director) {
  const builder = new ConcreteBuilder1();
  director.setBuilder(builder);

  console.log('Standard basic product:');
  director.buildMinimalViableProduct();
  builder.getProduct().listParts();

  console.log('Standard full featured product:');
  director.buildFullFeaturedProduct();
  builder.getProduct().listParts();

  // Remember, the Builder pattern can be used without a Director class.
  console.log('Custom product:');
  builder.producePartA();
  builder.producePartC();
  builder.getProduct().listParts();
  }

const director = new Director();
clientCode(director);
```

Output.txt: Resultado de la ejecución

```
Standard basic product:
Product parts: PartA1

Standard full featured product:
Product parts: PartA1, PartB1, PartC1

Custom product:
Product parts: PartA1, PartC1
```

### **Patrón de Diseño: Abstract Factory**

#### 📌 **Propósito**

El patrón de diseño **Abstract Factory** es un patrón creacional que permite producir familias de objetos relacionados sin especificar sus clases concretas.

---

#### 🚩 **Problema**

- **Incompatibilidad de productos:** Al desarrollar un sistema, es común necesitar productos relacionados que deben ser compatibles entre sí. Por ejemplo, un conjunto de muebles
  que deben tener el mismo estilo (moderno, victoriano, etc.).
- **Cambio frecuente de variantes:** Se desea agregar nuevas familias de productos sin modificar el código cliente.

---

#### 💡 **Solución**

El patrón propone:

- Definir **interfaces abstractas** para cada tipo de producto (e.g., `Silla`, `Sofá`, `Mesilla`).
- Crear **fábricas concretas** que implementan una interfaz común y producen objetos de una familia específica de productos relacionados.
- El **código cliente** trabaja con las fábricas y productos a través de sus interfaces abstractas, lo que permite cambiar la familia de productos sin alterar el código.

---

#### 🗂️ **Estructura**

1. **Producto Abstracto:** Interfaces para diferentes productos de la familia (e.g., `Silla`, `Sofá`).
2. **Productos Concretos:** Implementaciones específicas de los productos (e.g., `SillaModerna`, `SofáVictoriano`).
3. **Fábrica Abstracta:** Define métodos para crear productos abstractos (e.g., `crearSilla()`, `crearSofá()`).
4. **Fábricas Concretas:** Implementan la fábrica abstracta para producir una variante específica de productos.
5. **Cliente:** Usa la fábrica para crear productos sin depender de sus clases concretas.

---

#### 📝 **Pseudocódigo**

```pseudocode
// Interfaz de la fábrica abstracta
interface GUIFactory {
    method createButton(): Button
    method createCheckbox(): Checkbox
}

// Fábrica concreta para Windows
class WinFactory implements GUIFactory {
    method createButton(): Button {
        return new WinButton()
    }
    method createCheckbox(): Checkbox {
        return new WinCheckbox()
    }
}

// Fábrica concreta para Mac
class MacFactory implements GUIFactory {
    method createButton(): Button {
        return new MacButton()
    }
    method createCheckbox(): Checkbox {
        return new MacCheckbox()
    }
}

// Interfaz de producto
interface Button {
    method paint()
}

// Productos concretos
class WinButton implements Button {
    method paint() {
        // Representación estilo Windows
    }
}

class MacButton implements Button {
    method paint() {
        // Representación estilo macOS
    }
}

// Código cliente
class Application {
    private factory: GUIFactory
    private button: Button

    constructor(factory: GUIFactory) {
        this.factory = factory
    }

    method createUI() {
        this.button = factory.createButton()
    }

    method paint() {
        button.paint()
    }
}
```

---

#### 🎯 **Aplicabilidad**

- Cuando se necesita trabajar con **familias de productos relacionados**.
- Cuando el sistema debe ser **independiente de cómo se crean los objetos**.
- **Facilidad de extensión**: agregar nuevas familias de productos sin alterar el código existente.

---

#### ⚙️ **Cómo implementarlo**

1. Definir **interfaces para productos abstractos**.
2. Implementar **productos concretos** para cada variante.
3. Crear una **interfaz de fábrica abstracta** con métodos para cada tipo de producto.
4. Implementar **fábricas concretas** para cada familia de productos.
5. Configurar el **código cliente** para trabajar con fábricas a través de sus interfaces.

---

#### ✅ **Pros y ❌ Contras**

**Pros:**

- Garantiza la **compatibilidad** entre productos relacionados.
- Facilita la **extensibilidad** sin modificar el código cliente.
- Fomenta el **principio de responsabilidad única** al centralizar la creación de objetos.

**Contras:**

- **Complejidad adicional** debido a la creación de múltiples interfaces y clases.
- Puede ser **excesivo** para aplicaciones simples.

---

#### 🔗 **Relaciones con otros patrones**

- **Factory Method:** Abstract Factory puede basarse en Factory Method para implementar sus métodos de creación.
- **Builder:** Se enfoca en construir objetos paso a paso, mientras que Abstract Factory crea familias de objetos de forma inmediata.
- **Prototype:** Puede usarse para definir los métodos de creación de productos dentro de las fábricas.
- **Singleton:** Abstract Factory puede implementarse como Singleton para garantizar una instancia única de la fábrica.

---
Ejemplo conceptual
Este ejemplo ilustra la estructura del patrón de diseño Abstract Factory, centrándose en responder las siguientes preguntas:

¿De qué clases se compone?
¿Qué papeles juegan esas clases?
¿De qué forma se relacionan los elementos del patrón?
index.ts: Ejemplo conceptual

```
/**
* The Abstract Factory interface declares a set of methods that return
* different abstract products. These products are called a family and are
* related by a high-level theme or concept. Products of one family are usually
* able to collaborate among themselves. A family of products may have several
* variants, but the products of one variant are incompatible with products of
* another.
  */
  interface AbstractFactory {
  createProductA(): AbstractProductA;

  createProductB(): AbstractProductB;
  }

/**
* Concrete Factories produce a family of products that belong to a single
* variant. The factory guarantees that resulting products are compatible. Note
* that signatures of the Concrete Factory's methods return an abstract product,
* while inside the method a concrete product is instantiated.
  */
  class ConcreteFactory1 implements AbstractFactory {
  public createProductA(): AbstractProductA {
  return new ConcreteProductA1();
  }

  public createProductB(): AbstractProductB {
  return new ConcreteProductB1();
  }
  }

/**
* Each Concrete Factory has a corresponding product variant.
  */
  class ConcreteFactory2 implements AbstractFactory {
  public createProductA(): AbstractProductA {
  return new ConcreteProductA2();
  }

  public createProductB(): AbstractProductB {
  return new ConcreteProductB2();
  }
  }

/**
* Each distinct product of a product family should have a base interface. All
* variants of the product must implement this interface.
  */
  interface AbstractProductA {
  usefulFunctionA(): string;
  }

/**
* These Concrete Products are created by corresponding Concrete Factories.
  */
  class ConcreteProductA1 implements AbstractProductA {
  public usefulFunctionA(): string {
  return 'The result of the product A1.';
  }
  }

class ConcreteProductA2 implements AbstractProductA {
public usefulFunctionA(): string {
return 'The result of the product A2.';
}
}

/**
* Here's the the base interface of another product. All products can interact
* with each other, but proper interaction is possible only between products of
* the same concrete variant.
  */
  interface AbstractProductB {
  /**
 * Product B is able to do its own thing...
   */
   usefulFunctionB(): string;

  /**
 * ...but it also can collaborate with the ProductA.
 *
 * The Abstract Factory makes sure that all products it creates are of the
 * same variant and thus, compatible.
   */
   anotherUsefulFunctionB(collaborator: AbstractProductA): string;
   }

/**
* These Concrete Products are created by corresponding Concrete Factories.
  */
  class ConcreteProductB1 implements AbstractProductB {

  public usefulFunctionB(): string {
  return 'The result of the product B1.';
  }

  /**
 * The variant, Product B1, is only able to work correctly with the variant,
 * Product A1. Nevertheless, it accepts any instance of AbstractProductA as
 * an argument.
   */
   public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
   const result = collaborator.usefulFunctionA();
   return `The result of the B1 collaborating with the (${result})`;
   }
   }

class ConcreteProductB2 implements AbstractProductB {

    public usefulFunctionB(): string {
        return 'The result of the product B2.';
    }

    /**
     * The variant, Product B2, is only able to work correctly with the variant,
     * Product A2. Nevertheless, it accepts any instance of AbstractProductA as
     * an argument.
     */
    public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
        const result = collaborator.usefulFunctionA();
        return `The result of the B2 collaborating with the (${result})`;
    }
}

/**
* The client code works with factories and products only through abstract
* types: AbstractFactory and AbstractProduct. This lets you pass any factory or
* product subclass to the client code without breaking it.
  */
  function clientCode(factory: AbstractFactory) {
  const productA = factory.createProductA();
  const productB = factory.createProductB();

  console.log(productB.usefulFunctionB());
  console.log(productB.anotherUsefulFunctionB(productA));
  }

/**
* The client code can work with any concrete factory class.
  */
  console.log('Client: Testing client code with the first factory type...');
  clientCode(new ConcreteFactory1());

console.log('');

console.log('Client: Testing the same client code with the second factory type...');
clientCode(new ConcreteFactory2());
```

Output.txt: Resultado de la ejecución

```
Client: Testing client code with the first factory type...
The result of the product B1.
The result of the B1 collaborating with the (The result of the product A1.)

Client: Testing the same client code with the second factory type...
The result of the product B2.
The result of the B2 collaborating with the (The result of the product A2.)
```

# patrones estructorales

### **Patrón de Diseño: Adapter**

#### 📌 **Propósito**

El patrón de diseño **Adapter** es un patrón estructural que permite la colaboración entre objetos con interfaces incompatibles al convertir la interfaz de una clase en otra que
espera el cliente.

---

#### 🚩 **Problema**

- **Incompatibilidad de interfaces:** Por ejemplo, una aplicación que descarga datos en XML, pero necesita integrarse con una biblioteca que solo acepta JSON.
- **Imposibilidad de modificar el código fuente:** Puede que no tengas acceso al código de la biblioteca externa o que modificarlo cause problemas en el resto del sistema.

---

#### 💡 **Solución**

El Adapter actúa como un **traductor**:

1. **Envuelve** un objeto existente para ocultar la complejidad de la conversión de datos.
2. **Convierte la interfaz** del objeto envuelto a un formato que el cliente espera.
3. Puede ser **unidireccional** o **bidireccional**, permitiendo la adaptación en ambos sentidos si es necesario.

---

#### 🗂️ **Estructura**

1. **Cliente:** Lógica de negocio que depende de una interfaz específica.
2. **Interfaz de Cliente:** Define el protocolo esperado por el cliente.
3. **Servicio:** Clase existente con una interfaz incompatible.
4. **Adapter:** Implementa la interfaz del cliente y traduce las llamadas hacia el servicio.

Existen dos variantes:

- **Adapter de Objeto:** Utiliza composición para adaptarse a la interfaz del servicio.
- **Adapter de Clase:** Utiliza herencia (solo posible en lenguajes que soportan herencia múltiple).

---

#### 📝 **Pseudocódigo**

```pseudocode
// Interfaz esperada por el cliente
class RoundHole {
    method fits(peg: RoundPeg) {
        return this.getRadius() >= peg.getRadius()
    }
}

class RoundPeg {
    constructor(radius)
    method getRadius()
}

// Clase incompatible
class SquarePeg {
    constructor(width)
    method getWidth()
}

// Adaptador que permite encajar SquarePeg en RoundHole
class SquarePegAdapter extends RoundPeg {
    private peg: SquarePeg

    constructor(peg: SquarePeg) {
        this.peg = peg
    }

    method getRadius() {
        return peg.getWidth() * Math.sqrt(2) / 2
    }
}

// Uso del adaptador
hole = new RoundHole(5)
squarePeg = new SquarePeg(5)
adapter = new SquarePegAdapter(squarePeg)

hole.fits(adapter) // verdadero
```

---

#### 🎯 **Aplicabilidad**

- Cuando necesitas reutilizar una clase existente pero su interfaz no es compatible.
- Para integrar **clases de terceros** o bibliotecas heredadas sin modificar su código.
- Cuando quieres **añadir funcionalidad** a varias subclases sin duplicar código.

---

#### ⚙️ **Cómo implementarlo**

1. Identifica las clases con interfaces incompatibles (Cliente y Servicio).
2. Define la **interfaz del cliente** que se espera.
3. Crea una clase **Adapter** que implemente la interfaz del cliente.
4. El Adapter debe **traducir** las llamadas del cliente a la interfaz del servicio.
5. Asegúrate de que el cliente solo interactúe con el Adapter a través de la interfaz definida.

---

#### ✅ **Pros y ❌ Contras**

**Pros:**

- Cumple con el **principio de responsabilidad única** al separar la lógica de conversión de la lógica de negocio.
- Permite la **extensibilidad** sin modificar el código cliente, cumpliendo el **principio de abierto/cerrado**.
- Facilita la integración de bibliotecas de terceros o código legado.

**Contras:**

- Aumenta la **complejidad** al añadir más clases e interfaces.
- Puede haber una **ligera sobrecarga** en el rendimiento debido a la capa adicional de adaptación.

---

#### 🔗 **Relaciones con otros patrones**

- **Bridge:** Diseñado para separar abstracciones y sus implementaciones; Adapter se usa para integrar clases ya existentes.
- **Decorator:** Ambos envuelven objetos, pero Decorator añade funcionalidades, mientras que Adapter cambia la interfaz.
- **Facade:** Simplifica la interfaz de un sistema completo, mientras que Adapter hace compatible una interfaz específica.
- **Proxy:** Similar en estructura, pero Proxy controla el acceso al objeto, no lo adapta.

Ejemplo conceptual
Este ejemplo ilustra la estructura del patrón de diseño Adapter y se centra en las siguientes preguntas:

¿De qué clases se compone?
¿Qué papeles juegan esas clases?
¿De qué forma se relacionan los elementos del patrón?
index.ts: Ejemplo conceptual

```
/**
* The Target defines the domain-specific interface used by the client code.
  */
  class Target {
  public request(): string {
  return 'Target: The default target\'s behavior.';
  }
  }

/**
* The Adaptee contains some useful behavior, but its interface is incompatible
* with the existing client code. The Adaptee needs some adaptation before the
* client code can use it.
  */
  class Adaptee {
  public specificRequest(): string {
  return '.eetpadA eht fo roivaheb laicepS';
  }
  }

/**
* The Adapter makes the Adaptee's interface compatible with the Target's
* interface.
  */
  class Adapter extends Target {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
  super();
  this.adaptee = adaptee;
  }

  public request(): string {
  const result = this.adaptee.specificRequest().split('').reverse().join('');
  return `Adapter: (TRANSLATED) ${result}`;
  }
  }

/**
* The client code supports all classes that follow the Target interface.
  */
  function clientCode(target: Target) {
  console.log(target.request());
  }

console.log('Client: I can work just fine with the Target objects:');
const target = new Target();
clientCode(target);

console.log('');

const adaptee = new Adaptee();
console.log('Client: The Adaptee class has a weird interface. See, I don\'t understand it:');
console.log(`Adaptee: ${adaptee.specificRequest()}`);

console.log('');

console.log('Client: But I can work with it via the Adapter:');
const adapter = new Adapter(adaptee);
clientCode(adapter);
```

Output.txt: Resultado de la ejecución

```
Client: I can work just fine with the Target objects:
Target: The default target's behavior.

Client: The Adaptee class has a weird interface. See, I don't understand it:
Adaptee: .eetpadA eht fo roivaheb laicepS

Client: But I can work with it via the Adapter:
Adapter: (TRANSLATED) Special behavior of the Adaptee.
```

---

### **Patrón de Diseño: Bridge**

#### 📌 **Propósito**

El patrón de diseño **Bridge** es un patrón estructural que permite dividir una clase grande o un grupo de clases estrechamente relacionadas en dos jerarquías separadas: *
*abstracción** e **implementación**, permitiendo que ambas evolucionen de forma independiente.

---

#### 🚩 **Problema**

- **Explosión de clases:**  
  Al intentar extender una jerarquía de clases en dos dimensiones (por ejemplo, formas y colores), se produce una **combinación exponencial** de subclases.  
  Ejemplo: `CírculoRojo`, `CírculoAzul`, `CuadradoRojo`, `CuadradoAzul`...

- **Acoplamiento rígido:**  
  Los cambios en la lógica de negocio o en la implementación requieren modificaciones en múltiples clases, aumentando la complejidad y dificultando el mantenimiento.

---

#### 💡 **Solución**

El patrón Bridge propone:

- **Separar la abstracción de su implementación**, utilizando **composición** en lugar de herencia.
- La **abstracción** mantiene una referencia a un objeto de la **implementación**, delegando en él el trabajo específico.
- Esto permite modificar o extender cada jerarquía de forma independiente.

---

#### 🗂️ **Estructura**

1. **Abstracción:** Proporciona una interfaz de alto nivel que utiliza la implementación subyacente.
2. **Abstracción Refinada:** Extiende la funcionalidad de la abstracción base si es necesario.
3. **Implementación:** Interfaz que define las operaciones básicas para las implementaciones concretas.
4. **Implementaciones Concretas:** Proporcionan la funcionalidad específica de la implementación.
5. **Cliente:** Interactúa con la abstracción, sin preocuparse por la implementación concreta.

---

#### 📝 **Pseudocódigo**

```pseudocode
// Interfaz de implementación
interface Device {
    method isEnabled()
    method enable()
    method disable()
    method getVolume()
    method setVolume(percent)
    method getChannel()
    method setChannel(channel)
}

// Implementación concreta: TV
class Tv implements Device {
    // Lógica específica para TV
}

// Implementación concreta: Radio
class Radio implements Device {
    // Lógica específica para Radio
}

// Abstracción
class RemoteControl {
    protected device: Device

    constructor(device: Device) {
        this.device = device
    }

    method togglePower() {
        if (device.isEnabled()) {
            device.disable()
        } else {
            device.enable()
        }
    }

    method volumeUp() {
        device.setVolume(device.getVolume() + 10)
    }
}

// Abstracción refinada
class AdvancedRemoteControl extends RemoteControl {
    method mute() {
        device.setVolume(0)
    }
}

// Uso del patrón Bridge
tv = new Tv()
remote = new AdvancedRemoteControl(tv)
remote.togglePower()
remote.mute()
```

---

#### 🎯 **Aplicabilidad**

- **Cuando necesitas evitar la explosión de subclases:**  
  Ideal si tienes múltiples dimensiones de variación (por ejemplo, diferentes formas y colores).

- **Para permitir la evolución independiente:**  
  Permite modificar la lógica de negocio o la implementación sin afectar la otra parte.

- **Cambios en tiempo de ejecución:**  
  Permite intercambiar implementaciones durante la ejecución del programa.

---

#### ⚙️ **Cómo implementarlo**

1. **Identificar las dimensiones de variación** en tu aplicación.
2. Crear una **interfaz de abstracción** para definir las operaciones de alto nivel.
3. Definir una **interfaz de implementación** para operaciones básicas.
4. Desarrollar **implementaciones concretas** para ambas jerarquías.
5. Usar **composición** para que la abstracción contenga una referencia a la implementación.

---

#### ✅ **Pros y ❌ Contras**

**Pros:**

- Permite desarrollar **abstracción e implementación de forma independiente**.
- **Reduce el acoplamiento** entre el cliente y la implementación concreta.
- Facilita la **extensibilidad** para añadir nuevas funcionalidades sin romper el código existente.
- Mejora la **organización del código**, especialmente en sistemas complejos.

**Contras:**

- Aumenta la **complejidad** inicial del diseño.
- Puede ser innecesario si el sistema no tiene múltiples dimensiones de variación.

---

#### 🔗 **Relaciones con otros patrones**

- **Adapter:** Ambos patrones permiten la interoperabilidad, pero Bridge se diseña desde el principio para separar la abstracción de la implementación, mientras que Adapter se usa
  para integrar clases existentes incompatibles.
- **Strategy:** Ambos permiten la intercambiabilidad de comportamientos, pero Strategy se enfoca en algoritmos, mientras que Bridge se centra en la separación de la lógica de
  negocio y la implementación.
- **Abstract Factory:** Se puede usar junto con Bridge para crear familias de objetos relacionados.
- **Decorator:** Ambos usan composición, pero Decorator añade funcionalidades adicionales en tiempo de ejecución, mientras que Bridge separa la abstracción de la implementación.

---





---

### **Patrón de Diseño: Composite**

#### 📌 **Propósito**

El patrón de diseño **Composite** es un patrón estructural que permite componer objetos en estructuras de árbol y trabajar con esas estructuras como si fueran objetos individuales.

---

#### 🚩 **Problema**

- **Estructuras jerárquicas complejas:**  
  Se presenta cuando el modelo central de la aplicación puede representarse en forma de árbol. Ejemplo clásico: un sistema de pedidos donde una caja puede contener productos
  individuales y otras cajas más pequeñas.

- **Dificultad para tratar objetos simples y compuestos de la misma manera:**  
  Calcular el precio total de un pedido que contiene productos y cajas anidadas puede volverse complejo si no se maneja una estructura uniforme.

---

#### 💡 **Solución**

- Definir una **interfaz común** para productos simples (hojas) y compuestos (contenedores).
- Cada clase implementa un método para realizar operaciones (por ejemplo, calcular el precio):
- Los **productos simples** devuelven su propio valor.
- Los **contenedores** iteran sobre sus hijos (que pueden ser productos o cajas) y suman sus valores.

---

#### 🗂️ **Estructura**

1. **Componente:** Interfaz que declara operaciones comunes para objetos simples y complejos.
2. **Hoja:** Representa objetos finales (sin hijos), realiza el trabajo real.
3. **Contenedor (Composite):** Contiene otros componentes (hojas o composites), delega operaciones a sus hijos y agrega resultados.
4. **Cliente:** Interactúa con todos los objetos a través de la interfaz común, sin preocuparse de si se trata de un objeto simple o compuesto.

---

#### 📝 **Pseudocódigo**

```pseudocode
// Interfaz Componente
interface Graphic {
    method move(x, y)
    method draw()
}

// Clase Hoja
class Dot implements Graphic {
    field x, y

    method move(x, y) {
        this.x += x
        this.y += y
    }

    method draw() {
        // Dibuja un punto en la coordenada (x, y)
    }
}

// Clase derivada de Hoja
class Circle extends Dot {
    field radius

    method draw() {
        // Dibuja un círculo en (x, y) con radio 'radius'
    }
}

// Contenedor (Composite)
class CompoundGraphic implements Graphic {
    field children: array of Graphic

    method add(child: Graphic)
    method remove(child: Graphic)

    method move(x, y) {
        for (child in children)
            child.move(x, y)
    }

    method draw() {
        for (child in children)
            child.draw()
    }
}

// Código cliente
class ImageEditor {
    field all: CompoundGraphic

    method load() {
        all = new CompoundGraphic()
        all.add(new Dot(1, 2))
        all.add(new Circle(5, 3, 10))
    }

    method groupSelected(components: array of Graphic) {
        group = new CompoundGraphic()
        for (component in components) {
            group.add(component)
            all.remove(component)
        }
        all.add(group)
        all.draw()
    }
}
```

---

#### 🎯 **Aplicabilidad**

- Cuando necesitas representar **estructuras de objetos jerárquicas** (por ejemplo, árboles genealógicos, menús, gráficos).
- Cuando deseas que el **código cliente trate de la misma forma objetos simples y compuestos**, usando una interfaz común.
- Para implementar comportamientos recursivos en estructuras de árbol.

---

#### ⚙️ **Cómo implementarlo**

1. **Identificar la estructura de árbol** en tu modelo.
2. Crear una **interfaz común** para definir operaciones que puedan aplicarse tanto a hojas como a contenedores.
3. Implementar la clase **Hoja** para los objetos simples.
4. Implementar la clase **Contenedor (Composite)**, que contiene referencias a otros objetos (hojas o composites).
5. El **cliente** interactúa con la estructura solo a través de la interfaz común.

---

#### ✅ **Pros y ❌ Contras**

**Pros:**

- **Simplificación del código cliente:** Puedes tratar de forma uniforme objetos simples y compuestos.
- **Facilidad de extensión:** Añadir nuevos tipos de componentes es sencillo, cumpliendo el **principio de abierto/cerrado**.
- Facilita la **implementación de operaciones recursivas**.

**Contras:**

- Puede ser complicado definir una **interfaz común adecuada** para todos los componentes.
- A veces resulta en una **generalización excesiva**, haciendo que la interfaz sea menos específica y más difícil de entender.

---

#### 🔗 **Relaciones con otros patrones**

- **Builder:** Puede usarse para construir estructuras Composite complejas de forma recursiva.
- **Chain of Responsibility:** Puede funcionar bien con Composite para delegar solicitudes a lo largo de una jerarquía de objetos.
- **Iterator:** Facilita la iteración sobre estructuras Composite.
- **Visitor:** Permite aplicar operaciones a todos los nodos de un Composite sin modificar su estructura.
- **Decorator:** Ambos permiten la composición de objetos, pero Decorator agrega responsabilidades, mientras que Composite gestiona estructuras jerárquicas.
- **Flyweight:** Se puede usar para optimizar el uso de memoria en nodos de hoja compartidos dentro de un Composite.

---





---

### **Patrón de Diseño: Decorator**

#### 📌 **Propósito**

El patrón de diseño **Decorator** es un patrón estructural que permite añadir funcionalidades a objetos de forma dinámica, encapsulándolos dentro de otros objetos especiales
llamados *decoradores* que extienden su comportamiento.

---

#### 🚩 **Problema**

El patrón Decorator resuelve el problema de extender funcionalidades sin necesidad de modificar el código original o crear una proliferación de subclases. Por ejemplo:

- En una biblioteca de notificaciones que inicialmente solo enviaba correos electrónicos, al agregar soporte para SMS, Slack o Facebook, se enfrentaba a la complejidad de manejar
  múltiples combinaciones de notificaciones sin saturar la jerarquía de clases.

---

#### 💡 **Solución**

La solución consiste en usar **composición** en lugar de herencia:

- Se envuelve el objeto base en decoradores que implementan la misma interfaz, lo que permite agregar nuevas responsabilidades antes o después de delegar la llamada al objeto
  original.
- Esto permite apilar decoradores de forma flexible para extender la funcionalidad sin modificar el código existente.

---

#### 🗂️ **Estructura**

1. **Componente:** Define la interfaz común para objetos simples y decoradores.
2. **Componente Concreto:** Implementa la funcionalidad base.
3. **Decorador Base:** Contiene una referencia al componente y delega las operaciones en él.
4. **Decoradores Concretos:** Añaden nuevas funcionalidades extendiendo el decorador base.
5. **Cliente:** Interactúa con los objetos a través de la interfaz del componente, sin importar cuántos decoradores estén aplicados.

---

#### 📝 **Pseudocódigo**

```pseudocode
interface DataSource {
    method writeData(data)
    method readData(): data
}

class FileDataSource implements DataSource {
    method writeData(data) {
        // Guarda datos en un archivo
    }
    method readData() {
        // Lee datos desde un archivo
    }
}

class DataSourceDecorator implements DataSource {
    protected wrappee: DataSource
    constructor(source: DataSource) {
        this.wrappee = source
    }
    method writeData(data) {
        wrappee.writeData(data)
    }
    method readData() {
        return wrappee.readData()
    }
}

class EncryptionDecorator extends DataSourceDecorator {
    method writeData(data) {
        // Encripta datos antes de escribir
        wrappee.writeData(encryptedData)
    }
    method readData() {
        data = wrappee.readData()
        return decrypt(data)
    }
}

class CompressionDecorator extends DataSourceDecorator {
    method writeData(data) {
        // Comprime datos antes de escribir
        wrappee.writeData(compressedData)
    }
    method readData() {
        data = wrappee.readData()
        return decompress(data)
    }
}

// Uso
source = new FileDataSource("datos.txt")
source = new CompressionDecorator(source)
source = new EncryptionDecorator(source)
source.writeData("Información confidencial")
```

---

#### 🎯 **Aplicabilidad**

- **Extender funcionalidades en tiempo de ejecución** sin modificar la clase base.
- **Evitar subclases múltiples** cuando se necesita combinar diversas funcionalidades.
- **Añadir responsabilidades condicionalmente** de forma flexible.

---

#### ⚙️ **Cómo implementarlo**

1. Define una **interfaz común** para el componente base y los decoradores.
2. Implementa la clase base que contiene la funcionalidad principal.
3. Crea un **decorador base** que almacene una referencia al componente.
4. Desarrolla **decoradores concretos** que extiendan el decorador base y añadan comportamiento.
5. El **cliente** combina los decoradores según sea necesario.

---

#### ✅ **Pros y ❌ Contras**

**Pros:**

- Añade funcionalidades sin modificar el código original.
- Permite la **combinación flexible** de comportamientos.
- **Responsabilidad única:** cada decorador gestiona una sola responsabilidad.

**Contras:**

- **Complejidad** en la gestión de múltiples decoradores anidados.
- Puede ser difícil **depurar o rastrear** el flujo de ejecución debido a la composición en cadena.
- **Dependencia del orden:** el orden de los decoradores puede afectar el resultado final.

---

#### 🔗 **Relaciones con otros patrones**

- **Adapter:** Cambia la interfaz de un objeto existente, mientras que Decorator mantiene la interfaz pero añade funcionalidades adicionales.
- **Composite:** Ambos permiten estructuras jerárquicas, pero Composite representa relaciones padre-hijo, mientras que Decorator añade responsabilidades.
- **Proxy:** Similar en estructura, pero Proxy controla el acceso al objeto, mientras que Decorator añade funcionalidades adicionales.

---

Ahora continuaré con el procesamiento de los patrones **Facade**, **Flyweight**, y **Proxy**. 🚀



---

### **Patrón de Diseño: Facade**

#### 📌 **Propósito**

El patrón de diseño **Facade** es un patrón estructural que proporciona una **interfaz simplificada** a una biblioteca, un framework o cualquier otro grupo complejo de clases.

---

#### 🚩 **Problema**

Cuando tu código necesita interactuar con un grupo extenso de clases de un framework o biblioteca:

- Debes inicializar múltiples objetos, gestionar dependencias y coordinar llamadas en el orden correcto.
- Esto genera **acoplamiento estrecho** entre la lógica de negocio y la implementación subyacente, dificultando el mantenimiento y la comprensión.

---

#### 💡 **Solución**

El patrón Facade propone:

- Crear una **clase fachada** que exponga una interfaz simplificada, encapsulando la complejidad del subsistema.
- La fachada delega internamente las solicitudes a los objetos del subsistema según sea necesario, pero el **cliente solo interactúa con la fachada**.

---

#### 🗂️ **Estructura**

1. **Fachada:** Proporciona una interfaz unificada para un conjunto de interfaces en el subsistema.
2. **Subsistema Complejo:** Conjunto de clases que realizan la funcionalidad real, sin conocer la existencia de la fachada.
3. **Cliente:** Interactúa con el subsistema solo a través de la fachada, sin conocer los detalles internos.

---

#### 📝 **Pseudocódigo**

```pseudocode
// Subsistema complejo (clases de una biblioteca de conversión de video)
class VideoFile
class OggCompressionCodec
class MPEG4CompressionCodec
class CodecFactory
class BitrateReader
class AudioMixer

// Fachada que simplifica el uso del subsistema
class VideoConverter {
    method convert(filename, format): File {
        file = new VideoFile(filename)
        sourceCodec = (new CodecFactory).extract(file)
        if (format == "mp4")
            destinationCodec = new MPEG4CompressionCodec()
        else
            destinationCodec = new OggCompressionCodec()

        buffer = BitrateReader.read(filename, sourceCodec)
        result = BitrateReader.convert(buffer, destinationCodec)
        result = (new AudioMixer()).fix(result)
        return new File(result)
    }
}

// Código cliente
class Application {
    method main() {
        converter = new VideoConverter()
        mp4 = converter.convert("funny-cats-video.ogg", "mp4")
        mp4.save()
    }
}
```

---

#### 🎯 **Aplicabilidad**

- **Reducir la complejidad** al proporcionar una interfaz simple para un subsistema complejo.
- **Aislar el código cliente** de dependencias externas, facilitando el mantenimiento y la evolución del sistema.
- **Estructurar sistemas en capas**, usando fachadas como puntos de entrada para cada capa.

---

#### ⚙️ **Cómo implementarlo**

1. **Identificar la complejidad** del subsistema que debe simplificarse.
2. Definir una **interfaz fachada** que encapsule las operaciones más comunes.
3. La fachada debe **delegar** las solicitudes en los objetos adecuados del subsistema.
4. (Opcional) Si es necesario, crear múltiples fachadas para diferentes partes del subsistema.

---

#### ✅ **Pros y ❌ Contras**

**Pros:**

- **Aislamiento de la complejidad:** El cliente no necesita conocer los detalles internos del subsistema.
- **Facilita el mantenimiento:** Los cambios en el subsistema afectan solo a la fachada, no al cliente.
- Mejora la **legibilidad y simplicidad** del código.

**Contras:**

- Riesgo de crear una **"clase todopoderosa"** si la fachada crece demasiado.
- Puede convertirse en un **punto único de falla** si no se gestiona adecuadamente.

---

#### 🔗 **Relaciones con otros patrones**

- **Adapter:** Transforma la interfaz de una clase existente; Facade simplifica el acceso a un subsistema completo.
- **Abstract Factory:** Puede ocultar la creación de objetos complejos detrás de una fachada.
- **Mediator:** Ambos gestionan la comunicación entre objetos, pero Mediator centraliza la lógica de interacción, mientras que Facade simplifica la interfaz sin alterar el
  subsistema.
- **Singleton:** La fachada puede implementarse como un Singleton si se necesita una única instancia en toda la aplicación.
- **Proxy:** Similar en estructura, pero Proxy controla el acceso a un objeto específico, mientras que Facade oculta la complejidad de un subsistema completo.

---

Ahora continuaré con el procesamiento de los patrones **Flyweight** y **Proxy**. 🚀



---

### **Patrón de Diseño: Flyweight**

#### 📌 **Propósito**

El patrón de diseño **Flyweight** es un patrón estructural que permite mantener más objetos en la memoria compartiendo partes comunes del estado entre varios objetos en lugar de
duplicar dicha información en cada uno.

---

#### 🚩 **Problema**

- **Uso excesivo de memoria RAM:**  
  En aplicaciones donde se necesita crear una gran cantidad de objetos similares (como partículas en un videojuego), el uso de memoria puede crecer de manera insostenible.
- **Redundancia de datos:**  
  Los objetos comparten atributos idénticos (como color o textura), pero almacenan esta información de forma redundante, lo que provoca un desperdicio de recursos.

---

#### 💡 **Solución**

El patrón Flyweight propone:

- **Separar el estado en dos partes:**
- **Estado intrínseco:** Datos invariables que pueden compartirse entre objetos (como color o textura).
- **Estado extrínseco:** Datos únicos de cada instancia (como posición o velocidad), que se pasan como parámetros cuando es necesario.
- Reutilizar objetos compartidos para reducir la carga en la memoria.

---

#### 🗂️ **Estructura**

1. **Flyweight:** Clase que contiene el estado intrínseco compartido.
2. **Contexto:** Almacena el estado extrínseco y mantiene una referencia al Flyweight correspondiente.
3. **Fábrica de Flyweights:** Gestiona la creación y reutilización de instancias Flyweight.
4. **Cliente:** Interactúa con los Flyweights y administra el estado extrínseco.

---

#### 📝 **Pseudocódigo**

```pseudocode
// Clase Flyweight (estado compartido)
class TreeType {
    field name
    field color
    field texture

    constructor(name, color, texture)
    method draw(canvas, x, y)
}

// Fábrica de Flyweights
class TreeFactory {
    static field treeTypes: collection

    static method getTreeType(name, color, texture):
        if (treeTypes.contains(name, color, texture)):
            return treeTypes.get(name, color, texture)
        else:
            type = new TreeType(name, color, texture)
            treeTypes.add(type)
            return type
}

// Contexto (estado único)
class Tree {
    field x, y
    field type: TreeType

    constructor(x, y, type)
    method draw(canvas):
        type.draw(canvas, x, y)
}

// Cliente
class Forest {
    field trees: collection of Tree

    method plantTree(x, y, name, color, texture):
        type = TreeFactory.getTreeType(name, color, texture)
        tree = new Tree(x, y, type)
        trees.add(tree)

    method draw(canvas):
        for (tree in trees):
            tree.draw(canvas)
```

---

#### 🎯 **Aplicabilidad**

- **Cuando necesitas gestionar una gran cantidad de objetos similares** que consumirían demasiada memoria si cada uno mantuviera toda la información.
- **Sistemas gráficos complejos** (como videojuegos o editores de imágenes) donde se repiten elementos visuales.
- **Aplicaciones que manejan cachés o sistemas de almacenamiento temporal optimizados**.

---

#### ⚙️ **Cómo implementarlo**

1. Identificar el **estado intrínseco** que puede compartirse y el **estado extrínseco** que es específico de cada instancia.
2. Implementar una clase Flyweight para encapsular el estado intrínseco.
3. Crear una **fábrica de Flyweights** que gestione la creación y reutilización de objetos.
4. Asegurar que el cliente mantenga o calcule el estado extrínseco cuando sea necesario.

---

#### ✅ **Pros y ❌ Contras**

**Pros:**

- **Reducción significativa en el uso de memoria**, especialmente en sistemas con gran cantidad de objetos repetitivos.
- Mejora la **eficiencia del rendimiento** al minimizar la duplicación de datos.
- Cumple con el **principio de responsabilidad única**, separando la lógica de datos compartidos del estado específico.

**Contras:**

- **Complejidad añadida** en la implementación, especialmente al gestionar el estado extrínseco.
- **Mayor consumo de CPU** en algunos casos, debido a la necesidad de calcular o pasar datos del contexto con frecuencia.
- Puede dificultar el **mantenimiento y la legibilidad** del código si no se documenta adecuadamente.

---

#### 🔗 **Relaciones con otros patrones**

- **Composite:** Los nodos de hoja compartidos pueden implementarse como Flyweights para optimizar el uso de memoria.
- **Facade:** Mientras que Facade simplifica el acceso a un sistema complejo, Flyweight optimiza el almacenamiento de datos repetidos.
- **Singleton:** Flyweight puede parecerse a Singleton si existe un único objeto compartido, pero Flyweight permite múltiples instancias con diferentes estados intrínsecos.

---

Ahora procederé con el análisis del patrón **Proxy**. 🚀


---

### **Patrón de Diseño: Proxy**

#### 📌 **Propósito**

El patrón de diseño **Proxy** es un patrón estructural que proporciona un **sustituto o marcador de posición** para otro objeto. Un proxy **controla el acceso** al objeto original,
permitiendo realizar operaciones adicionales antes o después de que la solicitud llegue al objeto real.

---

#### 🚩 **Problema**

- **Gestión de recursos costosos:**  
  Imagina un objeto que consume muchos recursos del sistema, como una base de datos o un archivo grande. No siempre es necesario cargarlo en memoria, pero cuando se requiere, ya es
  demasiado tarde para optimizar el acceso.

- **Restricciones de acceso:**  
  A veces, es necesario **proteger** el acceso a ciertos objetos críticos del sistema, como funciones sensibles de seguridad.

- **Problemas de latencia en redes:**  
  Acceder a recursos remotos introduce latencias, y el cliente no debería lidiar con la complejidad de las comunicaciones en red.

---

#### 💡 **Solución**

El patrón Proxy sugiere:

- Crear una **clase proxy** con la misma interfaz que el objeto original.
- El proxy **controla el acceso** al objeto real y puede:
- **Retrasar su creación** hasta que sea necesario (*proxy virtual*).
- **Verificar permisos de acceso** antes de permitir operaciones (*proxy de protección*).
- **Registrar solicitudes o resultados en caché** para optimizar el rendimiento (*proxy de registro* o *proxy de caché*).
- El **cliente** interactúa con el proxy como si fuera el objeto real, sin darse cuenta de la diferencia.

---

#### 🗂️ **Estructura**

1. **Interfaz de Servicio:** Define la interfaz común tanto para el objeto real como para el proxy.
2. **Objeto Real (Servicio):** Contiene la lógica principal que puede ser costosa en términos de rendimiento.
3. **Proxy:** Implementa la misma interfaz que el objeto real, controlando el acceso a este último.
4. **Cliente:** Interactúa con el proxy o el objeto real de forma transparente.

---

#### 📝 **Pseudocódigo**

```pseudocode
// Interfaz del servicio
interface VideoService {
    method listVideos()
    method getVideoInfo(id)
    method downloadVideo(id)
}

// Servicio real (costoso en recursos)
class YouTubeService implements VideoService {
    method listVideos() {
        // Solicitud a la API de YouTube
    }
    method getVideoInfo(id) {
        // Obtiene información del video
    }
    method downloadVideo(id) {
        // Descarga el video
    }
}

// Proxy que controla el acceso al servicio real
class CachedYouTubeProxy implements VideoService {
    private realService: YouTubeService
    private cache

    constructor(realService) {
        this.realService = realService
        this.cache = {}
    }

    method listVideos() {
        if cache.list is empty:
            cache.list = realService.listVideos()
        return cache.list
    }

    method getVideoInfo(id) {
        if id not in cache:
            cache[id] = realService.getVideoInfo(id)
        return cache[id]
    }

    method downloadVideo(id) {
        if not existsLocally(id):
            realService.downloadVideo(id)
        else:
            return "Video descargado previamente"
    }
}

// Cliente
app = new CachedYouTubeProxy(new YouTubeService())
app.listVideos()
app.getVideoInfo("video123")
app.downloadVideo("video123")
```

---

#### 🎯 **Aplicabilidad**

- **Inicialización diferida (Proxy Virtual):** Para crear objetos pesados solo cuando sean necesarios.
- **Control de acceso (Proxy de Protección):** Para restringir el acceso a ciertos recursos basándose en permisos.
- **Optimización de recursos remotos (Proxy Remoto):** Para manejar la comunicación con servicios distribuidos.
- **Caché de resultados (Proxy de Caché):** Para mejorar el rendimiento almacenando resultados de solicitudes repetidas.
- **Registro de solicitudes (Proxy de Registro):** Para auditar o rastrear interacciones con el sistema.

---

#### ⚙️ **Cómo implementarlo**

1. **Definir una interfaz común** para el servicio real y el proxy.
2. Implementar el **servicio real** que realiza las operaciones costosas o críticas.
3. Crear una clase **proxy** que almacene una referencia al servicio real.
4. En el proxy, implementar la lógica para **controlar el acceso**, realizar caché, verificar permisos o gestionar la inicialización diferida.
5. El **cliente** debe trabajar con el proxy de la misma forma que lo haría con el objeto real.

---

#### ✅ **Pros y ❌ Contras**

**Pros:**

- **Control de acceso:** Permite proteger recursos sensibles.
- **Mejor uso de recursos:** Reduce el consumo de memoria o el uso de la red.
- **Mejor rendimiento:** Implementación de caché para operaciones costosas.
- **Transparencia para el cliente:** El cliente no nota la diferencia entre el proxy y el objeto real.

**Contras:**

- **Mayor complejidad:** Añade más clases al sistema.
- **Riesgo de sobrecarga:** Puede ralentizar el sistema si la lógica del proxy no está optimizada.
- **Dificultad de depuración:** Puede complicar el seguimiento de errores debido a la capa adicional.

---

#### 🔗 **Relaciones con otros patrones**

- **Adapter:** Cambia la interfaz de un objeto, mientras que Proxy controla el acceso manteniendo la misma interfaz.
- **Decorator:** Añade funcionalidades adicionales dinámicamente; Proxy controla el acceso y puede realizar tareas antes o después de delegar.
- **Facade:** Simplifica el acceso a un sistema complejo, pero Proxy actúa como intermediario para controlar el acceso directamente al objeto.
- **Singleton:** El proxy puede gestionar instancias únicas de objetos complejos.

---



#patrones de comportamiento



---

### **Patrón de Diseño: Chain of Responsibility**

#### 📌 **Propósito**

El patrón de diseño **Chain of Responsibility** es un patrón de comportamiento que permite pasar solicitudes a lo largo de una cadena de manejadores. Cada manejador decide si
procesa la solicitud o la pasa al siguiente en la cadena.

---

#### 🚩 **Problema**

En sistemas complejos, como aplicaciones de gestión de pedidos:

- **Control de acceso:** Verificar si el usuario está autenticado antes de permitir acciones.
- **Validación de datos:** Evitar el procesamiento de datos no sanitizados.
- **Prevención de ataques:** Bloquear intentos de acceso malintencionados, como ataques de fuerza bruta.

El manejo secuencial de estas comprobaciones puede generar un código desordenado y difícil de mantener.

---

#### 💡 **Solución**

- **Dividir las responsabilidades en manejadores independientes**, cada uno con su lógica de procesamiento.
- **Encadenar los manejadores**, de modo que una solicitud pase de uno a otro hasta que sea procesada o la cadena finalice.
- Un manejador puede **detener la propagación** de la solicitud si considera que ya ha sido atendida.

---

#### 🗂️ **Estructura**

1. **Manejador (Handler):** Interfaz común para todos los manejadores, define el método para procesar solicitudes.
2. **Manejador Base:** Opcional. Implementa la lógica básica de reenvío de solicitudes al siguiente manejador.
3. **Manejadores Concretos:** Implementan la lógica específica de cada paso en la cadena.
4. **Cliente:** Inicia la solicitud y la envía a la cadena de manejadores.

---

#### 📝 **Pseudocódigo**

```pseudocode
// Interfaz del Manejador
interface Handler {
    method setNext(handler: Handler): Handler
    method handle(request: Request)
}

// Clase Base del Manejador
abstract class AbstractHandler implements Handler {
    private nextHandler: Handler

    method setNext(handler: Handler): Handler {
        this.nextHandler = handler
        return handler
    }

    method handle(request: Request) {
        if (this.nextHandler) {
            return this.nextHandler.handle(request)
        }
        return null
    }
}

// Manejadores Concretos
class AuthHandler extends AbstractHandler {
    method handle(request: Request) {
        if (request.isAuthenticated()) {
            return super.handle(request)
        }
        return "Acceso denegado"
    }
}

class ValidationHandler extends AbstractHandler {
    method handle(request: Request) {
        if (request.isValid()) {
            return super.handle(request)
        }
        return "Datos inválidos"
    }
}

class BusinessLogicHandler extends AbstractHandler {
    method handle(request: Request) {
        return "Procesamiento completado"
    }
}

// Configuración de la cadena
auth = new AuthHandler()
validation = new ValidationHandler()
businessLogic = new BusinessLogicHandler()

auth.setNext(validation).setNext(businessLogic)

// Ejecución
result = auth.handle(request)
```

---

#### 🎯 **Aplicabilidad**

- Cuando necesitas que **diferentes objetos manejen una solicitud**, sin que el emisor conozca cuál lo hará.
- Para **desacoplar el emisor de la solicitud de sus receptores**.
- En escenarios donde **el orden de procesamiento de solicitudes es importante** y puede cambiar dinámicamente.

---

#### ⚙️ **Cómo implementarlo**

1. Define una **interfaz común** para todos los manejadores.
2. Implementa una clase base que gestione la **referencia al siguiente manejador**.
3. Crea manejadores concretos para diferentes tipos de solicitudes.
4. **Encadena** los manejadores estableciendo el siguiente en la secuencia.
5. El cliente inicia la solicitud enviándola al primer manejador de la cadena.

---

#### ✅ **Pros y ❌ Contras**

**Pros:**

- **Desacopla** el emisor de la solicitud de los manejadores.
- **Facilita la adición de nuevos manejadores** sin modificar el código existente.
- **Flexibilidad** para reordenar manejadores dinámicamente.

**Contras:**

- **Dificultad para rastrear el flujo** de la solicitud en cadenas largas.
- **Algunas solicitudes pueden no ser procesadas** si ningún manejador las acepta.

---

#### 🔗 **Relaciones con otros patrones**

- **Command:** Ambos permiten encapsular solicitudes, pero Chain of Responsibility permite que varios objetos puedan manejarlas.
- **Mediator:** Centraliza la comunicación entre objetos, mientras que Chain of Responsibility distribuye la responsabilidad en una cadena.
- **Observer:** Permite que múltiples observadores reaccionen a eventos, mientras que Chain of Responsibility procesa solicitudes de forma secuencial.
- **Decorator:** Estructuralmente similar, pero Decorator añade comportamiento, mientras que Chain of Responsibility decide si procesa o pasa la solicitud.

---





---

### **Patrón de Diseño: Command**

#### 📌 **Propósito**

El patrón de diseño **Command** convierte una solicitud en un **objeto independiente** que contiene toda la información sobre la solicitud. Esto permite:

- **Parametrizar** métodos con diferentes solicitudes.
- **Poner en cola** o **programar** la ejecución de solicitudes.
- Soportar operaciones que se puedan **deshacer o rehacer**.

---

#### 🚩 **Problema**

Imagina que desarrollas una aplicación de edición de texto con múltiples botones que realizan diferentes operaciones:

- Crear una subclase para cada botón resulta en una **proliferación de clases** difíciles de mantener.
- Duplicar el código para operaciones comunes (como copiar/pegar) provoca **inconsistencias** y errores.

El acoplamiento directo entre la **interfaz gráfica (GUI)** y la **lógica de negocio** hace que cualquier cambio sea costoso.

---

#### 💡 **Solución**

El patrón Command propone:

- Extraer los detalles de la solicitud en una **clase de comando** independiente.
- La **interfaz gráfica** se limita a invocar el comando, sin saber cómo se implementa internamente.
- Los comandos permiten **desacoplar** el emisor de la solicitud (botón, menú, atajo de teclado) del receptor (lógica de negocio).

---

#### 🗂️ **Estructura**

1. **Emisor (Invoker):** Inicializa la solicitud y mantiene una referencia al comando.
2. **Comando:** Interfaz común que define un método `execute()`.
3. **Comandos Concretos:** Implementan la lógica de operaciones específicas y delegan en el **Receptor**.
4. **Receptor:** Contiene la lógica de negocio real.
5. **Cliente:** Configura los comandos, receptores y emisores.

---

#### 📝 **Pseudocódigo**

```pseudocode
// Interfaz Comando
interface Command {
    method execute()
    method undo() // Opcional para soporte de deshacer
}

// Comandos concretos
class CopyCommand implements Command {
    method execute() {
        app.clipboard = editor.getSelection()
    }
}

class PasteCommand implements Command {
    method execute() {
        editor.insert(app.clipboard)
    }
}

// Receptor
class Editor {
    method getSelection() { ... }
    method insert(text) { ... }
}

// Emisor
class Button {
    private command: Command

    constructor(command: Command) {
        this.command = command
    }

    method click() {
        command.execute()
    }
}

// Cliente
editor = new Editor()
copyCommand = new CopyCommand(editor)
pasteCommand = new PasteCommand(editor)

copyButton = new Button(copyCommand)
pasteButton = new Button(pasteCommand)

copyButton.click()
pasteButton.click()
```

---

#### 🎯 **Aplicabilidad**

- **Parametrizar objetos con operaciones:** Ideal para menús contextuales y botones configurables.
- **Soporte de operaciones deshacer/rehacer:** Historial de comandos para revertir acciones.
- **Ejecución diferida o en cola:** Útil en aplicaciones con tareas programadas.
- **Operaciones remotas:** Comandos que se envían a través de la red para su ejecución en otro entorno.

---

#### ⚙️ **Cómo implementarlo**

1. Define una **interfaz de comando** con un método `execute()`.
2. Implementa **comandos concretos** para cada operación, encapsulando la lógica de la solicitud.
3. Identifica los **emisores** (botones, menús) y asigna comandos.
4. Configura el **cliente** para asociar comandos, emisores y receptores.

---

#### ✅ **Pros y ❌ Contras**

**Pros:**

- **Principio de responsabilidad única:** Desacopla la lógica de invocación y ejecución.
- **Principio de abierto/cerrado:** Agrega nuevos comandos sin modificar el código existente.
- Permite **operaciones deshacer/rehacer** y ejecución diferida.
- Facilita la **composición de comandos complejos** a partir de otros más simples.

**Contras:**

- Añade **complejidad** debido a la introducción de múltiples clases adicionales.
- Puede generar **sobrecarga** en aplicaciones simples.

---

#### 🔗 **Relaciones con otros patrones**

- **Chain of Responsibility:** Ambos permiten encadenar solicitudes, pero Command es más directo en la ejecución de operaciones.
- **Mediator:** Centraliza la comunicación entre objetos, mientras que Command encapsula solicitudes individuales.
- **Observer:** Reactivo frente a eventos, mientras que Command ejecuta acciones explícitas.
- **Memento:** Se puede combinar con Command para implementar operaciones deshacer/rehacer.
- **Strategy:** Ambos encapsulan comportamiento, pero Strategy define algoritmos y Command operaciones.

---





---

### **Patrón de Diseño: Iterator**

#### 📌 **Propósito**

El patrón de diseño **Iterator** es un patrón de comportamiento que permite **recorrer elementos de una colección** sin exponer su estructura interna (como listas, pilas, árboles,
etc.).

---

#### 🚩 **Problema**

- **Estructuras de datos complejas:** Las colecciones pueden estar basadas en listas, pilas, árboles, grafos, etc., y cada una requiere un enfoque diferente para recorrer sus
  elementos.
- **Acoplamiento innecesario:** El código cliente puede acoplarse a la lógica interna de la colección si no existe un mecanismo uniforme para iterar sobre los elementos.
- **Multiplicidad de algoritmos:** Un solo tipo de recorrido (por ejemplo, en profundidad o en anchura) puede no ser suficiente para todas las necesidades.

---

#### 💡 **Solución**

El patrón Iterator propone:

- **Extraer la lógica de recorrido** de la colección y colocarla en un objeto independiente llamado *iterador*.
- **Encapsular detalles de iteración**, como la posición actual y el método de recorrido, permitiendo que varios iteradores operen sobre la misma colección de forma independiente.

---

#### 🗂️ **Estructura**

1. **Iterador (Iterator):** Declara operaciones para recorrer la colección (por ejemplo, `next()`, `hasNext()`).
2. **Iterador Concreto:** Implementa el algoritmo específico de recorrido.
3. **Colección (Aggregate):** Declara un método para crear iteradores.
4. **Colección Concreta:** Implementa el método para devolver una instancia del iterador concreto.
5. **Cliente:** Interactúa con la colección a través del iterador, sin preocuparse por su estructura interna.

---

#### 📝 **Pseudocódigo**

```pseudocode
// Interfaz de iterador
interface Iterator {
    method hasNext(): boolean
    method next(): Object
}

// Iterador concreto
class ConcreteIterator implements Iterator {
    private collection: Collection
    private index: int = 0

    method hasNext() {
        return index < collection.size()
    }

    method next() {
        return collection.get(index++)
    }
}

// Interfaz de colección
interface Collection {
    method createIterator(): Iterator
}

// Colección concreta
class ConcreteCollection implements Collection {
    private items: List

    method createIterator() {
        return new ConcreteIterator(this)
    }
}

// Cliente
collection = new ConcreteCollection()
iterator = collection.createIterator()

while (iterator.hasNext()) {
    item = iterator.next()
    print(item)
}
```

---

#### 🎯 **Aplicabilidad**

- Cuando necesitas **recorrer diferentes estructuras de datos** sin exponer su implementación interna.
- Si deseas **simplificar la lógica de recorrido** en el código cliente.
- Para permitir **múltiples iteradores** trabajando sobre la misma colección simultáneamente.

---

#### ⚙️ **Cómo implementarlo**

1. Define una **interfaz de iterador** con métodos para recorrer la colección.
2. Implementa un **iterador concreto** que contenga la lógica de iteración específica.
3. Declara una **interfaz de colección** con un método para crear iteradores.
4. Implementa la **colección concreta** que devuelva instancias del iterador concreto.
5. Refactoriza el **código cliente** para utilizar iteradores en lugar de recorrer directamente las colecciones.

---

#### ✅ **Pros y ❌ Contras**

**Pros:**

- **Desacoplamiento:** El código cliente no necesita conocer la estructura interna de la colección.
- **Flexibilidad:** Permite agregar nuevos tipos de iteradores sin modificar las colecciones existentes.
- **Iteración paralela:** Varios iteradores pueden recorrer la misma colección de forma independiente.

**Contras:**

- Puede ser **excesivo para colecciones simples**.
- La iteración puede ser **menos eficiente** que un recorrido directo en colecciones especializadas.

---

#### 🔗 **Relaciones con otros patrones**

- **Composite:** Los iteradores se usan para recorrer estructuras de árbol implementadas con Composite.
- **Factory Method:** Puede crear iteradores personalizados para colecciones específicas.
- **Memento:** Puede capturar el estado actual de la iteración para reanudarla más tarde.
- **Visitor:** Facilita la ejecución de operaciones sobre una colección de objetos iterados sin acoplarse a sus clases.

---




---

### **Patrón de Diseño: Mediator**

#### 📌 **Propósito**

El patrón de diseño **Mediator** es un patrón de comportamiento que permite **reducir las dependencias caóticas entre objetos**. Restringe la comunicación directa entre los
objetos, forzándolos a interactuar únicamente a través de un **objeto mediador**, lo que mejora el acoplamiento y la mantenibilidad del sistema.

---

#### 🚩 **Problema**

- **Complejidad en las interacciones:**  
  Cuando múltiples objetos necesitan comunicarse entre sí, las dependencias cruzadas se vuelven difíciles de mantener.  
  Por ejemplo, en un formulario con varios controles de UI (como botones y campos de texto), el cambio en uno puede afectar a muchos otros, creando un sistema frágil y acoplado.

- **Dificultad para reutilizar componentes:**  
  Los componentes fuertemente acoplados no pueden reutilizarse fácilmente en otros contextos sin llevar consigo dependencias innecesarias.

---

#### 💡 **Solución**

- **Centralización de la comunicación:**  
  El patrón Mediator sugiere que **todos los objetos se comuniquen a través de un mediador común**, eliminando la necesidad de que los componentes estén directamente conectados
  entre sí.

- **Reducción del acoplamiento:**  
  Los componentes solo conocen al mediador, no a otros componentes. Esto facilita la **modificación y reutilización** de cada componente sin afectar a otros.

---

#### 🗂️ **Estructura**

1. **Mediador (Mediator):** Interfaz que define el método de comunicación entre los componentes.
2. **Mediador Concreto:** Implementa la lógica de coordinación entre los componentes.
3. **Componentes (Colleagues):** Objetos que envían notificaciones al mediador en lugar de comunicarse directamente.
4. **Cliente:** Configura la relación entre los componentes y el mediador.

---

#### 📝 **Pseudocódigo**

```pseudocode
// Interfaz Mediador
interface Mediator {
    method notify(sender: Component, event: string)
}

// Mediador Concreto
class AuthenticationDialog implements Mediator {
    private loginCheckbox: Checkbox
    private loginForm: LoginForm
    private registerForm: RegisterForm

    method notify(sender, event) {
        if (sender == loginCheckbox and event == "checked") {
            if (loginCheckbox.isChecked()) {
                loginForm.show()
                registerForm.hide()
            } else {
                loginForm.hide()
                registerForm.show()
            }
        }

        if (sender == loginForm and event == "submit") {
            if (loginForm.isValid()) {
                authenticateUser(loginForm.getData())
            }
        }
    }
}

// Componentes
class Component {
    protected mediator: Mediator

    constructor(mediator: Mediator) {
        this.mediator = mediator
    }

    method click() {
        mediator.notify(this, "click")
    }
}

class Button extends Component { }
class Checkbox extends Component {
    method check() {
        mediator.notify(this, "checked")
    }
}

// Configuración
mediator = new AuthenticationDialog()
loginCheckbox = new Checkbox(mediator)
loginForm = new LoginForm(mediator)
registerForm = new RegisterForm(mediator)
```

---

#### 🎯 **Aplicabilidad**

- **Reducir dependencias directas:** Ideal para sistemas donde múltiples componentes interactúan frecuentemente entre sí.
- **Facilitar la reutilización de componentes:** Los componentes se vuelven más genéricos y reutilizables al no depender de otros directamente.
- **Centralizar la lógica de control:** Permite mover la lógica de interacción de múltiples clases hacia un único punto de coordinación (el mediador).

---

#### ⚙️ **Cómo implementarlo**

1. **Identificar las clases acopladas** que requieren una comunicación más controlada.
2. Definir una **interfaz para el mediador** que especifique cómo deben comunicarse los componentes.
3. Crear un **mediador concreto** que implemente esta interfaz y gestione la lógica de interacción.
4. Modificar los **componentes existentes** para que interactúen solo a través del mediador, eliminando referencias directas entre ellos.
5. Configurar el sistema, conectando todos los componentes relevantes al mediador.

---

#### ✅ **Pros y ❌ Contras**

**Pros:**

- **Principio de responsabilidad única:** Centraliza la lógica de interacción entre componentes en un único lugar.
- **Desacoplamiento:** Los componentes no necesitan conocer los detalles de otros componentes.
- **Facilita el mantenimiento:** Cambios en la lógica de interacción solo afectan al mediador.

**Contras:**

- **Complejidad del mediador:** Con el tiempo, el mediador puede volverse demasiado grande y complejo (convirtiéndose en un *"God Object"*).
- **Sobrecarga de mantenimiento:** Si no se gestiona bien, el mediador puede volverse difícil de mantener debido a su crecimiento.

---

#### 🔗 **Relaciones con otros patrones**

- **Facade:** Mientras que Facade proporciona una interfaz simplificada para un subsistema, Mediator gestiona la comunicación entre varios objetos.
- **Observer:** Mediator organiza la comunicación de manera centralizada, mientras que Observer distribuye eventos a múltiples suscriptores.
- **Colleague:** En algunos contextos, los componentes gestionados por un mediador se denominan *"colegas"*, y están diseñados específicamente para depender del mediador en lugar
  de otros colegas.

---





---

### **Patrón de Diseño: Memento**

#### 📌 **Propósito**

El patrón de diseño **Memento** es un patrón de comportamiento que permite **guardar y restaurar el estado previo de un objeto** sin exponer los detalles de su implementación
interna.

---

#### 🚩 **Problema**

- **Necesidad de deshacer cambios:**  
  Imagina una aplicación de edición de texto que necesita una función para deshacer cambios. Guardar el estado completo del documento en cada cambio puede ser ineficiente si no se
  gestiona correctamente.

- **Violación del principio de encapsulamiento:**  
  Para almacenar el estado de un objeto, otros objetos deben acceder a sus atributos internos, lo que rompe la encapsulación.

---

#### 💡 **Solución**

- **Delegar la creación de instantáneas:**  
  El propio objeto (llamado *Originador*) es responsable de crear un objeto llamado **Memento**, que almacena su estado interno.

- **Control de acceso:**  
  Solo el *Originador* puede acceder directamente a los datos del *Memento*, mientras que otros objetos (como el *Cuidador*) pueden almacenar el *Memento* sin manipular su
  contenido.

---

#### 🗂️ **Estructura**

1. **Originador (Originator):**  
   Crea un *Memento* con su estado actual y puede restaurar su estado desde un *Memento*.

2. **Memento:**  
   Almacena el estado del *Originador*. Puede ser inmutable y accesible solo para el *Originador*.

3. **Cuidador (Caretaker):**  
   Guarda y gestiona los *Mementos*, sin modificarlos ni conocer su contenido interno.

4. **Cliente:**  
   Interactúa con el *Originador* y el *Cuidador* para guardar y restaurar estados.

---

#### 📝 **Pseudocódigo**

```pseudocode
// Originador que contiene el estado importante
class Editor {
    private text, curX, curY, selectionWidth

    method setText(text) { this.text = text }
    method setCursor(x, y) { this.curX = x; this.curY = y }
    method setSelectionWidth(width) { this.selectionWidth = width }

    // Crea un memento con el estado actual
    method createSnapshot(): Snapshot {
        return new Snapshot(this, text, curX, curY, selectionWidth)
    }
}

// Memento que almacena el estado del Editor
class Snapshot {
    private editor: Editor
    private text, curX, curY, selectionWidth

    constructor Snapshot(editor, text, curX, curY, selectionWidth) {
        this.editor = editor
        this.text = text
        this.curX = curX
        this.curY = curY
        this.selectionWidth = selectionWidth
    }

    // Restaura el estado en el Editor
    method restore() {
        editor.setText(text)
        editor.setCursor(curX, curY)
        editor.setSelectionWidth(selectionWidth)
    }
}

// Cuidador que administra el historial de mementos
class Command {
    private backup: Snapshot

    method makeBackup() {
        backup = editor.createSnapshot()
    }

    method undo() {
        if (backup != null)
            backup.restore()
    }
}
```

---

#### 🎯 **Aplicabilidad**

- **Deshacer/Rehacer operaciones:** Ideal para editores de texto, aplicaciones gráficas o sistemas de bases de datos.
- **Recuperación ante fallos:** Permite restaurar un sistema a un estado anterior tras un error.
- **Transacciones:** Facilita la implementación de sistemas que requieren rollback en operaciones fallidas.

---

#### ⚙️ **Cómo implementarlo**

1. **Identificar el estado que debe guardarse** y encapsularlo en una clase *Memento*.
2. Implementar el *Originador* para que pueda crear y restaurar su estado desde un *Memento*.
3. Definir un *Cuidador* que almacene los *Mementos* y gestione el historial de cambios.
4. Opcionalmente, añadir una interfaz para restringir el acceso directo al contenido del *Memento*.

---

#### ✅ **Pros y ❌ Contras**

**Pros:**

- **No viola la encapsulación:** El estado se guarda sin exponer los detalles internos del objeto.
- **Soporta operaciones deshacer/rehacer** de forma sencilla.
- **Facilita el mantenimiento** de la lógica del historial de estados.

**Contras:**

- **Consumo de memoria:** Puede ser costoso en aplicaciones con estados complejos o numerosos *Mementos*.
- **Complejidad en la gestión del historial:** Requiere una cuidadosa gestión para evitar pérdidas de memoria.
- **Difícil de implementar en lenguajes dinámicos:** Algunas características de encapsulamiento no se garantizan en todos los lenguajes.

---

#### 🔗 **Relaciones con otros patrones**

- **Command:** Se puede combinar con *Memento* para implementar operaciones de deshacer/rehacer, donde *Command* ejecuta operaciones y *Memento* almacena el estado previo.
- **Iterator:** Puede usarse para capturar el estado actual de una iteración y reanudarla posteriormente.
- **Prototype:** En algunos casos, puede usarse como una alternativa más simple al *Memento* si el objeto es fácil de clonar.

---





---

### **Patrón de Diseño: Observer**

#### 📌 **Propósito**

El patrón de diseño **Observer** es un patrón de comportamiento que permite definir un **mecanismo de suscripción** para notificar a varios objetos sobre cualquier evento que
ocurra en el objeto que están observando.

---

#### 🚩 **Problema**

- **Verificación constante:**  
  Imagina que un cliente está interesado en un nuevo producto de una tienda. Visitar la tienda todos los días para verificar la disponibilidad sería ineficiente.

- **Notificaciones innecesarias:**  
  La tienda podría enviar notificaciones a todos los clientes, pero esto resultaría en spam para aquellos que no están interesados.

- **Acoplamiento entre objetos:**  
  Sin un patrón adecuado, los objetos que necesitan ser notificados deben estar fuertemente acoplados, lo que hace que el código sea difícil de mantener.

---

#### 💡 **Solución**

- **Definir un "Notificador" y "Suscriptores":**  
  El objeto que emite eventos se llama **notificador** (o publicador), y los objetos interesados en esos eventos se llaman **suscriptores**.

- **Mecanismo de suscripción:**
- El notificador mantiene una lista de suscriptores.
- Los suscriptores pueden **suscribirse o cancelar la suscripción** en cualquier momento.
- Cuando ocurre un evento, el notificador recorre la lista y notifica a cada suscriptor mediante un método específico.

---

#### 🗂️ **Estructura**

1. **Notificador:**

- Emite eventos y mantiene la lista de suscriptores.
- Tiene métodos para **agregar, eliminar y notificar** suscriptores.

2. **Suscriptor:**

- Implementa una interfaz común que define el método `actualizar()` para recibir notificaciones.

3. **Cliente:**

- Configura la relación entre notificadores y suscriptores.

---

#### 📝 **Pseudocódigo**

```pseudocode
// Interfaz del suscriptor
interface EventListener {
    method update(data)
}

// Notificador (gestor de eventos)
class EventManager {
    private listeners: hash map of event types and listeners

    method subscribe(eventType, listener) {
        listeners.add(eventType, listener)
    }

    method unsubscribe(eventType, listener) {
        listeners.remove(eventType, listener)
    }

    method notify(eventType, data) {
        for (listener in listeners[eventType]) {
            listener.update(data)
        }
    }
}

// Editor (que genera eventos)
class Editor {
    public events: EventManager
    private file: File

    method openFile(path) {
        this.file = new File(path)
        events.notify("open", file.name)
    }

    method saveFile() {
        file.write()
        events.notify("save", file.name)
    }
}

// Suscriptores concretos
class LoggingListener implements EventListener {
    private log: File

    constructor(logPath) {
        this.log = new File(logPath)
    }

    method update(filename) {
        log.write("El archivo fue abierto: " + filename)
    }
}

class EmailAlertsListener implements EventListener {
    private email: String

    constructor(email) {
        this.email = email
    }

    method update(filename) {
        sendEmail(email, "El archivo fue guardado: " + filename)
    }
}

// Configuración del cliente
editor = new Editor()
logger = new LoggingListener("/path/to/log.txt")
emailAlerts = new EmailAlertsListener("admin@example.com")

editor.events.subscribe("open", logger)
editor.events.subscribe("save", emailAlerts)
```

---

#### 🎯 **Aplicabilidad**

- **Cuando un cambio en un objeto requiere notificar a otros:**  
  Ideal para interfaces de usuario, sistemas de eventos, o monitoreo de estados.

- **Relaciones dinámicas entre objetos:**  
  Permite agregar o eliminar suscriptores en tiempo de ejecución.

- **Arquitecturas basadas en eventos:**  
  Se utiliza ampliamente en sistemas de publicación-suscripción y aplicaciones reactivas.

---

#### ⚙️ **Cómo implementarlo**

1. **Identificar el notificador:**  
   Determina qué clase genera eventos importantes.

2. **Definir la interfaz del suscriptor:**  
   Generalmente consiste en un método `actualizar()` que recibe los datos relevantes del evento.

3. **Implementar el mecanismo de suscripción:**

- Métodos para agregar y eliminar suscriptores.
- Lógica para notificar a los suscriptores cuando ocurre un evento.

4. **Registrar los suscriptores:**  
   El cliente se encarga de suscribir los objetos interesados a los eventos del notificador.

---

#### ✅ **Pros y ❌ Contras**

**Pros:**

- **Principio de abierto/cerrado:**  
  Puedes agregar nuevos suscriptores sin modificar el notificador.

- **Bajo acoplamiento:**  
  El notificador no necesita conocer detalles de los suscriptores.

- **Flexibilidad:**  
  Los suscriptores pueden agregarse o eliminarse dinámicamente en tiempo de ejecución.

**Contras:**

- **Dificultad para depurar:**  
  Es complicado rastrear el flujo de notificaciones en sistemas complejos.

- **Rendimiento:**  
  Si hay muchos suscriptores, puede haber un impacto en el rendimiento debido a la cantidad de notificaciones enviadas.

- **Orden de notificación no garantizado:**  
  Los suscriptores se notifican en un orden que puede ser impredecible.

---

#### 🔗 **Relaciones con otros patrones**

- **Mediator:**  
  Mientras que Observer permite la suscripción directa a eventos, Mediator centraliza la comunicación entre objetos.

- **Chain of Responsibility:**  
  Ambos patrones permiten que múltiples objetos reaccionen a eventos, pero Observer lo hace de forma simultánea, mientras que Chain of Responsibility pasa la solicitud de uno en
  uno.

- **Command:**  
  Se puede combinar con Observer para ejecutar comandos en respuesta a eventos.

- **Strategy:**  
  Los suscriptores pueden actuar como estrategias que se activan en función de eventos específicos.

---




---

### **Patrón de Diseño: State**

#### 📌 **Propósito**

El patrón de diseño **State** es un patrón de comportamiento que permite a un objeto **alterar su comportamiento cuando su estado interno cambia**. Esto da la impresión de que el
objeto cambia de clase dinámicamente.

---

#### 🚩 **Problema**

- **Máquina de estados finitos:**  
  Un programa puede encontrarse en un número finito de estados, donde cada estado determina un comportamiento específico. Cambiar entre estos estados puede resultar en un código
  lleno de condicionales complicados (`if` o `switch`).

- **Código difícil de mantener:**  
  Cuando se añaden nuevos estados o transiciones, se deben modificar múltiples condicionales en todo el código, lo que aumenta la posibilidad de errores y dificulta el
  mantenimiento.

---

#### 💡 **Solución**

- **Separación de responsabilidades:**  
  Se crean clases individuales para representar cada estado posible. El objeto principal, conocido como **Contexto**, mantiene una referencia a un objeto de estado y delega en él
  el comportamiento relacionado con ese estado.

- **Transición entre estados:**  
  El contexto cambia su estado interno reemplazando el objeto de estado actual por otro, permitiendo que el comportamiento cambie de forma dinámica sin necesidad de condicionales
  complejos.

---

#### 🗂️ **Estructura**

1. **Contexto (Context):**

- Mantiene una referencia al estado actual.
- Delegar operaciones al estado actual.
- Permite cambiar el estado dinámicamente.

2. **Estado (State - Interfaz):**

- Define la interfaz común para todos los estados concretos.

3. **Estados Concretos (Concrete States):**

- Implementan comportamientos específicos para el contexto en función del estado actual.
- Pueden cambiar el estado del contexto si es necesario.

---

#### 📝 **Pseudocódigo**

```pseudocode
// Interfaz de Estado
interface State {
    method handle()
}

// Estados concretos
class ReadyState implements State {
    method handle() {
        print("Reproductor en modo preparado.")
    }
}

class PlayingState implements State {
    method handle() {
        print("Reproduciendo música.")
    }
}

class PausedState implements State {
    method handle() {
        print("Reproducción en pausa.")
    }
}

// Contexto
class AudioPlayer {
    private state: State

    constructor() {
        this.state = new ReadyState() // Estado inicial
    }

    method changeState(state: State) {
        this.state = state
    }

    method pressButton() {
        this.state.handle()
    }
}

// Ejecución
player = new AudioPlayer()
player.pressButton()            // "Reproductor en modo preparado."

player.changeState(new PlayingState())
player.pressButton()            // "Reproduciendo música."

player.changeState(new PausedState())
player.pressButton()            // "Reproducción en pausa."
```

---

#### 🎯 **Aplicabilidad**

- Cuando un objeto necesita **cambiar su comportamiento en función de su estado interno**.
- Para eliminar grandes bloques de código condicional (`if` o `switch`) que dependen de valores de estado.
- Cuando la **lógica de estado evoluciona con el tiempo**, y se requiere agregar fácilmente nuevos estados o transiciones.

---

#### ⚙️ **Cómo implementarlo**

1. **Identificar el contexto:**  
   La clase que contiene comportamientos dependientes del estado.

2. **Definir la interfaz de estado:**  
   Describe las operaciones comunes que deben implementar todos los estados.

3. **Crear clases para cada estado concreto:**  
   Implementan comportamientos específicos y pueden gestionar la transición de estado.

4. **Delegar comportamientos al estado actual:**  
   El contexto delega el comportamiento a la instancia de estado activo.

5. **Gestionar transiciones de estado:**  
   Los estados concretos o el contexto pueden cambiar el estado actual dinámicamente.

---

#### ✅ **Pros y ❌ Contras**

**Pros:**

- **Principio de responsabilidad única:** Organiza el código dependiente del estado en clases separadas.
- **Principio de abierto/cerrado:** Permite agregar nuevos estados sin modificar el contexto ni otros estados existentes.
- **Facilita el mantenimiento:** Elimina condicionales complejos y mejora la legibilidad del código.

**Contras:**

- **Complejidad adicional:** Puede ser excesivo para sistemas simples con pocos estados.
- **Sobrecarga de clases:** Requiere crear múltiples clases, lo que puede resultar innecesario en casos simples.

---

#### 🔗 **Relaciones con otros patrones**

- **Strategy:** La estructura es similar, pero mientras *Strategy* permite la selección dinámica de algoritmos, *State* gestiona la transición entre estados.
- **Bridge:** Ambos patrones usan la composición para delegar comportamientos, pero *Bridge* separa la abstracción de la implementación.
- **Memento:** Puede trabajar junto con *State* para guardar y restaurar estados previos.
- **Observer:** A veces se usa junto con *State* para notificar a otros objetos cuando ocurre un cambio de estado.

---




---

### **Patrón de Diseño: Strategy**

#### 📌 **Propósito**

El patrón de diseño **Strategy** es un patrón de comportamiento que permite **definir una familia de algoritmos**, encapsular cada uno de ellos en clases separadas, y hacer que
estos algoritmos sean **intercambiables** dentro de un mismo contexto.

---

#### 🚩 **Problema**

- **Dificultad para mantener algoritmos en crecimiento:**  
  En una aplicación de navegación, inicialmente solo se planea una ruta para coches. Con el tiempo, se añaden rutas para peatones, ciclistas y transporte público, lo que hace que
  la clase principal crezca de forma incontrolable.

- **Código rígido y poco flexible:**  
  Cada vez que se necesita agregar o modificar un algoritmo, se debe alterar la clase principal, lo que provoca errores y conflictos, especialmente en equipos de trabajo.

---

#### 💡 **Solución**

- **Encapsular algoritmos en clases separadas:**  
  Se extraen los diferentes algoritmos en clases individuales llamadas **estrategias**.

- **Delegación al contexto:**  
  La clase principal, conocida como **Contexto**, contiene una referencia a una estrategia y delega la ejecución del algoritmo a dicha estrategia.

- **Intercambiabilidad:**  
  Las estrategias se pueden cambiar dinámicamente en tiempo de ejecución sin afectar al contexto ni a otras estrategias.

---

#### 🗂️ **Estructura**

1. **Contexto:**  
   Mantiene una referencia a una de las estrategias concretas y utiliza su interfaz para ejecutar el algoritmo.

2. **Estrategia (Interfaz):**  
   Define el método común para todas las estrategias concretas.

3. **Estrategias Concretas:**  
   Implementan diferentes variaciones de un algoritmo específico.

4. **Cliente:**  
   Crea el contexto y establece la estrategia adecuada.

---

#### 📝 **Pseudocódigo**

```pseudocode
// Interfaz Estrategia
interface Strategy {
    method execute(a, b)
}

// Estrategias concretas
class ConcreteStrategyAdd implements Strategy {
    method execute(a, b) {
        return a + b
    }
}

class ConcreteStrategySubtract implements Strategy {
    method execute(a, b) {
        return a - b
    }
}

class ConcreteStrategyMultiply implements Strategy {
    method execute(a, b) {
        return a * b
    }
}

// Contexto
class Context {
    private strategy: Strategy

    method setStrategy(strategy: Strategy) {
        this.strategy = strategy
    }

    method executeStrategy(a, b) {
        return strategy.execute(a, b)
    }
}

// Cliente
context = new Context()
context.setStrategy(new ConcreteStrategyAdd())
print(context.executeStrategy(5, 3)) // 8

context.setStrategy(new ConcreteStrategySubtract())
print(context.executeStrategy(5, 3)) // 2

context.setStrategy(new ConcreteStrategyMultiply())
print(context.executeStrategy(5, 3)) // 15
```

---

#### 🎯 **Aplicabilidad**

- Cuando se necesita **variar el comportamiento de un algoritmo** en tiempo de ejecución.
- Para **reducir condicionales complejos** (`if` o `switch`) en el código que seleccionan el comportamiento.
- Si deseas **aislar la lógica de los algoritmos** del resto del código para facilitar el mantenimiento y la extensión.

---

#### ⚙️ **Cómo implementarlo**

1. **Identificar el algoritmo que varía frecuentemente.**
2. Definir una **interfaz de estrategia** que declare el método común.
3. **Implementar estrategias concretas** para cada algoritmo.
4. Añadir un **campo en el contexto** para almacenar la estrategia y un método `setStrategy` para cambiarla.
5. Modificar el **código cliente** para crear instancias de estrategias y asignarlas al contexto.

---

#### ✅ **Pros y ❌ Contras**

**Pros:**

- **Intercambiabilidad:** Cambia algoritmos en tiempo de ejecución sin modificar el contexto.
- **Principio de abierto/cerrado:** Se pueden agregar nuevas estrategias sin alterar el código existente.
- **Reutilización de código:** Los algoritmos están encapsulados, lo que facilita su reutilización.

**Contras:**

- **Complejidad adicional:** Añade clases e interfaces adicionales, lo que puede ser excesivo para problemas simples.
- **Mayor carga para el cliente:** El cliente debe conocer las diferencias entre estrategias para seleccionar la adecuada.

---

#### 🔗 **Relaciones con otros patrones**

- **State:** Ambos patrones tienen estructuras similares, pero *State* gestiona transiciones entre estados, mientras que *Strategy* se enfoca en la selección de algoritmos.
- **Command:** Aunque ambos encapsulan comportamientos, *Command* representa acciones, mientras que *Strategy* representa algoritmos.
- **Template Method:** *Template Method* define el esqueleto de un algoritmo en una clase base, mientras que *Strategy* permite cambiar el algoritmo en tiempo de ejecución.
- **Decorator:** *Decorator* añade funcionalidades de forma dinámica, mientras que *Strategy* cambia la lógica del algoritmo.
- **Bridge:** Ambos patrones desacoplan la abstracción de su implementación, pero *Bridge* se enfoca en estructuras, mientras que *Strategy* se enfoca en comportamientos.

---




---

### **Patrón de Diseño: Template Method**

#### 📌 **Propósito**

El patrón de diseño **Template Method** es un patrón de comportamiento que define el **esqueleto de un algoritmo** en una clase base (superclase), pero permite que las subclases
sobrescriban pasos específicos del algoritmo sin cambiar su estructura general.

---

#### 🚩 **Problema**

- **Duplicación de código:**  
  Imagina que desarrollas una aplicación para analizar documentos en distintos formatos (PDF, DOC, CSV). A medida que agregas soporte para más formatos, te das cuenta de que el
  código de procesamiento tiene mucha lógica duplicada.

- **Condicionales innecesarios:**  
  El código cliente tiene numerosos condicionales para decidir qué algoritmo ejecutar, lo que hace que el mantenimiento y la escalabilidad sean complejos.

---

#### 💡 **Solución**

- **Dividir el algoritmo en pasos:**  
  Se crea un método en la clase base llamado **método plantilla** que define el flujo general del algoritmo, delegando los pasos específicos en métodos que las subclases pueden
  sobrescribir.

- **Polimorfismo:**  
  El cliente interactúa con la superclase, lo que permite que el comportamiento cambie dinámicamente en función de la subclase utilizada, sin necesidad de condicionales complejos.

---

#### 🗂️ **Estructura**

1. **Clase Abstracta:**

- Define el método plantilla (`templateMethod()`) que orquesta la ejecución de los pasos del algoritmo.
- Declara algunos métodos como abstractos (que deben implementarse en subclases) y otros con implementaciones por defecto.

2. **Clases Concretas:**

- Sobrescriben los métodos abstractos y opcionalmente redefinen algunos métodos con implementación por defecto.

3. **Ganchos (Hooks):**

- Son métodos opcionales que permiten a las subclases extender o personalizar el algoritmo en puntos específicos.

---

#### 📝 **Pseudocódigo**

```pseudocode
// Clase base abstracta
abstract class DataMiner {
    // Método plantilla: define la estructura del algoritmo
    method mine() {
        openFile()
        extractData()
        processData()
        closeFile()
    }

    // Pasos del algoritmo (abstractos y opcionales)
    abstract method openFile()
    abstract method extractData()
    abstract method processData()

    // Método opcional con implementación por defecto
    method closeFile() {
        print("Cerrando archivo.")
    }
}

// Clases concretas
class PDFDataMiner extends DataMiner {
    method openFile() {
        print("Abriendo archivo PDF")
    }

    method extractData() {
        print("Extrayendo datos del PDF")
    }

    method processData() {
        print("Procesando datos del PDF")
    }
}

class CSVDataMiner extends DataMiner {
    method openFile() {
        print("Abriendo archivo CSV")
    }

    method extractData() {
        print("Extrayendo datos del CSV")
    }

    method processData() {
        print("Procesando datos del CSV")
    }
}

// Uso del patrón
miner = new PDFDataMiner()
miner.mine()

miner = new CSVDataMiner()
miner.mine()
```

---

#### 🎯 **Aplicabilidad**

- Cuando necesitas permitir que las subclases **extiendan solo partes específicas** de un algoritmo sin modificar la estructura global.
- Para **reducir la duplicación de código** en algoritmos que comparten pasos comunes.
- Cuando existen **múltiples variantes de un algoritmo** con ligeras diferencias entre sí.

---

#### ⚙️ **Cómo implementarlo**

1. **Identificar el algoritmo común:**  
   Divide el algoritmo en pasos lógicos.

2. **Crear una clase abstracta:**  
   Define el **método plantilla** que organiza los pasos del algoritmo.

3. **Definir métodos abstractos y opcionales:**  
   Los métodos abstractos deberán ser implementados por las subclases, mientras que los opcionales pueden tener una implementación por defecto.

4. **Agregar ganchos (opcional):**  
   Proporcionan puntos de extensión que las subclases pueden sobrescribir si lo necesitan.

5. **Implementar subclases concretas:**  
   Cada subclase implementa o sobrescribe los métodos necesarios para personalizar el comportamiento.

---

#### ✅ **Pros y ❌ Contras**

**Pros:**

- **Reutilización de código:** Elimina la duplicación de lógica común en subclases.
- **Fácil de extender:** Agregar nuevos comportamientos solo requiere crear nuevas subclases.
- **Principio de responsabilidad única:** La estructura del algoritmo está separada de los detalles de implementación.

**Contras:**

- **Restricción de flexibilidad:** Las subclases deben adherirse a la estructura del método plantilla.
- **Problemas con el principio de sustitución de Liskov:** Puede surgir si la subclase no respeta el comportamiento esperado de la superclase.
- **Complejidad en algoritmos muy grandes:** Los métodos plantilla con muchos pasos pueden volverse difíciles de mantener.

---

#### 🔗 **Relaciones con otros patrones**

- **Factory Method:** Es una especialización del *Template Method*, donde la creación de objetos se define como un paso del algoritmo.
- **Strategy:** Mientras que *Template Method* usa herencia para definir pasos del algoritmo, *Strategy* usa composición para definir algoritmos completos intercambiables.
- **Hook Methods:** Los ganchos en *Template Method* son similares a pequeños *Observers*, permitiendo la personalización sin romper el flujo del algoritmo.

---




---

### **Patrón de Diseño: Visitor**

#### 📌 **Propósito**

El patrón de diseño **Visitor** es un patrón de comportamiento que permite **separar algoritmos de los objetos sobre los que operan**, facilitando así la adición de nuevas
operaciones sin modificar las estructuras de los objetos.

---

#### 🚩 **Problema**

- **Dificultad para añadir comportamientos:**  
  En una aplicación con una estructura compleja (como un grafo de nodos geográficos), agregar funcionalidades (como exportación a XML) puede requerir modificar todas las clases de
  nodo, lo que incrementa el riesgo de errores.

- **Violación del principio de responsabilidad única:**  
  Añadir nuevos comportamientos directamente en las clases de datos rompe la separación de responsabilidades.

- **Problemas de mantenimiento:**  
  Cada nuevo comportamiento obliga a modificar múltiples clases, lo que complica la escalabilidad y el mantenimiento del sistema.

---

#### 💡 **Solución**

- **Crear clases visitantes:**  
  En lugar de añadir nuevos comportamientos a las clases existentes, se encapsulan en clases separadas llamadas **visitantes**.

- **Double Dispatch:**  
  Para ejecutar el método correcto, se utiliza una técnica llamada *double dispatch*, donde el objeto acepta al visitante y este decide qué operación realizar, dependiendo del tipo
  del objeto.

- **Separación de responsabilidades:**  
  Los objetos de la estructura de datos mantienen su lógica principal, mientras que las operaciones adicionales se gestionan a través de visitantes.

---

#### 🗂️ **Estructura**

1. **Visitor (Interfaz):**  
   Declara métodos de visita para cada tipo de elemento.

2. **Concrete Visitor (Visitante Concreto):**  
   Implementa comportamientos específicos para cada tipo de elemento.

3. **Element (Elemento):**  
   Define un método `accept(visitor)` para aceptar un visitante.

4. **Concrete Element (Elemento Concreto):**  
   Implementa el método `accept`, que llama al método correspondiente del visitante.

5. **Client (Cliente):**  
   Recorre la estructura de objetos y aplica visitantes.

---

#### 📝 **Pseudocódigo**

```pseudocode
// Interfaz Visitor
interface Visitor {
    method visitCity(City city)
    method visitIndustry(Industry industry)
    method visitTouristSite(TouristSite site)
}

// Clases de Elementos
interface Place {
    method accept(visitor: Visitor)
}

class City implements Place {
    method accept(visitor: Visitor) {
        visitor.visitCity(this)
    }
}

class Industry implements Place {
    method accept(visitor: Visitor) {
        visitor.visitIndustry(this)
    }
}

class TouristSite implements Place {
    method accept(visitor: Visitor) {
        visitor.visitTouristSite(this)
    }
}

// Visitante Concreto
class ExportToXMLVisitor implements Visitor {
    method visitCity(city: City) {
        print("Exportando ciudad a XML")
    }
    method visitIndustry(industry: Industry) {
        print("Exportando industria a XML")
    }
    method visitTouristSite(site: TouristSite) {
        print("Exportando sitio turístico a XML")
    }
}

// Cliente
places = [new City(), new Industry(), new TouristSite()]
visitor = new ExportToXMLVisitor()

for (place in places) {
    place.accept(visitor)
}
```

---

#### 🎯 **Aplicabilidad**

- **Operaciones en estructuras complejas:**  
  Ideal para árboles o grafos de objetos donde se necesita aplicar múltiples operaciones.

- **Añadir comportamientos sin modificar clases existentes:**  
  Útil cuando no se pueden modificar las clases base (por ejemplo, si ya están en producción).

- **Refactorización:**  
  Permite limpiar la lógica de negocio separando comportamientos auxiliares en clases visitantes.

---

#### ⚙️ **Cómo implementarlo**

1. **Definir la interfaz Visitor** con métodos de visita para cada tipo de elemento.
2. **Agregar el método `accept(visitor)`** en cada clase de elemento.
3. **Crear clases visitantes concretas** para implementar operaciones específicas.
4. **Aplicar visitantes desde el cliente**, recorriendo la estructura de objetos y llamando a `accept(visitor)` en cada uno.

---

#### ✅ **Pros y ❌ Contras**

**Pros:**

- **Principio de abierto/cerrado:** Puedes agregar nuevas operaciones sin modificar las clases existentes.
- **Separación de responsabilidades:** Los visitantes manejan comportamientos que no pertenecen a la lógica principal de los objetos.
- **Facilidad para añadir operaciones complejas:** Un visitante puede mantener estado interno mientras opera sobre múltiples objetos.

**Contras:**

- **Dificultad al agregar nuevas clases de elementos:** Debes actualizar todos los visitantes cada vez que agregas una nueva clase de elemento.
- **Violación de la encapsulación:** Los visitantes pueden necesitar acceso a datos internos de los elementos, lo que puede exponer detalles privados.

---

#### 🔗 **Relaciones con otros patrones**

- **Composite:** El patrón Visitor se usa a menudo con *Composite* para aplicar operaciones a estructuras jerárquicas.
- **Iterator:** Puede complementar a *Iterator* para recorrer estructuras de datos complejas y aplicar operaciones específicas.
- **Command:** Ambos patrones encapsulan comportamientos, pero *Visitor* permite aplicar estos comportamientos a una estructura de objetos.
- **Double Dispatch:** El patrón Visitor se basa en esta técnica para seleccionar dinámicamente el método adecuado en tiempo de ejecución.

---





