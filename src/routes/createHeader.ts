import { z } from 'zod'
import {knex} from '../database'
import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { checkSessionId } from '../middlawares/check-if-sessionid-exists'

export async function createHeaderRoute(app: FastifyInstance) {
  app.get('/',{preHandler: [checkSessionId]}, async () => {
    const transactions = await knex('f4311').select()
    return transactions
  })

  app.get('/:contrato',{preHandler: [checkSessionId]}, async (request, reply) => {
    const getContractNumber = z.object({
      contrato: z.string().uuid()
    })
    const { contrato } = getContractNumber.parse(request.params)

    const transanction = await knex('f4311').where('doco', contrato )

    return { transanction }

  }),

  app.get('/jokes', async (request, reply) => {
    const getValues = z.object({
      fazenda: z.string(),
      totalBruto: z.number()
    })

    const { fazenda, totalBruto  } = getValues.parse(request.body)

    const result = await knex('f4311').count('urec', totalBruto, {as:'total' }).groupBy()

    return result
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

      let sessionId = request.cookies.sessionId

      if (!sessionId) {
        sessionId = randomUUID()

        reply.cookie('sessionId', sessionId,
        {
          path: '/',
          maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days 
        })
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
        rcto: ' ',
        sessionId: sessionId
      })


      
  return reply.status(201).send("Criado com sucesso")
  })
}

