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
