interface PProps {
  children: React.ReactNode;
}

export default function P({ children }: PProps) {
  return <p className='text-medium font-light'>{children}</p>;
}
