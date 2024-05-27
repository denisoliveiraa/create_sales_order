import { z } from 'zod'
import {knex} from '../database'
import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'

export async function createHeaderRoute(app: FastifyInstance) {
  app.get('/', async () => {
    const transactions = await knex('f4311').select()
    return transactions
  }),

  app.get('/:contrato', async (request, reply) => {
    const getContractNumber = z.object({
      contrato: z.string().uuid()
    })

    const { contrato } = getContractNumber.parse(request.params)

    const transanction = await knex('f4311').where('doco', contrato )

    return { transanction }

  })

  app.post('/', async (request, reply) => {
      const createOrder = z.object({
        tipo: z.string(),
        companhia: z.number(),
        contrato: z.string(),
        cliente: z.number(),
        planta: z.number(),
        totalBruto: z.number(),
        fazenda: z.number(),
        item: z.string(),
      })
  
      const {tipo, companhia, contrato, cliente, planta, totalBruto, fazenda, item} = createOrder.parse(request.body)

      if(tipo.length != 2){
        throw new Error ("Tipo deve ter tamanho 2")
      }
      if(totalBruto < 0){
        throw new Error ("Valor deve ser maior que zero")
      }

       await knex('F4311')
      .insert({
        doco: randomUUID(),
        dcto: tipo,
        kcoo: companhia,
        lnid: 1000,
        contract: contrato,
        an8: cliente,
        mcu: planta,
        upmj: new Date().getDate(),
        uorg: totalBruto,
        urec: 0,
        shan: fazenda,
        litm: item,
        rcto: ' '
      })


      
  return reply.status(201).send("Criado com sucesso")
  })
}

