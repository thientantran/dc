
import prismadb from "@/lib/db"
import { auth } from "@clerk/nextjs"

export const currentProfile = async () => {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  const profile = await prismadb.profile.findUnique({
    where: {
      userId
    }
  })
  return profile
}