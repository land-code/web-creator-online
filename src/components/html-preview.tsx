interface Props {
  html: string
}

export default function HTMLPreview ({html}: Props) {
  return (
    <div className="flex items-stretch flex-1 *:flex-1">
      <div className="flex-1">
        <iframe srcDoc={html} className="w-full h-full"></iframe>
      </div>
    </div>
  )
}