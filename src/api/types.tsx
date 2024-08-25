export interface Post {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    comments: Comment[];
  }

export interface Comment {
  id: string;
  content: string;
}

export interface TodoShowProps {
  todoId: string;
}

export interface TodoFormModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: TodoFormValues) => Promise<void>;
  initialValues: TodoFormValues;
  isEditing: boolean;
}

export interface TodoFormValues {
  title: string;
  description: string;
}

export type PostListProps = {
  posts: Post[];
  onShow: (id: string) => void;
  onEdit: (todo: Post) => void;
  onDelete: (id: string) => void;
  onToggleCompleted: (id: string, completed: boolean) => void;
}

export type PostListItemProps = {
  key: string
  title: string;
  description: string;
  completed: boolean;
  onShow: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleCompleted: () => void;
};

export interface PostCommentsProps {
  comments: Comment[];
  isEditing: string | null;
  editedCommentContent: string;
  newComment: string;
  onEditComment: (comment: Comment) => void;
  onDeleteComment: (commentId: string) => void;
  onUpdateComment: () => void;
  onCancelEdit: () => void;
  onChangeEditContent: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeNewComment: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onAddComment: () => void;
}

export interface PostCommentItemProps {
  comment: Comment;
  isEditing: boolean;
  editedCommentContent: string;
  onEdit: (comment: Comment) => void;
  onDelete: (commentId: string) => void;
  onUpdate: () => void;
  onCancelEdit: () => void;
  onContentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}