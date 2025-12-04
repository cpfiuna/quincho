# 🏠 Sistema de Reservas del Quincho FIUNA

Sistema de reservas del quincho de la Facultad de Ingeniería (UNA), desarrollado por el [Club de Programación FIUNA](https://cpfiuna.io).

**🌐 Acceder**: [quincho.cpfiuna.io](https://quincho.cpfiuna.io)

---

## 📖 ¿Qué es este proyecto?

Es una aplicación web que permite a estudiantes, docentes y personal de la FIUNA **reservar el quincho** de forma simple y organizada. Los administradores pueden gestionar las reservas, aprobarlas o rechazarlas, y bloquear fechas cuando sea necesario.
## 🎯 ¿Por qué lo hicimos?

La facultad nos pidió crear un **sistema de reservas moderno** similar al del [Polideportivo FIUNA](https://polideportivo-fiuna.netlify.app/), pero adaptado específicamente para el quincho. El objetivo era mejorar la gestión de reservas y hacerla más transparente y accesible para toda la comunidad.

## ✨ ¿Qué hace?

### Para Usuarios:
- 📅 Ver disponibilidad del quincho en un **calendario interactivo**
- ✍️ Hacer reservas seleccionando fecha, horario y cantidad de personas
- 📧 Recibir **notificaciones por email** (confirmación, aprobación/rechazo, recordatorios)
- 🔐 Iniciar sesión con tu cuenta de email

### Para Administradores:
- ✅ **Aprobar o rechazar** reservas pendientes con motivos
- 🚫 **Bloquear fechas** (feriados, mantenimiento, eventos especiales)
- 📊 Ver historial completo de reservas y cambios
- 🔍 Gestionar usuarios y permisos

## 🛠️ ¿Cómo funciona?

El sistema está construido con tecnologías web modernas:

- **Frontend**: React + TypeScript (interfaz rápida y fácil de usar)
- **Backend**: Supabase (base de datos, autenticación y notificaciones)
- **Hosting**: Vercel (acceso rápido y confiable)

**Flujo básico:**
1. Usuario elige fecha y hora en el calendario
2. Sistema verifica disponibilidad automáticamente  
3. Se crea la reserva como "pendiente"
4. Admin recibe notificación y puede aprobar/rechazar
5. Usuario recibe email con la decisión
6. Si se aprueba, recibe recordatorio 24 horas antes

---

## 🚀 Para Desarrolladores

Si querés contribuir o correr el proyecto localmente:

<details>
<summary><b>Ver instrucciones de instalación</b></summary>

### Prerrequisitos
- Node.js 18+ o Bun 1.0+
- Cuenta en Supabase
- Git

### Instalación

1. Clonar el repositorio
   ```bash
   git clone https://github.com/cpfiuna-alt/quincho-fiuna.git
   cd quincho-fiuna
   ```

2. Instalar dependencias
   ```bash
   bun install
   # o
   npm install
   ```

3. Configurar variables de entorno
   ```bash
   # Crear archivo .env.local
   VITE_SUPABASE_URL=tu_supabase_url
   VITE_SUPABASE_ANON_KEY=tu_anon_key
   ```

4. Aplicar migraciones de base de datos
   ```bash
   npx supabase db push
   ```

5. Iniciar servidor de desarrollo
   ```bash
   bun dev
   ```

6. Abrir en navegador: `http://localhost:5173`

### Tecnologías Principales
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Edge Functions)
- **Herramientas**: Bun, shadcn/ui, Tanstack Query

</details>

---

## 📊 Estado Actual

✅ **En producción** y siendo usado por la comunidad FIUNA

### Funcionalidades Implementadas
- ✅ Calendario interactivo con disponibilidad en tiempo real
- ✅ Sistema de autenticación y permisos
- ✅ Flujo completo de reservas (crear, aprobar, rechazar, cancelar)
- ✅ Panel administrativo
- ✅ Notificaciones automáticas por email
- ✅ Bloqueo de fechas
- ✅ Auditoría y registro de cambios

### Próximas Mejoras
- 📊 Dashboard de estadísticas para admins
- 📥 Exportación de reportes
- 🔔 Notificaciones al celular (además del email actual)
- 📅 Reservas automáticas semanales/mensuales

---

## 🤝 Contribuir

¿Querés ayudar a mejorar el sistema? ¡Genial!

1. Hacé un fork del proyecto
2. Creá una rama para tu feature (`git checkout -b feature/MejoraNueva`)
3. Hacé commit de tus cambios (`git commit -m 'Agregado: nueva funcionalidad'`)
4. Hacé push a la rama (`git push origin feature/MejoraNueva`)
5. Abrí un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver [LICENSE](LICENSE) para más detalles.

---

## 👥 Contacto y Enlaces

**Desarrollado por**: [Club de Programación FIUNA](https://cpfiuna.io)  
**Comisionado por**: [Facultad de Ingeniería — Universidad Nacional de Asunción](https://ing.una.py)

- 🌐 **Aplicación**: [quincho.cpfiuna.io](https://quincho.cpfiuna.io)
- 🏫 **Club**: [cpfiuna.io](https://cpfiuna.io)
- 🏟️ **Sistema hermano**: [Polideportivo FIUNA](https://polideportivo-fiuna.netlify.app/)
- 💬 **GitHub**: [Discussions](https://github.com/cpfiuna-alt/quincho-fiuna/discussions)

---

<div align="center">

**[⬆ Volver arriba](#-quincho-fiuna--sistema-de-reservas)**

Hecho con ❤️ por el Club de Programación FIUNA :)

</div>
