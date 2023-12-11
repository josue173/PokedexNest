export const EnvConfiguration = () => ({
  enviroment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB,
  // no se especifica nada para que la persona que levante esto vea el error y levante la DB
  port: process.env.PORT || 3002,
  defaultLimit: +process.env.DEFAULT_LIMIT || 8, 
  // + PORQUE SIN ESO ENVIA LA VARIABLE TAL CUAL, UN STRING, ASÍ SE GUARDAN POR DEFECTO LA VARIABLES DE ENTORNO
});

/* SE HACE ESTA FUNCION PORQUE CUANDO NECESITAMOS HACER LLAMADOS A VARIABLES DE ENTORNO NO SE HACE DESDE
EL ARCHIVO .env, SINO QUE SE UTILIZA EL SERVICIO load del ConfigModule (app.module.ts), DICHO SERVICIO 
PROCESÓ Y EJECUTÓ LAS VARIABLES DE ENTORNO */

/* ESTA CONFIGURACION ESTÁ SIENDO UTILIZADA EN EL MÓDULO DE NEST, NO TIENE ALCANCE PARA EL main.ts*/
