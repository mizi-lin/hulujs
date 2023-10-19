import { FC, PropsWithChildren, CSSProperties } from 'react';
import clx from 'classnames';

export interface MetGridProps extends PropsWithChildren {
    style?: CSSProperties;
    className?: string;
}

const MetGrid: FC<MetGridProps> = (props) => {
    const { children, style = {}, className = '' } = props;
    return (
        <section style={style} className={clx('met-grid', className)}>
            {children}
        </section>
    );
};

export default MetGrid;
