import { PrismaClient } from '@/app/generated/prisma'

// @ts-ignore
const client: PrismaClient = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") {
    // @ts-ignore
    globalThis.prisma = client
}

export default client