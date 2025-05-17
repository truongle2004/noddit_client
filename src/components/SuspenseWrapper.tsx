import { Suspense } from 'react'
import Loading from './Loading'

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>
}

export default SuspenseWrapper
