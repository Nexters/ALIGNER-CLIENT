export default function ErrorMessage({ message }: { message: string }) {
  return <span className="text-red-500 typo-caption-1-emphasized">{message}</span>;
}
