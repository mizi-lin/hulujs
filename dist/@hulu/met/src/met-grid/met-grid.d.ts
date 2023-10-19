import { FC, PropsWithChildren, CSSProperties } from 'react';
export interface MetGridProps extends PropsWithChildren {
    style?: CSSProperties;
    className?: string;
}
declare const MetGrid: FC<MetGridProps>;
export default MetGrid;
