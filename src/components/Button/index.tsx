import { Button as AntdButton } from 'antd';

type Props = {
    title?: string;
    onClick: () => void;
}

export const Button = ({ title="Turpināt", onClick }: Props) => {
    return (
        <AntdButton
            onClick={onClick}
        >
            {title}
        </AntdButton>
    );
}