### Documentación Completa del *Bounded Context*: **Authentication and Authorization**

#### **1. Introducción al Sistema**

El *bounded context* **Authentication and Authorization** es responsable de gestionar la autenticación de usuarios y su autorización basada en roles. Su objetivo principal es
garantizar un acceso seguro y escalable al sistema, proporcionando una experiencia fluida para los usuarios autenticados y flexibilidad para los invitados que no desean registrarse
o iniciar sesión.

Este contexto permite:

- Soportar múltiples métodos de autenticación (contraseña, Google Auth, etc.).
- Manejar el rol predeterminado para usuarios no autenticados ("Guest").
- Asignar roles y permisos a usuarios autenticados.
- Proveer tokens que encapsulan información de autenticación y autorización.

**Beneficios estratégicos**:

- **Escalabilidad**: Admite la incorporación de nuevos métodos de autenticación.
- **Seguridad**: Controla el acceso mediante roles y permisos.
- **Flexibilidad**: Gestiona de manera transparente a usuarios autenticados e invitados.

---

#### **2. Definición del *Bounded Context***

**Nombre del *Bounded Context***: **Authentication and Authorization**

1. **Definición**:  
   Este contexto maneja toda la lógica de autenticación y autorización del sistema. Proporciona servicios para autenticar usuarios, asignar roles y permisos, y emitir tokens de
   acceso.

2. **Delimitación del Contexto**:
    - Este contexto **no consulta ni depende de otros contextos directamente**.
    - Expone servicios como:
        - Login/logout de usuarios.
        - Generación y validación de tokens.
        - Consulta de roles y permisos.

3. **Interfaces Expuestas**:
    - **API de autenticación**:
        - Login de usuarios.
        - Validación de tokens.
    - **API de autorización**:
        - Verificación de roles y permisos en tiempo de ejecución.

---

#### **3. Agregados**

Los principales agregados en este contexto son:

##### **AuthMethod** (Método de Autenticación)

**Descripción**: Representa un método de autenticación soportado por el sistema.

- **Atributos**:
    - `id`: Identificador único del método.
    - `type`: Tipo de método (e.g., `password`, `google`, `facebook`).
    - `config`: Configuración específica del método (e.g., claves API, secretos).
    - `isActive`: Indica si el método está activo.

**Importancia**:

- Facilita la integración de nuevos métodos de autenticación sin modificar la lógica central del sistema.
- Centraliza la configuración y activación/desactivación de métodos.

---

##### **User** (Usuario)

**Descripción**: Representa un usuario registrado en el sistema.

- **Atributos**:
    - `id`: Identificador único del usuario.
    - `username`: Nombre de usuario.
    - `roles`: Lista de roles asignados.
    - `authMethods`: Métodos de autenticación asociados al usuario.

**Importancia**:

- Es el núcleo para gestionar la identidad de los usuarios autenticados.
- Permite la asociación de múltiples métodos de autenticación a un solo usuario.

---

##### **Role** (Rol)

**Descripción**: Define un conjunto de permisos asociados a un grupo de usuarios.

- **Atributos**:
    - `id`: Identificador único del rol.
    - `name`: Nombre del rol (e.g., `admin`, `user`, `guest`).
    - `permissions`: Lista de permisos asignados.

**Importancia**:

- Simplifica la administración de permisos mediante roles predefinidos.
- Garantiza la consistencia en el acceso a recursos.

---

#### **4. Casos de Uso**

##### **LoginUser (Iniciar sesión)**

- **Descripción**: Permite a un usuario autenticarse usando un método configurado.
- **Entradas**:
    - `authType`: Tipo de autenticación (e.g., `password`, `google`).
    - `credentials`: Credenciales específicas para el método.
- **Salidas**:
    - Token con información del usuario autenticado.
- **Importancia**:
    - Habilita el acceso seguro a usuarios registrados.

---

##### **AuthenticateGuest (Autenticarse como invitado)**

- **Descripción**: Genera un token temporal para usuarios no autenticados.
- **Entradas**:
    - Ninguna.
- **Salidas**:
    - Token de invitado con rol `guest`.
- **Importancia**:
    - Permite a los usuarios explorar funcionalidades básicas del sistema sin registrarse.

---

##### **AddAuthMethod (Agregar método de autenticación)**

- **Descripción**: Configura un nuevo método de autenticación en el sistema.
- **Entradas**:
    - `type`: Tipo de método.
    - `config`: Configuración necesaria para el método.
- **Salidas**:
    - Confirmación de éxito.
- **Importancia**:
    - Asegura la escalabilidad al facilitar la incorporación de nuevos métodos.

---

##### **GenerateToken (Generar token de acceso)**

- **Descripción**: Genera un token para un usuario autenticado o un invitado.
- **Entradas**:
    - `userId` o `role` (dependiendo de si es autenticado o invitado).
- **Salidas**:
    - Token de acceso.
- **Importancia**:
    - Proporciona una representación portable y segura de la identidad del usuario.

---

#### **5. Estructura del Token**

##### **Token de Invitado**

```json
{
  "userId": null,
  "roles": [
    "guest"
  ],
  "permissions": [],
  "isGuest": true
}
```

##### **Token de Usuario Autenticado**

```json
{
  "userId": "user-12345",
  "username": "john_doe",
  "roles": [
    "user",
    "editor"
  ],
  "permissions": [
    "read_profile",
    "edit_profile",
    "create_post"
  ],
  "isGuest": false,
  "issuedAt": 1672531199,
  "exp": 1672617599,
  "metadata": {
    "authMethod": "google",
    "sessionId": "session-6789"
  }
}
```

---

#### **6. Lenguaje Ubicuo**

| Término    | Definición                                                      |
|------------|-----------------------------------------------------------------|
| AuthMethod | Método específico de autenticación.                             |
| User       | Usuario registrado en el sistema.                               |
| Guest      | Usuario no autenticado con permisos limitados.                  |
| Role       | Conjunto de permisos asociados a un grupo de usuarios.          |
| Token      | Representación segura de la identidad y permisos de un usuario. |

---

#### **7. Conclusión**

El *bounded context* **Authentication and Authorization** encapsula toda la lógica necesaria para gestionar la autenticación y autorización de manera segura y escalable. Al
proporcionar un diseño robusto para manejar tanto usuarios autenticados como invitados, este sistema asegura flexibilidad para adaptarse a futuros requerimientos sin comprometer la
seguridad ni la experiencia del usuario.

**Próximos pasos**:

1. Definir permisos específicos para cada rol.
2. Validar integraciones con métodos de autenticación externos (e.g., Google).
3. Implementar pruebas de los casos de uso documentados para garantizar su alineación con los objetivos del negocio.