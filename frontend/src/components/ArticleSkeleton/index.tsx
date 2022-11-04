import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { ArticleSkeletonContainer } from './styles'

interface ArticleSkeletonProps {
  index: number
}

export function ArticleSkeleton({ index }: ArticleSkeletonProps) {
  return (
    <ArticleSkeletonContainer index={index}>
      <Skeleton width={250} height={150} />

      <div>
        <Skeleton count={1.3} height={30} />
        <Skeleton count={2.5} height={20} />
      </div>
    </ArticleSkeletonContainer>
  )
}
