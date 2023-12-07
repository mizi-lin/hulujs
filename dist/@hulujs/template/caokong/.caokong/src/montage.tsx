import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import React from 'react';
import { Ball } from './montage/ball';

export const montage = () => {
    const container = document.createElement('div');
    container.id = 'montage';
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.right = '0';
    container.style.bottom = '0';
    container.style.left = '0';
    container.style.zIndex = '2147483647';
    container.style.pointerEvents = 'none';
    container.dataset['metMontageIgnore'] = 'true';
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(<RecoilRoot>{/* <Ball /> */}</RecoilRoot>);
};
