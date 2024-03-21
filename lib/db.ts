import { PrismaClient } from "@prisma/client";

//khai báo ở global, để các client vào nếu đã tồn tại thì ko tạo mới, do đó ko bị overwrite
declare global {
  var prisma: PrismaClient | undefined
}

const prismadb = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prismadb
}

export default prismadb