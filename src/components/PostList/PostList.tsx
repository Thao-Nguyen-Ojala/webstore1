type PostListProps = {
  posts: { id: string; title: string }[];
};
function PostList({ posts }: PostListProps) {
  return (
    <div>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
