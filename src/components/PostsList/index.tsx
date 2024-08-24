import { PostListItem } from './PostListItem';
import { Post } from '../../App';
import { List, Empty } from 'antd';

type PostListProps = {
    posts: Post[] | null;
}

export const PostsList = ({ posts }: PostListProps) => {

    if (!posts || posts.length === 0) {
        return <Empty description="Nav datu!" />;
    }

    return (
        <List
            dataSource={posts}
            renderItem={post => (
                <PostListItem 
                    key={post.id} 
                    title={post.title}
                    views={post.views}
                />
            )}
        />
    );
}