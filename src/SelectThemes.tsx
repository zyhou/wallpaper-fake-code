import { ReactElement } from 'react';

export function SelectThemes(): ReactElement {
    return (
        <div className="mt-12 mx-auto w-5/6 dark:text-white flex">
            <div className="font-medium pb-2 flex">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                </svg>
                Blend Mode
            </div>
            <select className="w-full form-select px-4 py-3 rounded-lg text-gray-900">
                <option value="mix-blend-normal">Normal</option>
                <option selected value="mix-blend-overlay">
                    Overlay
                </option>
                <option value="mix-blend-multiply">Multiply</option>
                <option value="mix-blend-screen">Screen</option>
                <option value="mix-blend-darken">Darken</option>
                <option value="mix-blend-lighten">Lighten</option>
                <option value="mix-blend-color-dodge">Color Dodge</option>
                <option value="mix-blend-color-burn">Color Burn</option>
                <option value="mix-blend-hard-light">Hard Light</option>
                <option value="mix-blend-soft-light">Soft Light</option>
                <option value="mix-blend-difference">Difference</option>
                <option value="mix-blend-exclusion">Exclusion</option>
                <option value="mix-blend-hue">Hue</option>
                <option value="mix-blend-saturation">Saturation</option>
                <option value="mix-blend-color">Color</option>
                <option value="mix-blend-luminosity">Luminosity</option>
            </select>
        </div>
    );
}
