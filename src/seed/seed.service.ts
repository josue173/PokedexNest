import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly _pokemonModel: Model<Pokemon>,
    private readonly axios: AxiosAdapter,
  ) {}

  async executeSEED() {
    // Borrar la DB
    await this._pokemonModel.deleteMany({});
    // Obteniendo la data, ya no se desestructura "data" porque eso se hizo en el adapter
    const data = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=600',
    );
    // Definiendo una variable con arreglo de objetos {name, no}
    const pokemonToInsert: { name: string; no: number }[] = [];
    // Separando por segmentos, obtener el name y no e insertarlos en la variable pokemonToInsert
    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/'); // split para cortar segmentos por '/'
      const no: number = +segments[segments.length - 2];
      pokemonToInsert.push({ name, no });
    });
    // Hacer una llamada a la DB e insertar todo
    this._pokemonModel.insertMany(pokemonToInsert);
    return 'SEED EXECUTED';
  }
}
