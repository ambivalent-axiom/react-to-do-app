export interface Post {
    id: string;
    title: string;
    description: string;
    completed: boolean;
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
  onShow: (id: number) => void;
  onEdit: (todo: Post) => void;
  onDelete: (id: number) => void;
  onToggleCompleted: (id: number, completed: boolean) => void;
}

export type PostListItemProps = {
  key: number
  title: string;
  description: string;
  completed: boolean;
  onShow: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleCompleted: () => void;
};