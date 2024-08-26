# Prueba Técnica - Programador (Back-end)
La siguiente es una prueba para evaluar a los postulantes a programador **Back-end**.

## INTRODUCCIÓN
Este repositorio contiene una serie de requerimientos de un Caso Práctico, que busca evaluar las capacidades técnicas del candidato con respecto a las principales funciones y responsabilidades que se requieren dentro del área de Desarrollo de Tecnología de _Kambista_.

#### ¿Qué se busca evaluar?
Principalmente los siguientes aspectos:
* Creatividad para resolver los requerimientos,
* Calidad del código entregado (arquitectura limpia y buenas prácticas),
* Eficiencia de los algoritmos entregados,
* Familiaridad con Frameworks y plataformas de desarrollo (Node + Typescript o Spring Boot).

## IMPORTANTE
1. Se requiere de una **cuenta de GitHub** para realizar este ejercicio.
2. **Antes de comenzar a programar:**
    * Realizar un `Fork` de este repositorio (https://github.com/kambista/backend-test).
    * Clonar el fork a su máquina local  `git clone git@github.com:USERNAME/FORKED-PROJECT.git`
    * Crear un `branch` en su cuenta de GitHub utilizando su nombre completo.
3. **Al finalizar**, existen 2 (dos) opciones para entregar su proyecto:
    * 1) El proyecto debe poder ser desplegado a través de [docker-compose](https://docs.docker.com/compose/)
    * 2) Realizar un `Commit` de su proyecto, **enviar un `Pull Request` al branch con su NOMBRE**, y notificar a la siguiente dirección de correo electrónico  [talentohumano@kambista.com](mailto:talentohumano@kambista.com).
    * 3) Crear un archivo comprimido (_.zip_ o _.rar_) de su proyecto y enviar a la siguiente dirección de correo electrónico  [talentohumano@kambista.com](mailto:talentohumano@kambista.com).

## EJERCICIOS

### Ejercicio #
Se desea administrar el acceso de vehículos a un estacionamiento de pago. El estacionamiento no se encuentra automatizado, por lo que existe un empleado encargado de registrar las entradas y salidas de vehículos.

Los vehículos se identifican por su número de placa. Cuando un vehículo entra en el estacionamiento el empleado registra su entrada y al salir registra su salida y, en algunos casos, cobra el importe correspondiente por el tiempo de estacionamiento.

El importe cobrado depende del tipo de vehículo:
* Los vehículos oficiales no pagan, pero se registran sus estancias para llevar el control.
(Una estancia consiste en una hora de entrada y una de salida)
* Los residentes pagan a final de mes a razón de MXN$0.05  el minuto. La aplicación irá acumulando el tiempo (en minutos) que han permanecido estacionados.
* Los no residentes pagan a la salida del estacionamiento a razón de MXN$0.5 por minuto.
Se prevé que en el futuro puedan incluirse nuevos tipos de vehículos, por lo que la aplicación desarrollada deberá ser fácilmente extensible en ese aspecto.

##### Casos de uso

A continuación se describen los casos de uso. No se entra en detalles de la interacción entre el empleado y la aplicación (punto 1 de cada caso de uso), puesto que no va a ser tarea de este ejercicio desarrollar esa parte.

###### **Caso de uso "Registra entrada"**
1. El empleado elige la opción "registrar entrada" e introduce el número de placa del coche que entra.
2. La aplicación apunta la hora de entrada del vehículo.

###### **Caso de uso "Registra salida"**
1. El empleado elige la opción "registrar salida" e introduce el número de placa del coche que sale.
2. La aplicación realiza las acciones correspondientes al tipo de vehículo:
    * Oficial: asocia la estancia (hora de entrada y hora de salida) con el vehículo
    * Residente: suma la duración de la estancia al tiempo total acumulado
    * No residente: obtiene el importe a pagar

###### **Caso de uso "Da de alta vehículo oficial"**
1. El empleado elige la opción "dar de alta vehículo oficial" e introduce su número de placa.
2. La aplicación añade el vehículo a la lista de vehículos oficiales

###### **Caso de uso "Da de alta vehículo de residente"**
1. El empleado elige la opción "dar de alta vehículo de residente" e introduce su número de placa.
2. La aplicación añade el vehículo a la lista de vehículos de residentes.

##### Persistencia de datos
La información de cada una de las estancias de los vehículos será almacenada en una base de datos. Debido a que el manejador de base de datos puede ser modificado en cualquier momento.

##### Puntos que se deben desarrollar
* Aplicación para gestionar las estancias de los vehículos. Deberá incluir:
    * Código de las clases que permitan gestionar los vehículos con sus datos asociados (estancias, tiempo, etc.), las listas de vehículos registrados como oficiales y residentes, etc.
    * Mapeo de las clases para poder almacenar la información en la base de datos.
    * Clases para gestionar la persistencia de datos, incluida la configuración de conexión a la base de datos.

##### Consideraciones.
Para obtener la fecha y hora actual se utiliza la clase `Calendar`:
``` java
Calendar date; // para almacenar una fecha
date = Calendar.getInstance(); // obtiene la fecha actual
```
Para obtener intervalos de tiempos entre dos fechas suponer que se dispone del método:
```java
/** Obtiene la diferencia en minutos entre dos fechas
* @param inicial fecha inicial
* @param final fecha final
* @return diferencia final-inicial en minutos
*/
private static int difInMinutes(Calendar start, Calendar end) {...}
```
