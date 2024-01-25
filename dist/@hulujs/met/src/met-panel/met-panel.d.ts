import { ReactNode } from 'react';
import { MetProps, MetRuyiProps } from '@hulujs/met';
export interface MetPanelTitleTextProps extends MetProps {
    text: ReactNode;
}
export interface MetPanelTitleProps extends MetProps {
    title: ReactNode | MetPanelTitleTextProps;
    sub: ReactNode | MetPanelTitleTextProps;
    description: ReactNode | MetPanelTitleTextProps;
    tip: ReactNode | (MetPanelTitleTextProps & {
        icon: ReactNode;
        position?: 'left' | 'right';
    });
    orders: {
        title: number;
        sub: number;
        tip: number;
    };
}
export interface MetBaseToolEventParams {
    toolState: Record<string, any>;
    setToolState: (state: Record<string, any>) => void;
    state: Promise<(name: string) => [Record<string, any>, (state: Record<string, any>) => void]>;
    commonState: Record<string, any>;
}
export interface MetPanelTool extends Omit<MetProps, 'onClick'> {
    icon: ReactNode;
    tip?: string;
    title: string;
    show: 'onlyIcon' | 'onlyTitle' | 'all';
    group?: string;
    onClick?: (params?: MetBaseToolEventParams) => void;
    active?: MetProps;
}
export interface MetPanelToolbarGroup extends MetProps {
    icon: ReactNode;
    title: string;
    tip?: string;
    show: 'onlyIcon' | 'onlyTitle' | 'all';
    trigger?: 'click' | 'hover';
    tools: string[];
}
export interface MetPanelToolbar extends MetProps {
    tools: string[] | MetPanelTool[];
    useDefault?: boolean;
    group: MetPanelToolbarGroup[];
    count?: number;
}
export interface MetPanelProps extends MetProps {
    header: false | MetProps;
    main: false | MetProps;
    footer: false | MetProps;
    title: false | ReactNode | MetPanelTitleProps;
    toolbar: false | ReactNode | MetPanelToolbar;
    ruyi?: MetRuyiProps;
    bordered?: boolean | 'all' | 'wrapper' | 'inner' | 'none';
    theme?: {
        borderColor: '#dedede';
        padding: 8;
        raduis: 8;
    };
}
export declare const themeConfigAtom: import("recoil").RecoilState<Record<string, any>>;
export declare const useThemeConfig: (config?: Record<string, any>) => Record<string, any>;
declare const MetPanel: import("react").ForwardRefExoticComponent<Omit<MetPanelProps, "ref"> & import("react").RefAttributes<HTMLElement>>;
export default MetPanel;
