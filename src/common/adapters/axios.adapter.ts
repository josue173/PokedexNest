// PARA HACER EL ADAPTADOR "VISIBLE" DEBE EXPORTARSE

import { Injectable } from '@nestjs/common';
import { HttpAdapter } from '../interfaces/http-adapter.interface';

import axios, { AxiosInstance } from 'axios';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  // Clase adaptadora para cambiar el "get" de see.service en caso de que este nombre se modifique
  private axios: AxiosInstance = axios; // Instancia de Axios, dependencia del servicio
  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url);
      return data;
    } catch (error) {
      throw new Error(`Error here`);
    }
  }
}
