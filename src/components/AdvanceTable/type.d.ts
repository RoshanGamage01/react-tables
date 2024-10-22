import { HTMLInputTypeAttribute } from "react";

export interface TableField {
    header: string;
    key: string;
    className?: string;
    enableSort?: boolean;
    directInput?: boolean;
    inputType?: HTMLInputTypeAttribute | "normal_select" | "live_search_select";
    normalSelectData?: {
        value: string;
        lable: string;
    }[]
    validations?: {
        validationType: "custom" | "regex";
        validationMethod?: (data: any) => string | boolean,
        regex?: string | RegExp
    }
    inputEvent?: (id: string, key: string, value: string) => void | Promise<void>;
}

export interface SortedParam {
    key: string;
    constraint: "asc" | "desc"
}

export interface ActionButtons {
    delete?: {
        active: boolean;
        action: (id: string) => void;
    };
    edit?: {
        active: boolean;
        action: (id: string, data?: any) => void;
    };
    more?: {
        active: boolean;
        action: (id: string) => void;
    };
    View?: {
        active: boolean;
        action: (id: string) => void;
    };
    pdf?: {
        active: boolean;
        action: (id: string) => void;
    };
    excel?: {
        active: boolean;
        action: (id: string) => void;
    };
}