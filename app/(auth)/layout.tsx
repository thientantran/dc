
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full bg-red-500">
      {children}
    </div>
  )
}
