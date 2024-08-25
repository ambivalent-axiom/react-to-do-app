import { createLazyFileRoute } from '@tanstack/react-router'
import PostIndex from '../components/PostIndex'

export const Route = createLazyFileRoute('/')({
  component: PostIndex,
})
