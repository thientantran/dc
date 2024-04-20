import { currentProfile } from "@/lib/current-profile"
import prismadb from "@/lib/db"
import { NextResponse } from "next/server"

export async function DELETE(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile()

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!params.serverId) {
      return new NextResponse('Not Found', { status: 404 })
    }

    const server = await prismadb.server.delete({
      where: {
        id: params.serverId,
        profileId: profile.id,
      }
    })
    return NextResponse.json(server)
  } catch (error) {
    console.log('[SERVER_ID_DELETE]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }

}

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile()

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    const { name, imageUrl } = await req.json()

    const server = await prismadb.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id
      },
      data: {
        name,
        imageUrl
      }
    })
    return NextResponse.json(server)
  } catch (error) {
    console.log('[SERVER_ID_PATCH]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}