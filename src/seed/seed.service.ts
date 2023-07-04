import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

import axios, { AxiosInstance } from 'axios';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios; // Instancia de Axios, dependencia del servicio

  constructor(
    @InjectModel(Pokemon.name)
    private readonly _pokemonModel: Model<Pokemon>,
  ) {}

  async executeSEED() {
    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10',
    );
    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/'); // split para cortar segmentos por '/'
      const no: number = +segments[segments.length - 2];
      const pokemon = await this._pokemonModel.create({ name, no });
    });
    return 'SEED EXECUTED';
  }
}
