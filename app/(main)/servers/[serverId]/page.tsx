
export default function page({ params }: { params: { serverId: string } }) {
  return (
    <div>Server Page ID: {params.serverId}</div>
  )
}
